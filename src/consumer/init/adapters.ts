import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import {
  InitError,
  serverName,
  type ConfigTarget,
  type InitAdapter,
  type InitDiscovery,
  type InitEnvironment,
  type McpLaunch,
} from "./types.js";

/**
 * Verified MCP configuration adapters, one per catalog product.
 *
 * The chapter that justifies each product is named beside its definition; the
 * matching editions are the `topic: mcp` selections in
 * `registry/chapter-current.yaml`. Only entries those chapters verify are
 * configured; UI-only, conflicting or unresolvable entries are skipped with a
 * reason (`unavailable` / `supported(..., { reason })`).
 *
 * Editor conventions (see editor.ts):
 * - `collection` addresses the container that holds server definitions.
 * - `kind: "map"` containers are keyed by `serverName`; `entry` is the value.
 * - `kind: "array"` containers carry entries whose `nameKey` is `serverName`.
 * - `kind: "dsh"` is the DeepSeek Harness Cordis patch row.
 * - `initial` is the document skeleton; factories derive it from `collection`.
 *
 * A layout's `paths` list is in the host's own priority order; the first
 * existing file wins and `create` (or the first path) is used when none exists.
 * An `optional` layout is never created and reports `absentReason` when missing.
 */

type ConfigFormat = ConfigTarget["format"];
type ConfigKind = ConfigTarget["kind"];
type EntryBuilder = (
  launch: McpLaunch,
  name: string,
  environment: InitEnvironment,
) => Record<string, unknown>;

interface LayoutInput {
  paths: (environment: InitEnvironment) => readonly string[];
  create?: (environment: InitEnvironment) => string;
  entry?: EntryBuilder;
  initial?: Record<string, unknown> | unknown[];
  notes?: readonly string[];
  optional?: boolean;
  absentReason?: string;
  multiple?: boolean;
}

interface ScopeLayout extends Required<Pick<LayoutInput, "paths">> {
  create?: LayoutInput["create"];
  entry: EntryBuilder;
  initial: Record<string, unknown> | unknown[];
  notes?: readonly string[];
  optional?: boolean;
  absentReason?: string;
  multiple?: boolean;
  format: ConfigFormat;
  collection: readonly string[];
  kind: ConfigKind;
  nameKey?: string;
}

const atHome = (environment: InitEnvironment, ...segments: string[]): string =>
  path.join(environment.home, ...segments);

const atProject = (
  environment: InitEnvironment,
  ...segments: string[]
): string => path.join(environment.cwd, ...segments);

const absoluteEnv = (
  environment: InitEnvironment,
  variable: string,
): string | undefined => {
  const value = environment.env[variable];
  if (value === undefined || value.trim().length === 0) return undefined;
  return path.isAbsolute(value) ? value : undefined;
};

const atConfig = (
  environment: InitEnvironment,
  ...segments: string[]
): string =>
  path.join(
    absoluteEnv(environment, "XDG_CONFIG_HOME") ??
      atHome(environment, ".config"),
    ...segments,
  );

const atRoaming = (
  environment: InitEnvironment,
  ...segments: string[]
): string =>
  path.join(
    absoluteEnv(environment, "APPDATA") ??
      atHome(environment, "AppData", "Roaming"),
    ...segments,
  );

const envDirectory = (
  environment: InitEnvironment,
  variable: string,
  ...segments: string[]
): string | undefined => {
  const value = environment.env[variable];
  if (value === undefined || value.trim().length === 0) return undefined;
  return path.join(path.resolve(environment.cwd, value), ...segments);
};

/** Build the nested object/array skeleton addressed by `collection`. */
function skeleton(
  collection: readonly string[],
  leaf: Record<string, unknown> | unknown[],
): Record<string, unknown> {
  const root: Record<string, unknown> = {};
  let node = root;
  for (let index = 0; index < collection.length - 1; index += 1) {
    const next: Record<string, unknown> = {};
    node[collection[index] ?? ""] = next;
    node = next;
  }
  const last = collection[collection.length - 1];
  if (last !== undefined) node[last] = leaf;
  return root;
}

/** Entries are built from the launch command and the fixed server name. */
const stdioEntry: EntryBuilder = (launch) => ({ ...launch });
const typedStdioEntry: EntryBuilder = (launch) => ({
  type: "stdio",
  ...launch,
});
const transportEntry: EntryBuilder = (launch) => ({
  transport: "stdio",
  ...launch,
});
const localEntry: EntryBuilder = (launch) => ({
  type: "local",
  command: [launch.command, ...launch.args],
});
const openhandsEntry: EntryBuilder = (launch) => ({
  ...launch,
  transport: "stdio",
  enabled: true,
});
const gooseEntry: EntryBuilder = (launch, name) => ({
  name,
  cmd: launch.command,
  args: launch.args,
  type: "stdio",
  enabled: true,
});
const namedEntry: EntryBuilder = (launch, name) => ({ name, ...launch });
const mistralEntry: EntryBuilder = (launch, name) => ({
  name,
  transport: "stdio",
  ...launch,
});
const autohandEntry: EntryBuilder = (launch, name) => ({
  name,
  transport: "stdio",
  ...launch,
});
const copilotEntry: EntryBuilder = (launch) => ({
  type: "stdio",
  ...launch,
  tools: ["*"],
});
const vscodeEntry: EntryBuilder = (launch) => ({ type: "stdio", ...launch });
const dshEntry: EntryBuilder = (launch, name) => ({
  id: name,
  name: "@deepseek-ai/dsh-mcp-client",
  config: {
    serverName: name,
    transport: "stdio",
    command: launch.command,
    args: launch.args,
  },
});

/**
 * On native Windows the docs for these hosts require `cmd /c` in front of an
 * `npx` command. Hosts that resolve the launcher themselves are left alone.
 */
const windowsCommand = (
  launch: McpLaunch,
  environment: InitEnvironment,
): { command: string; args: string[] } =>
  environment.platform === "win32"
    ? { command: "cmd", args: ["/c", launch.command, ...launch.args] }
    : { command: launch.command, args: launch.args };
const windowsCmdEntry: EntryBuilder = (launch, _name, environment) => ({
  ...windowsCommand(launch, environment),
});
const windowsCmdTypedEntry: EntryBuilder = (launch, _name, environment) => ({
  type: "stdio",
  ...windowsCommand(launch, environment),
});

function makeLayout(
  format: ConfigFormat,
  kind: ConfigKind,
  collection: readonly string[],
  nameKey: string | undefined,
  input: LayoutInput,
): ScopeLayout {
  const entry = input.entry ?? stdioEntry;
  return {
    paths: input.paths,
    ...(input.create ? { create: input.create } : {}),
    entry,
    initial: input.initial ?? skeleton(collection, kind === "array" ? [] : {}),
    ...(input.notes ? { notes: input.notes } : {}),
    ...(input.optional ? { optional: true } : {}),
    ...(input.absentReason ? { absentReason: input.absentReason } : {}),
    ...(input.multiple ? { multiple: true } : {}),
    format,
    collection,
    kind,
    ...(nameKey ? { nameKey } : {}),
  };
}

const jsonMap = (
  collection: readonly string[],
  input: LayoutInput,
): ScopeLayout => makeLayout("jsonc", "map", collection, undefined, input);
const jsonArray = (
  collection: readonly string[],
  input: LayoutInput,
): ScopeLayout => makeLayout("jsonc", "array", collection, "name", input);
const tomlMap = (
  collection: readonly string[],
  input: LayoutInput,
): ScopeLayout => makeLayout("toml", "map", collection, undefined, input);
const tomlArray = (
  collection: readonly string[],
  input: LayoutInput,
): ScopeLayout => makeLayout("toml", "array", collection, "name", input);
const yamlMap = (
  collection: readonly string[],
  input: LayoutInput,
): ScopeLayout => makeLayout("yaml", "map", collection, undefined, input);
const yamlArray = (
  collection: readonly string[],
  input: LayoutInput,
): ScopeLayout => makeLayout("yaml", "array", collection, "name", input);

function emit(
  harnessId: string,
  layout: ScopeLayout,
  environment: InitEnvironment,
  launch: McpLaunch,
): InitDiscovery {
  const candidates = [...layout.paths(environment)];
  const existing = candidates.filter((candidate) => existsSync(candidate));
  if (existing.length === 0 && layout.optional)
    return {
      targets: [],
      skipped: [
        layout.absentReason ??
          `${harnessId}: no existing configuration file was found.`,
      ],
    };
  const files =
    layout.multiple && existing.length > 0
      ? existing
      : [existing[0] ?? layout.create?.(environment) ?? candidates[0]];
  const targets: ConfigTarget[] = [];
  for (const file of files) {
    if (file === undefined) continue;
    const target: ConfigTarget = {
      path: file,
      format: layout.format,
      collection: [...layout.collection],
      kind: layout.kind,
      entry: layout.entry(launch, serverName, environment),
    };
    if (layout.nameKey !== undefined) target.nameKey = layout.nameKey;
    target.initial = layout.initial;
    if (layout.notes !== undefined) target.notes = [...layout.notes];
    targets.push(target);
  }
  return { targets, skipped: [] };
}

function supported(
  harnessId: string,
  config: {
    project?: readonly ScopeLayout[];
    global?: readonly ScopeLayout[];
    reason?: string;
    discover?: InitAdapter["discover"];
  },
): InitAdapter {
  const project = config.project ?? [];
  const global = config.global ?? [];
  const reason = config.reason !== undefined ? ` (${config.reason})` : "";
  return {
    harnessId,
    project: project.length > 0,
    global: global.length > 0,
    ...(config.reason !== undefined ? { reason: config.reason } : {}),
    async discover(scope, environment, launch): Promise<InitDiscovery> {
      if (config.discover) return config.discover(scope, environment, launch);
      const layouts = scope === "project" ? project : global;
      if (layouts.length === 0)
        return {
          targets: [],
          skipped: [`${harnessId}: ${scope} scope is not supported${reason}`],
        };
      const targets: ConfigTarget[] = [];
      const skipped: string[] = [];
      for (const layout of layouts) {
        const result = emit(harnessId, layout, environment, launch);
        targets.push(...result.targets);
        skipped.push(...result.skipped);
      }
      return { targets, skipped };
    },
  };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Rovo Dev only honors an explicit absolute mcp.mcpConfigPath from config.yml. */
function rovodevAdapter(): InitAdapter {
  return {
    harnessId: "rovodev",
    project: false,
    global: true,
    reason:
      "Only an explicit mcp.mcpConfigPath in ~/.rovodev/config.yml is used; there is no verified default.",
    async discover(scope, environment, launch): Promise<InitDiscovery> {
      if (scope === "project")
        return {
          targets: [],
          skipped: [
            "rovodev: project scope is not supported; there is no project MCP file",
          ],
        };
      const configFile = atHome(environment, ".rovodev", "config.yml");
      if (!existsSync(configFile))
        return {
          targets: [],
          skipped: [
            "rovodev: ~/.rovodev/config.yml is missing; set mcp.mcpConfigPath explicitly",
          ],
        };
      let parsed: unknown;
      try {
        parsed = parseYaml(readFileSync(configFile, "utf8"));
      } catch {
        throw new InitError(
          "invalid_config",
          `Rovo Dev config is not valid YAML: ${configFile}`,
        );
      }
      const configured =
        isRecord(parsed) && isRecord(parsed["mcp"])
          ? parsed["mcp"]["mcpConfigPath"]
          : undefined;
      if (typeof configured !== "string" || configured.trim().length === 0)
        return {
          targets: [],
          skipped: [
            "rovodev: mcp.mcpConfigPath is not set; no default path is guessed",
          ],
        };
      const raw = configured.trim();
      const expanded =
        raw === "~" || raw.startsWith("~/")
          ? path.join(environment.home, raw.slice(1))
          : raw;
      if (!path.isAbsolute(expanded))
        return {
          targets: [],
          skipped: [
            "rovodev: mcp.mcpConfigPath must be an unambiguous absolute path",
          ],
        };
      return {
        targets: [
          {
            path: expanded,
            format: "jsonc",
            collection: ["mcpServers"],
            kind: "map",
            entry: transportEntry(launch, serverName, environment),
            initial: { mcpServers: {} },
          },
        ],
        skipped: [],
      };
    },
  };
}

function unavailable(harnessId: string, reason: string): InitAdapter {
  return {
    harnessId,
    project: false,
    global: false,
    reason,
    async discover(scope): Promise<InitDiscovery> {
      return {
        targets: [],
        skipped: [`${harnessId}: ${scope} scope is not supported (${reason})`],
      };
    },
  };
}

/** Amazon Q keeps MCP servers inside existing per-agent JSON files. */
function amazonQ(): InitAdapter {
  const agents = (root: string): string[] => {
    const directory = path.join(root, "cli-agents");
    if (!existsSync(directory)) return [];
    return readdirSync(directory)
      .filter((name) => name.endsWith(".json"))
      .sort()
      .map((name) => path.join(directory, name));
  };
  return {
    harnessId: "amazon-q",
    project: true,
    global: true,
    reason:
      "MCP servers live in existing per-agent JSON files; a new agent is never created.",
    async discover(scope, environment, launch): Promise<InitDiscovery> {
      const root =
        scope === "project"
          ? path.join(environment.cwd, ".amazonq")
          : atHome(environment, ".aws", "amazonq");
      const files = agents(root);
      if (files.length === 0)
        return {
          targets: [],
          skipped: [
            `amazon-q: no existing agent configuration files for ${scope} scope`,
          ],
        };
      return {
        targets: files.map((file) => ({
          path: file,
          format: "jsonc",
          collection: ["mcpServers"],
          kind: "map",
          entry: stdioEntry(launch, serverName, environment),
          initial: { mcpServers: {} },
        })),
        skipped: [],
      };
    },
  };
}

export const adapters: readonly InitAdapter[] = [
  // knowledge/codex/chapters/codex-cli-mcp-v3.md
  supported("codex", {
    project: [
      tomlMap(["mcp_servers"], {
        paths: (environment) => [
          atProject(environment, ".codex", "config.toml"),
        ],
        notes: ["Project config is loaded only for trusted projects."],
      }),
    ],
    global: [
      tomlMap(["mcp_servers"], {
        paths: (environment) => [
          envDirectory(environment, "CODEX_HOME", "config.toml") ??
            atHome(environment, ".codex", "config.toml"),
        ],
      }),
    ],
  }),

  // knowledge/antigravity/chapters/antigravity-cli-mcp-v2.md
  supported("antigravity", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".agents", "mcp_config.json"),
        ],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atHome(environment, ".gemini", "config", "mcp_config.json"),
        ],
      }),
    ],
  }),

  // knowledge/claude-code/chapters/claude-code-mcp-v3.md
  supported("claude-code", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".mcp.json")],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atHome(environment, ".claude.json")],
      }),
    ],
  }),

  // knowledge/opencode/chapters/opencode-mcp-v4.md
  supported("opencode", {
    project: [
      jsonMap(["mcp"], {
        paths: (environment) => [
          atProject(environment, "opencode.json"),
          atProject(environment, "opencode.jsonc"),
        ],
        create: (environment) => atProject(environment, "opencode.json"),
        entry: localEntry,
      }),
    ],
    global: [
      jsonMap(["mcp"], {
        paths: (environment) => {
          const file = envDirectory(environment, "OPENCODE_CONFIG");
          if (file !== undefined) return [file];
          const directory = envDirectory(environment, "OPENCODE_CONFIG_DIR");
          if (directory !== undefined)
            return [
              path.join(directory, "opencode.json"),
              path.join(directory, "opencode.jsonc"),
            ];
          return [
            atConfig(environment, "opencode", "opencode.json"),
            atConfig(environment, "opencode", "opencode.jsonc"),
          ];
        },
        entry: localEntry,
      }),
    ],
  }),

  // knowledge/pi/chapters/pi-mcp-v3.md
  supported("pi", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".pi", "mcp.json")],
        notes: ["Project entries are read only after the project is trusted."],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          path.join(
            envDirectory(environment, "PI_CODING_AGENT_DIR") ??
              atHome(environment, ".pi", "agent"),
            "mcp.json",
          ),
        ],
        notes: [
          "Configures the default profile only; a named profile keeps its own agent directory.",
        ],
      }),
    ],
  }),

  // knowledge/omp/chapters/omp-mcp-v3.md
  supported("omp", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".omp", "mcp.json")],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          path.join(
            envDirectory(environment, "PI_CODING_AGENT_DIR") ??
              path.join(
                environment.home,
                environment.env.PI_CONFIG_DIR ?? ".omp",
                "agent",
              ),
            "mcp.json",
          ),
        ],
        notes: [
          "Configures the default profile only; named profiles derive their own agent directory.",
        ],
      }),
    ],
  }),

  // knowledge/gemini-cli/chapters/gemini-cli-cli-mcp-v1.md
  supported("gemini-cli", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".gemini", "settings.json"),
        ],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        // GEMINI_CLI_HOME rewrites the home directory, so `.gemini` still applies.
        paths: (environment) => [
          path.join(
            envDirectory(environment, "GEMINI_CLI_HOME") ?? environment.home,
            ".gemini",
            "settings.json",
          ),
        ],
      }),
    ],
  }),

  // knowledge/cursor/chapters/cursor-cli-mcp-v2.md
  supported("cursor", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".cursor", "mcp.json")],
        notes: ["Project entries require workspace approval in the CLI."],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atHome(environment, ".cursor", "mcp.json")],
      }),
    ],
  }),

  // knowledge/cline/chapters/cline-cli-mcp-v2.md
  supported("cline", {
    reason:
      "The CLI keeps one settings file; the VS Code globalStorage path is not resolvable from this chapter.",
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => {
          const explicit = envDirectory(environment, "CLINE_MCP_SETTINGS_PATH");
          if (explicit !== undefined) return [explicit];
          const data =
            envDirectory(environment, "CLINE_DATA_DIR") ??
            atHome(environment, ".cline", "data");
          return [path.join(data, "settings", "cline_mcp_settings.json")];
        },
        entry: typedStdioEntry,
      }),
    ],
  }),

  // knowledge/zoo-code/chapters/zoo-code-vscode-mcp-v2.md
  supported("zoo-code", {
    reason:
      "Global settings live in a VS Code globalStorage profile with no fixed path in this chapter.",
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".roo", "mcp.json")],
        notes: ["Loaded only in a trusted VS Code workspace."],
      }),
    ],
  }),

  // knowledge/kilo-code/chapters/kilo-code-cli-mcp-v1.md
  supported("kilo-code", {
    project: [
      jsonMap(["mcp"], {
        paths: (environment) => [
          atProject(environment, "kilo.json"),
          atProject(environment, "kilo.jsonc"),
          atProject(environment, ".kilo", "kilo.json"),
        ],
        create: (environment) => atProject(environment, "kilo.json"),
        entry: localEntry,
      }),
    ],
    global: [
      jsonMap(["mcp"], {
        paths: (environment) => {
          const file = envDirectory(environment, "KILO_CONFIG");
          if (file !== undefined) return [file];
          const directory = envDirectory(environment, "KILO_CONFIG_DIR");
          if (directory !== undefined)
            return [
              path.join(directory, "kilo.json"),
              path.join(directory, "kilo.jsonc"),
            ];
          return [
            atConfig(environment, "kilo", "kilo.json"),
            atConfig(environment, "kilo", "kilo.jsonc"),
          ];
        },
        entry: localEntry,
      }),
    ],
  }),

  // knowledge/kiro/chapters/kiro-cli-mcp-v2.md
  supported("kiro", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".kiro", "settings", "mcp.json"),
        ],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          path.join(
            envDirectory(environment, "KIRO_HOME") ??
              atHome(environment, ".kiro"),
            "settings",
            "mcp.json",
          ),
        ],
      }),
    ],
  }),

  // knowledge/aider/chapters/aider-cli-mcp-v1.md
  unavailable(
    "aider",
    "Aider has no MCP client or server mechanism in the current sources.",
  ),

  // knowledge/goose/chapters/goose-cli-mcp-v1.md
  supported("goose", {
    reason: "Goose MCP extensions live in the user-level config.yaml only.",
    global: [
      yamlMap(["extensions"], {
        paths: (environment) => [
          environment.platform === "win32"
            ? atRoaming(environment, "Block", "goose", "config", "config.yaml")
            : atConfig(environment, "goose", "config.yaml"),
        ],
        entry: gooseEntry,
      }),
    ],
  }),

  // knowledge/amp/chapters/amp-cli-mcp-v2.md
  supported("amp", {
    project: [
      jsonMap(["amp.mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".amp", "settings.json"),
          atProject(environment, ".amp", "settings.jsonc"),
        ],
        create: (environment) =>
          atProject(environment, ".amp", "settings.json"),
        notes: ["Workspace servers must be approved with `amp mcp approve`."],
      }),
    ],
    global: [
      jsonMap(["amp.mcpServers"], {
        paths: (environment) => [
          atConfig(environment, "amp", "settings.json"),
          atConfig(environment, "amp", "settings.jsonc"),
        ],
        create: (environment) => atConfig(environment, "amp", "settings.json"),
      }),
    ],
  }),

  // knowledge/auggie/chapters/auggie-cli-mcp-v2.md
  supported("auggie", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".augment", "settings.json"),
          atProject(environment, ".augment", "settings.local.json"),
        ],
        create: (environment) =>
          atProject(environment, ".augment", "settings.json"),
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atHome(environment, ".augment", "settings.json"),
        ],
      }),
    ],
  }),

  // knowledge/continue/chapters/continue-cli-mcp-v2.md
  supported("continue", {
    reason:
      "The CLI reads one selected config file; the IDE reads per-server workspace files.",
    global: [
      yamlArray(["mcpServers"], {
        paths: (environment) => [
          path.join(
            envDirectory(environment, "CONTINUE_GLOBAL_DIR") ??
              atHome(environment, ".continue"),
            "config.yaml",
          ),
        ],
        entry: namedEntry,
        optional: true,
        absentReason:
          "continue: an existing config.yaml is required; a valid minimal template is not verified.",
      }),
    ],
    project: [
      // Verified IDE workspace template: name/version/schema plus an mcpServers array.
      yamlArray(["mcpServers"], {
        paths: (environment) => [
          atProject(
            environment,
            ".continue",
            "mcpServers",
            "agent-harness-wiki.yaml",
          ),
        ],
        entry: namedEntry,
        initial: {
          name: serverName,
          version: "1.0.0",
          schema: "v1",
          mcpServers: [],
        },
        notes: [
          "Configures the Continue IDE; the CLI does not load project server files.",
        ],
      }),
    ],
  }),

  // knowledge/qwen-code/chapters/qwen-code-cli-mcp-v2.md
  supported("qwen-code", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".qwen", "settings.json"),
        ],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atHome(environment, ".qwen", "settings.json")],
      }),
    ],
  }),

  // knowledge/trae/chapters/trae-trae-mcp-v1.md
  supported("trae", {
    reason: "User-level MCP is configured only in the Trae UI.",
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".trae", "mcp.json")],
        notes: [
          "The project file load switch must be enabled in Trae settings.",
        ],
      }),
    ],
  }),

  // knowledge/zed/chapters/zed-zed-mcp-v1.md
  supported("zed", {
    project: [
      jsonMap(["context_servers"], {
        paths: (environment) => [
          atProject(environment, ".zed", "settings.json"),
        ],
        notes: ["Project settings load only in a trusted worktree."],
      }),
    ],
    global: [
      jsonMap(["context_servers"], {
        paths: (environment) => [
          environment.platform === "win32"
            ? atRoaming(environment, "Zed", "settings.json")
            : environment.platform === "darwin"
              ? atHome(environment, ".config", "zed", "settings.json")
              : path.join(
                  absoluteEnv(environment, "FLATPAK_XDG_CONFIG_HOME") ??
                    atConfig(environment),
                  "zed",
                  "settings.json",
                ),
        ],
      }),
    ],
  }),

  // knowledge/amazon-q/chapters/amazon-q-cli-mcp-v1.md
  amazonQ(),

  // knowledge/command-code/chapters/command-code-cli-mcp-v1.md
  supported("command-code", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".mcp.json")],
        entry: transportEntry,
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atHome(environment, ".commandcode", "mcp.json"),
        ],
        entry: transportEntry,
      }),
    ],
  }),

  // knowledge/codebuddy/chapters/codebuddy-cli-mcp-v1.md
  supported("codebuddy", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".mcp.json"),
          atProject(environment, "mcp.json"),
        ],
        create: (environment) => atProject(environment, ".mcp.json"),
        notes: ["Project servers require one-time approval."],
        entry: typedStdioEntry,
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atHome(environment, ".codebuddy", ".mcp.json"),
          atHome(environment, ".codebuddy", "mcp.json"),
          atHome(environment, ".codebuddy.json"),
        ],
        create: (environment) => atHome(environment, ".codebuddy", ".mcp.json"),
        entry: typedStdioEntry,
      }),
    ],
  }),

  // knowledge/junie/chapters/junie-cli-mcp-v1.md
  supported("junie", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".junie", "mcp", "mcp.json"),
        ],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atHome(environment, ".junie", "mcp", "mcp.json"),
        ],
      }),
    ],
  }),

  // knowledge/kimi-code/chapters/kimi-code-cli-mcp-v2.md
  supported("kimi-code", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".kimi-code", "mcp.json"),
        ],
        notes: [
          "Project stdio entries run local commands; enable only in trusted repos.",
        ],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          envDirectory(environment, "KIMI_CODE_HOME", "mcp.json") ??
            atHome(environment, ".kimi-code", "mcp.json"),
        ],
      }),
    ],
  }),

  // knowledge/minimax-code/chapters/minimax-code-cli-mcp-v2.md
  supported("minimax-code", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".mcp.json")],
        notes: [
          "The project file is read-only to the host; it is loaded when the file exists.",
        ],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => {
          const data =
            envDirectory(environment, "MINIMAX_DATA_DIR") ??
            envDirectory(environment, "MAVIS_DATA_DIR") ??
            atHome(environment, ".minimax");
          return [
            path.join(data, "mcp.json"),
            path.join(data, "mcp", "mcp.json"),
          ];
        },
        create: (environment) =>
          path.join(
            envDirectory(environment, "MINIMAX_DATA_DIR") ??
              envDirectory(environment, "MAVIS_DATA_DIR") ??
              atHome(environment, ".minimax"),
            "mcp.json",
          ),
      }),
    ],
  }),

  // knowledge/mistral-vibe/chapters/mistral-vibe-cli-mcp-v1.md
  supported("mistral-vibe", {
    project: [
      tomlArray(["mcp_servers"], {
        paths: (environment) => [
          atProject(environment, ".vibe", "config.toml"),
        ],
        entry: mistralEntry,
      }),
    ],
    global: [
      tomlArray(["mcp_servers"], {
        paths: (environment) => [
          envDirectory(environment, "VIBE_HOME", "config.toml") ??
            atHome(environment, ".vibe", "config.toml"),
        ],
        entry: mistralEntry,
      }),
    ],
  }),

  // knowledge/qoder/chapters/qoder-qoder-mcp-v1.md
  supported("qoder", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".qoder", "settings.json"),
          atProject(environment, ".mcp.json"),
          atProject(environment, ".qoder", "settings.local.json"),
        ],
        create: (environment) =>
          atProject(environment, ".qoder", "settings.json"),
        notes: [
          "File scope follows the CLI reference; the IDE page does not confirm it.",
        ],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atHome(environment, ".qoder", "settings.json"),
        ],
      }),
    ],
  }),

  // knowledge/github-copilot/chapters/github-copilot-cli-mcp-v2.md
  supported("github-copilot", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".mcp.json"),
          atProject(environment, ".github", "mcp.json"),
        ],
        create: (environment) => atProject(environment, ".mcp.json"),
        notes: ["Project files load only in a trusted directory."],
        entry: copilotEntry,
      }),
      jsonMap(["servers"], {
        paths: (environment) => [atProject(environment, ".vscode", "mcp.json")],
        notes: [
          "VS Code file: root `servers` map, updated only when it already exists.",
        ],
        entry: vscodeEntry,
        optional: true,
        absentReason:
          "github-copilot: no existing .vscode/mcp.json to update for the VS Code surface.",
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          envDirectory(environment, "COPILOT_HOME", "mcp-config.json") ??
            atHome(environment, ".copilot", "mcp-config.json"),
        ],
        entry: copilotEntry,
      }),
    ],
  }),

  // knowledge/devin/chapters/devin-cli-mcp-v1.md
  supported("devin", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".devin", "mcp_config.json"),
          atProject(environment, ".devin", "mcp_config.local.json"),
        ],
        create: (environment) =>
          atProject(environment, ".devin", "mcp_config.json"),
        notes: [
          "`.devin/mcp_config.local.json` is gitignored and holds personal values.",
        ],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          environment.platform === "win32"
            ? atRoaming(environment, "devin", "mcp_config.json")
            : atConfig(environment, "devin", "mcp_config.json"),
        ],
      }),
    ],
  }),

  // knowledge/crush/chapters/crush-cli-mcp-v2.md
  supported("crush", {
    project: [
      jsonMap(["mcp"], {
        paths: (environment) => [
          atProject(environment, "crush.json"),
          atProject(environment, ".crush.json"),
          atProject(environment, ".crush", "crush.json"),
        ],
        create: (environment) => atProject(environment, "crush.json"),
        entry: typedStdioEntry,
      }),
    ],
    global: [
      jsonMap(["mcp"], {
        paths: (environment) => [
          envDirectory(environment, "CRUSH_GLOBAL_CONFIG", "crush.json") ??
            atConfig(environment, "crush", "crush.json"),
        ],
        entry: typedStdioEntry,
      }),
    ],
  }),

  // knowledge/factory-droid/chapters/factory-droid-cli-mcp-v1.md
  supported("factory-droid", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".factory", "mcp.json"),
        ],
        notes: [
          "Project servers cannot be removed by CLI; edit the file directly.",
        ],
        entry: typedStdioEntry,
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atHome(environment, ".factory", "mcp.json")],
        entry: typedStdioEntry,
      }),
    ],
  }),

  // knowledge/forgecode/chapters/forgecode-cli-mcp-v2.md
  supported("forgecode", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".mcp.json")],
        notes: [
          "The project file must be accepted once in Forge's trust prompt.",
        ],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          path.join(
            environment.env.FORGE_CONFIG ?? atHome(environment, "forge"),
            ".mcp.json",
          ),
        ],
      }),
    ],
  }),

  // knowledge/costrict/chapters/costrict-cli-mcp-v1.md
  supported("costrict", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".mcp.json")],
        notes: ["Project servers require approval before CSC loads them."],
        entry: windowsCmdTypedEntry,
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atHome(environment, ".costrict.json")],
        entry: windowsCmdTypedEntry,
      }),
    ],
  }),

  // knowledge/bob/chapters/bob-cli-mcp-v2.md
  supported("bob", {
    reason:
      "Official pages disagree on the global file path, so global scope is skipped.",
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".bob", "mcp.json")],
      }),
    ],
  }),

  // knowledge/lingma/chapters/lingma-jetbrains-mcp-v2.md
  unavailable(
    "lingma",
    "MCP is configured only in the JetBrains plugin UI; no file path is documented.",
  ),

  // knowledge/autohand/chapters/autohand-cli-mcp-v2.md
  supported("autohand", {
    project: [
      jsonArray(["mcp", "servers"], {
        paths: (environment) => [
          atProject(environment, ".autohand", "settings.local.json"),
          atProject(environment, ".autohand", "config.json"),
        ],
        create: (environment) =>
          atProject(environment, ".autohand", "settings.local.json"),
        notes: ["Project MCP entries are gated by workspace trust."],
        entry: autohandEntry,
      }),
    ],
    global: [
      jsonArray(["mcp", "servers"], {
        paths: (environment) => [
          envDirectory(environment, "AUTOHAND_CONFIG") ??
            atHome(environment, ".autohand", "config.json"),
        ],
        entry: autohandEntry,
      }),
    ],
  }),

  // knowledge/codebuff/chapters/codebuff-cli-mcp-v3.md
  supported("codebuff", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".agents", "mcp.json")],
        notes: [
          "A repository `.agents` directory must be trusted before its servers load.",
        ],
        entry: typedStdioEntry,
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atHome(environment, ".agents", "mcp.json")],
        entry: typedStdioEntry,
      }),
    ],
  }),

  // knowledge/grok/chapters/grok-cli-mcp-v1.md
  supported("grok", {
    project: [
      tomlMap(["mcp_servers"], {
        paths: (environment) => [
          atProject(environment, ".grok", "config.toml"),
        ],
        notes: [
          "Project config applies to the repository whose root holds it.",
        ],
      }),
    ],
    global: [
      tomlMap(["mcp_servers"], {
        paths: (environment) => [
          envDirectory(environment, "GROK_HOME", "config.toml") ??
            atHome(environment, ".grok", "config.toml"),
        ],
      }),
    ],
  }),

  // knowledge/prime-agent/chapters/prime-agent-cli-mcp-v2.md
  supported("prime-agent", {
    reason:
      "MCP execution is restricted to user/global settings; project entries are ignored.",
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atHome(environment, ".prime", "agent", "settings.json"),
        ],
        entry: typedStdioEntry,
      }),
    ],
  }),

  // knowledge/rovodev/chapters/rovodev-cli-mcp-v1.md
  rovodevAdapter(),

  // knowledge/openhands/chapters/openhands-cli-mcp-v1.md
  supported("openhands", {
    reason:
      "The CLI has a single user-level `mcp.json`; no project scope exists.",
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          envDirectory(environment, "OPENHANDS_PERSISTENCE_DIR", "mcp.json") ??
            atHome(environment, ".openhands", "mcp.json"),
        ],
        notes: [
          "The Agent Canvas settings file is encrypted and is not written.",
        ],
        entry: openhandsEntry,
      }),
    ],
  }),

  // knowledge/warp/chapters/warp-desktop-mcp-v1.md
  supported("warp", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".warp", ".mcp.json")],
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atHome(environment, ".warp", ".mcp.json")],
      }),
    ],
  }),

  // knowledge/replit-agent/chapters/replit-agent-web-mcp-v1.md
  unavailable(
    "replit-agent",
    "MCP servers are registered in the Replit web UI; there is no local configuration file.",
  ),

  // knowledge/lovable/chapters/lovable-web-mcp-v1.md
  unavailable(
    "lovable",
    "MCP connectors are configured in the Lovable web UI; there is no local configuration file.",
  ),

  // knowledge/bolt/chapters/bolt-web-mcp-v1.md
  unavailable(
    "bolt",
    "MCP connectors are configured in the Bolt web UI; there is no local configuration file.",
  ),

  // knowledge/roo-code/chapters/roo-code-vscode-mcp-v2.md
  supported("roo-code", {
    reason:
      "Global settings live in a VS Code globalStorage profile with no fixed path in this chapter.",
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [atProject(environment, ".roo", "mcp.json")],
        notes: ["Loaded only in a trusted VS Code workspace."],
      }),
    ],
  }),

  // knowledge/sourcecraft-code-assistant/chapters/sourcecraft-code-assistant-vscode-mcp-v1.md
  supported("sourcecraft-code-assistant", {
    reason:
      "Global `mcp_settings.json` is a VS Code settings entry, not a fixed file path.",
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".codeassistant", "mcp.json"),
        ],
        entry: windowsCmdEntry,
      }),
    ],
  }),

  // knowledge/deepseek-harness/chapters/deepseek-harness-mcp-v1.md
  supported("deepseek-harness", {
    reason:
      "MCP entries are inserted into a Cordis patch layer; the verified user layer is DSH_HOME.",
    global: [
      makeLayout("yaml", "dsh", [], undefined, {
        paths: (environment) => [
          envDirectory(environment, "DSH_HOME", "cordis.patch.yml") ??
            atHome(environment, ".dsh", "cordis.patch.yml"),
        ],
        entry: dshEntry,
        initial: [],
      }),
    ],
  }),

  // knowledge/deep-agents/chapters/deep-agents-cli-mcp-v1.md
  supported("deep-agents", {
    project: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          atProject(environment, ".mcp.json"),
          atProject(environment, ".deepagents", ".mcp.json"),
        ],
        create: (environment) =>
          atProject(environment, ".deepagents", ".mcp.json"),
        multiple: true,
      }),
    ],
    global: [
      jsonMap(["mcpServers"], {
        paths: (environment) => [
          envDirectory(environment, "DEEPAGENTS_HOME", ".mcp.json") ??
            atHome(environment, ".deepagents", ".mcp.json"),
        ],
      }),
    ],
  }),
];
