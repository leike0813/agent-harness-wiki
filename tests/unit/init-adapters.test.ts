import {
  mkdirSync,
  mkdtempSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { adapters } from "../../src/consumer/init/adapters.js";
import { loadInitProducts } from "../../src/consumer/init/catalog.js";
import {
  serverName,
  type ConfigTarget,
  type InitEnvironment,
  type InitScope,
  type McpLaunch,
} from "../../src/consumer/init/types.js";

const launch: McpLaunch = {
  command: "npx",
  args: ["-y", "agent-harness-wiki", "mcp"],
};

const temporary: string[] = [];

interface Sandbox {
  root: string;
  home: string;
  cwd: string;
  environment: InitEnvironment;
}

function sandbox(
  options: { env?: NodeJS.ProcessEnv; platform?: NodeJS.Platform } = {},
): Sandbox {
  const root = realpathSync(mkdtempSync(path.join(tmpdir(), "ahw-init-")));
  temporary.push(root);
  const home = path.join(root, "home");
  const cwd = path.join(root, "project");
  mkdirSync(home, { recursive: true });
  mkdirSync(cwd, { recursive: true });
  return {
    root,
    home,
    cwd,
    environment: {
      cwd,
      home,
      platform: options.platform ?? "linux",
      env: options.env ?? {},
    },
  };
}

function directory(current: Sandbox, name: string): string {
  const target = path.join(current.root, name);
  mkdirSync(target, { recursive: true });
  return target;
}

function writeFile(...segments: string[]): string {
  const file = path.join(...segments);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, "{}");
  return file;
}

afterEach(() => {
  while (temporary.length > 0) {
    const root = temporary.pop();
    if (root) rmSync(root, { recursive: true, force: true });
  }
});

function adapterOf(harnessId: string) {
  const found = adapters.find((item) => item.harnessId === harnessId);
  if (!found) throw new Error(`missing adapter: ${harnessId}`);
  return found;
}

async function discover(
  harnessId: string,
  scope: InitScope,
  environment: InitEnvironment,
) {
  return adapterOf(harnessId).discover(scope, environment, launch);
}

async function firstTarget(
  harnessId: string,
  scope: InitScope,
  environment: InitEnvironment,
): Promise<ConfigTarget> {
  const result = await discover(harnessId, scope, environment);
  expect(result.targets.length).toBeGreaterThan(0);
  const target = result.targets[0];
  if (!target) throw new Error(`no target for ${harnessId} ${scope}`);
  return target;
}

const scopes: InitScope[] = ["project", "global"];

test("adapters account for every catalog identity exactly once", async () => {
  const products = await loadInitProducts();
  const ids = adapters.map((item) => item.harnessId);
  expect(new Set(ids).size).toBe(ids.length);
  expect(ids.length).toBe(50);
  expect([...ids].sort()).toEqual(
    products.map((product) => product.harness_id).sort(),
  );
});

test("supported scopes emit well-formed absolute targets", async () => {
  const current = sandbox();
  for (const item of adapters) {
    for (const scope of scopes) {
      if (!item[scope]) continue;
      const result = await item.discover(scope, current.environment, launch);
      for (const target of result.targets) {
        expect(path.isAbsolute(target.path)).toBe(true);
        expect(["jsonc", "toml", "yaml"]).toContain(target.format);
        expect(["map", "array", "dsh"]).toContain(target.kind);
        expect(Object.keys(target.entry).length).toBeGreaterThan(0);
        if (target.kind === "array") {
          expect(target.nameKey).toBeTruthy();
          if (target.nameKey)
            expect(target.entry[target.nameKey]).toBe(serverName);
        }
        if (target.kind === "map") {
          expect(target.collection.length).toBeGreaterThan(0);
        }
        if (scope === "project") {
          expect(path.relative(current.cwd, target.path).startsWith("..")).toBe(
            false,
          );
        }
      }
    }
  }
});

test("unavailable products skip both scopes", async () => {
  const current = sandbox();
  for (const id of ["aider", "bolt", "lingma", "lovable", "replit-agent"]) {
    const item = adapterOf(id);
    expect(item.project).toBe(false);
    expect(item.global).toBe(false);
    expect(item.reason).toBeTruthy();
    for (const scope of scopes) {
      const result = await item.discover(scope, current.environment, launch);
      expect(result.targets).toEqual([]);
      expect(result.skipped.length).toBeGreaterThan(0);
    }
  }
});

test("partially verified products only expose verified scopes", async () => {
  const current = sandbox();
  const expectations: Array<[string, boolean, boolean]> = [
    ["roo-code", true, false],
    ["zoo-code", true, false],
    ["bob", true, false],
    ["trae", true, false],
    ["sourcecraft-code-assistant", true, false],
    ["goose", false, true],
    ["continue", true, true],
    ["cline", false, true],
    ["openhands", false, true],
    ["prime-agent", false, true],
    ["deepseek-harness", false, true],
    ["rovodev", false, true],
  ];
  for (const [id, project, global] of expectations) {
    const item = adapterOf(id);
    expect([id, item.project, item.global]).toEqual([id, project, global]);
    expect(item.reason).toBeTruthy();
    const unsupported: InitScope = project ? "global" : "project";
    const result = await item.discover(
      unsupported,
      current.environment,
      launch,
    );
    expect(result.targets).toEqual([]);
    expect(result.skipped.length).toBeGreaterThan(0);
  }
});

test("entries are built from the launch command and server name", async () => {
  const current = sandbox();

  const codex = await firstTarget("codex", "project", current.environment);
  expect(codex.format).toBe("toml");
  expect(codex.collection).toEqual(["mcp_servers"]);
  expect(codex.kind).toBe("map");
  expect(codex.path).toBe(path.join(current.cwd, ".codex", "config.toml"));
  expect(codex.entry).toEqual({ command: launch.command, args: launch.args });

  const opencode = await firstTarget(
    "opencode",
    "project",
    current.environment,
  );
  expect(opencode.entry).toEqual({
    type: "local",
    command: [launch.command, ...launch.args],
  });

  const amp = await firstTarget("amp", "project", current.environment);
  expect(amp.collection).toEqual(["amp.mcpServers"]);

  const goose = await firstTarget("goose", "global", current.environment);
  expect(goose.format).toBe("yaml");
  expect(goose.collection).toEqual(["extensions"]);
  expect(goose.entry).toMatchObject({
    name: serverName,
    cmd: launch.command,
    args: launch.args,
    type: "stdio",
    enabled: true,
  });

  const mistral = await firstTarget(
    "mistral-vibe",
    "global",
    current.environment,
  );
  expect(mistral.kind).toBe("array");
  expect(mistral.nameKey).toBe("name");
  expect(mistral.entry).toMatchObject({
    name: serverName,
    transport: "stdio",
    command: launch.command,
    args: launch.args,
  });

  const autohand = await firstTarget("autohand", "global", current.environment);
  expect(autohand.collection).toEqual(["mcp", "servers"]);
  expect(autohand.kind).toBe("array");
  expect(autohand.entry).toMatchObject({
    name: serverName,
    transport: "stdio",
  });

  const cline = await firstTarget("cline", "global", current.environment);
  expect(cline.entry).toMatchObject({ type: "stdio", command: launch.command });

  const commandCode = await firstTarget(
    "command-code",
    "project",
    current.environment,
  );
  expect(commandCode.entry).toMatchObject({
    transport: "stdio",
    command: launch.command,
    args: launch.args,
  });

  const openhands = await firstTarget(
    "openhands",
    "global",
    current.environment,
  );
  expect(openhands.entry).toMatchObject({ transport: "stdio", enabled: true });

  const dsh = await firstTarget(
    "deepseek-harness",
    "global",
    current.environment,
  );
  expect(dsh.kind).toBe("dsh");
  expect(dsh.collection).toEqual([]);
  expect(dsh.entry).toMatchObject({
    id: serverName,
    name: "@deepseek-ai/dsh-mcp-client",
    config: {
      serverName,
      transport: "stdio",
      command: launch.command,
      args: launch.args,
    },
  });
});

test("continue array and copilot required fields", async () => {
  const current = sandbox();
  const config = writeFile(current.home, ".continue", "config.yaml");
  const continueTarget = await firstTarget(
    "continue",
    "global",
    current.environment,
  );
  expect(continueTarget.path).toBe(config);
  expect(continueTarget.kind).toBe("array");
  expect(continueTarget.entry).toMatchObject({ name: serverName });

  const copilot = await firstTarget(
    "github-copilot",
    "project",
    current.environment,
  );
  expect(copilot.collection).toEqual(["mcpServers"]);
  expect(copilot.entry).toMatchObject({ type: "stdio", tools: ["*"] });

  writeFile(current.cwd, ".vscode", "mcp.json");
  const copilotAll = await discover(
    "github-copilot",
    "project",
    current.environment,
  );
  const vscode = copilotAll.targets.find((target) =>
    target.collection.includes("servers"),
  );
  expect(vscode).toBeTruthy();
  expect(vscode?.entry).toMatchObject({
    type: "stdio",
    command: launch.command,
  });
});

test("config-root environment overrides are honored", async () => {
  const current = sandbox();
  const env: NodeJS.ProcessEnv = {
    CODEX_HOME: directory(current, "codex"),
    GEMINI_CLI_HOME: directory(current, "gemini"),
    KIRO_HOME: directory(current, "kiro"),
    CONTINUE_GLOBAL_DIR: directory(current, "continue"),
    CLINE_DATA_DIR: directory(current, "cline"),
    MINIMAX_DATA_DIR: directory(current, "minimax"),
    VIBE_HOME: directory(current, "vibe"),
    FORGE_CONFIG: directory(current, "forge"),
    COPILOT_HOME: directory(current, "copilot"),
    OPENHANDS_PERSISTENCE_DIR: directory(current, "openhands"),
    DSH_HOME: directory(current, "dsh"),
    DEEPAGENTS_HOME: directory(current, "deepagents"),
    PI_CODING_AGENT_DIR: directory(current, "pi-agent"),
    OPENCODE_CONFIG: path.join(directory(current, "opencode"), "custom.json"),
    KILO_CONFIG: path.join(directory(current, "kilo"), "custom.json"),
    GROK_HOME: directory(current, "grok"),
    KIMI_CODE_HOME: directory(current, "kimi"),
    CRUSH_GLOBAL_CONFIG: directory(current, "crush"),
    XDG_CONFIG_HOME: directory(current, "xdg"),
  };
  current.environment.env = env;
  writeFile(current.root, "continue", "config.yaml");

  expect((await firstTarget("codex", "global", current.environment)).path).toBe(
    path.join(env.CODEX_HOME ?? "", "config.toml"),
  );
  expect(
    (await firstTarget("gemini-cli", "global", current.environment)).path,
  ).toBe(path.join(env.GEMINI_CLI_HOME ?? "", ".gemini", "settings.json"));
  expect(
    (await firstTarget("qwen-code", "global", current.environment)).path,
  ).toBe(path.join(current.home, ".qwen", "settings.json"));
  expect((await firstTarget("kiro", "global", current.environment)).path).toBe(
    path.join(env.KIRO_HOME ?? "", "settings", "mcp.json"),
  );
  expect(
    (await firstTarget("continue", "global", current.environment)).path,
  ).toBe(path.join(env.CONTINUE_GLOBAL_DIR ?? "", "config.yaml"));
  expect((await firstTarget("cline", "global", current.environment)).path).toBe(
    path.join(env.CLINE_DATA_DIR ?? "", "settings", "cline_mcp_settings.json"),
  );
  expect(
    (await firstTarget("minimax-code", "global", current.environment)).path,
  ).toBe(path.join(env.MINIMAX_DATA_DIR ?? "", "mcp.json"));
  expect(
    (await firstTarget("mistral-vibe", "global", current.environment)).path,
  ).toBe(path.join(env.VIBE_HOME ?? "", "config.toml"));
  expect(
    (await firstTarget("forgecode", "global", current.environment)).path,
  ).toBe(path.join(env.FORGE_CONFIG ?? "", ".mcp.json"));
  expect(
    (await firstTarget("github-copilot", "global", current.environment)).path,
  ).toBe(path.join(env.COPILOT_HOME ?? "", "mcp-config.json"));
  expect(
    (await firstTarget("openhands", "global", current.environment)).path,
  ).toBe(path.join(env.OPENHANDS_PERSISTENCE_DIR ?? "", "mcp.json"));
  expect(
    (await firstTarget("deepseek-harness", "global", current.environment)).path,
  ).toBe(path.join(env.DSH_HOME ?? "", "cordis.patch.yml"));
  expect(
    (await firstTarget("deep-agents", "global", current.environment)).path,
  ).toBe(path.join(env.DEEPAGENTS_HOME ?? "", ".mcp.json"));
  expect((await firstTarget("pi", "global", current.environment)).path).toBe(
    path.join(env.PI_CODING_AGENT_DIR ?? "", "mcp.json"),
  );
  expect((await firstTarget("omp", "global", current.environment)).path).toBe(
    path.join(env.PI_CODING_AGENT_DIR ?? "", "mcp.json"),
  );
  expect((await firstTarget("grok", "global", current.environment)).path).toBe(
    path.join(env.GROK_HOME ?? "", "config.toml"),
  );
  expect(
    (await firstTarget("kimi-code", "global", current.environment)).path,
  ).toBe(path.join(env.KIMI_CODE_HOME ?? "", "mcp.json"));
  expect((await firstTarget("crush", "global", current.environment)).path).toBe(
    path.join(env.CRUSH_GLOBAL_CONFIG ?? "", "crush.json"),
  );
  expect((await firstTarget("zed", "global", current.environment)).path).toBe(
    path.join(env.XDG_CONFIG_HOME ?? "", "zed", "settings.json"),
  );
});

test.each([
  ["win32", "APPDATA", "Zed"],
  ["darwin", undefined, "zed"],
  ["linux", "XDG_CONFIG_HOME", "zed"],
  ["linux", "FLATPAK_XDG_CONFIG_HOME", "zed"],
] as const)(
  "Zed %s honors its platform configuration root (%s)",
  async (platform, variable, productDirectory) => {
    const current = sandbox({ platform });
    const custom = directory(current, "custom");
    current.environment.env = {
      XDG_CONFIG_HOME: directory(current, "xdg"),
      ...(variable ? { [variable]: custom } : {}),
    };
    const expected = variable ? custom : path.join(current.home, ".config");
    expect((await firstTarget("zed", "global", current.environment)).path).toBe(
      path.join(expected, productDirectory, "settings.json"),
    );
  },
);

test("explicit config overrides win even before the file exists", async () => {
  const current = sandbox();
  current.environment.env = {
    OPENCODE_CONFIG: path.join(current.root, "missing", "custom.json"),
    KILO_CONFIG: path.join(current.root, "missing", "custom.json"),
  };
  expect(
    (await firstTarget("opencode", "global", current.environment)).path,
  ).toBe(current.environment.env.OPENCODE_CONFIG ?? "");
  expect(
    (await firstTarget("kilo-code", "global", current.environment)).path,
  ).toBe(current.environment.env.KILO_CONFIG ?? "");

  const directoryOverride = sandbox();
  directoryOverride.environment.env = {
    OPENCODE_CONFIG_DIR: path.join(directoryOverride.root, "opencode-dir"),
    KILO_CONFIG_DIR: path.join(directoryOverride.root, "kilo-dir"),
  };
  expect(
    (await firstTarget("opencode", "global", directoryOverride.environment))
      .path,
  ).toBe(
    path.join(
      directoryOverride.environment.env.OPENCODE_CONFIG_DIR ?? "",
      "opencode.json",
    ),
  );
  expect(
    (await firstTarget("kilo-code", "global", directoryOverride.environment))
      .path,
  ).toBe(
    path.join(
      directoryOverride.environment.env.KILO_CONFIG_DIR ?? "",
      "kilo.json",
    ),
  );
});

test("MAVIS, CLINE file path, AUTOHAND file and PI config name overrides", async () => {
  const current = sandbox();
  const mavis = directory(current, "mavis");
  const clineFile = path.join(
    directory(current, "cline-file"),
    "settings.json",
  );
  const autohandFile = path.join(directory(current, "autohand"), "config.json");
  current.environment.env = {
    MAVIS_DATA_DIR: mavis,
    CLINE_MCP_SETTINGS_PATH: clineFile,
    AUTOHAND_CONFIG: autohandFile,
    PI_CONFIG_DIR: "myomp",
  };
  expect(
    (await firstTarget("minimax-code", "global", current.environment)).path,
  ).toBe(path.join(mavis, "mcp.json"));
  expect((await firstTarget("cline", "global", current.environment)).path).toBe(
    clineFile,
  );
  expect(
    (await firstTarget("autohand", "global", current.environment)).path,
  ).toBe(autohandFile);
  expect((await firstTarget("omp", "global", current.environment)).path).toBe(
    path.join(current.home, "myomp", "agent", "mcp.json"),
  );
});

test("relative overrides resolve from the project directory and empty XDG falls back", async () => {
  const current = sandbox();
  current.environment.env = {
    CODEX_HOME: "relative-home",
    XDG_CONFIG_HOME: "",
  };
  expect((await firstTarget("codex", "global", current.environment)).path).toBe(
    path.join(current.cwd, "relative-home", "config.toml"),
  );
  expect((await firstTarget("zed", "global", current.environment)).path).toBe(
    path.join(current.home, ".config", "zed", "settings.json"),
  );
});

test("existing alternative files win and deep-agents keeps every existing file", async () => {
  const current = sandbox();
  writeFile(current.cwd, "opencode.jsonc");
  expect(
    (await firstTarget("opencode", "project", current.environment)).path,
  ).toBe(path.join(current.cwd, "opencode.jsonc"));

  writeFile(current.home, ".codebuddy.json");
  expect(
    (await firstTarget("codebuddy", "global", current.environment)).path,
  ).toBe(path.join(current.home, ".codebuddy.json"));

  const rootFile = writeFile(current.cwd, ".mcp.json");
  const nestedFile = writeFile(current.cwd, ".deepagents", ".mcp.json");
  const both = await discover("deep-agents", "project", current.environment);
  expect(both.targets.map((target) => target.path).sort()).toEqual(
    [rootFile, nestedFile].sort(),
  );

  const empty = sandbox();
  const canonical = await firstTarget(
    "deep-agents",
    "project",
    empty.environment,
  );
  expect(canonical.path).toBe(path.join(empty.cwd, ".deepagents", ".mcp.json"));
});

test("amazon-q edits only existing agent files", async () => {
  const current = sandbox();
  expect(
    (await discover("amazon-q", "project", current.environment)).targets,
  ).toEqual([]);

  const first = writeFile(current.cwd, ".amazonq", "cli-agents", "a.json");
  const second = writeFile(current.cwd, ".amazonq", "cli-agents", "b.json");
  const result = await discover("amazon-q", "project", current.environment);
  expect(result.targets.map((target) => target.path)).toEqual([first, second]);
  for (const target of result.targets) {
    expect(target.collection).toEqual(["mcpServers"]);
    expect(target.entry).toEqual({
      command: launch.command,
      args: launch.args,
    });
  }
});

test("continue IDE workspace file uses the verified template", async () => {
  const current = sandbox();
  const target = await firstTarget("continue", "project", current.environment);
  expect(target.path).toBe(
    path.join(
      current.cwd,
      ".continue",
      "mcpServers",
      "agent-harness-wiki.yaml",
    ),
  );
  expect(target.format).toBe("yaml");
  expect(target.kind).toBe("array");
  expect(target.nameKey).toBe("name");
  expect(target.initial).toMatchObject({
    name: serverName,
    version: "1.0.0",
    schema: "v1",
    mcpServers: [],
  });
});

test("rovodev only uses an explicit absolute mcpConfigPath", async () => {
  const current = sandbox();
  const target = directory(current, "rovo");
  const config = path.join(current.home, ".rovodev", "config.yml");
  mkdirSync(path.dirname(config), { recursive: true });
  writeFileSync(config, `mcp:\n  mcpConfigPath: ${target}/mcp_config.json\n`);
  const resolved = await firstTarget("rovodev", "global", current.environment);
  expect(resolved.path).toBe(path.join(target, "mcp_config.json"));
  expect(resolved.format).toBe("jsonc");
  expect(resolved.collection).toEqual(["mcpServers"]);
  expect(resolved.entry).toMatchObject({
    transport: "stdio",
    command: launch.command,
    args: launch.args,
  });

  writeFileSync(config, "mcp:\n  mcpConfigPath: ~/.rovodev/mcp_config.json\n");
  expect(
    (await firstTarget("rovodev", "global", current.environment)).path,
  ).toBe(path.join(current.home, ".rovodev", "mcp_config.json"));
});

test("rovodev skips ambiguous defaults and rejects invalid config", async () => {
  const current = sandbox();
  expect(
    (await discover("rovodev", "global", current.environment)).targets,
  ).toEqual([]);

  const config = path.join(current.home, ".rovodev", "config.yml");
  mkdirSync(path.dirname(config), { recursive: true });
  writeFileSync(config, "mcp:\n  mcpConfigPath: relative/path.json\n");
  const relative = await discover("rovodev", "global", current.environment);
  expect(relative.targets).toEqual([]);
  expect(relative.skipped.length).toBeGreaterThan(0);

  writeFileSync(config, "mcp: [unclosed\n");
  await expect(
    discover("rovodev", "global", current.environment),
  ).rejects.toMatchObject({ code: "invalid_config" });
});

test("host-documented Windows command wrapping applies", async () => {
  const current = sandbox({ platform: "win32" });
  for (const [id, scope] of [
    ["costrict", "global"],
    ["sourcecraft-code-assistant", "project"],
  ] as Array<[string, InitScope]>) {
    const target = await firstTarget(id, scope, current.environment);
    expect(target.entry.command).toBe("cmd");
    expect(target.entry.args).toEqual(["/c", launch.command, ...launch.args]);
  }
});
