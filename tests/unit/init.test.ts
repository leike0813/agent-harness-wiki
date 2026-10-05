import * as fs from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { runInit, initLaunch } from "../../src/consumer/init/command.js";
import { selectInitProducts } from "../../src/consumer/init/catalog.js";
import {
  applyInitPlan,
  prepareInitPlan,
} from "../../src/consumer/init/service.js";
import {
  serverName,
  type InitAdapter,
  type InitEnvironment,
  type InitProduct,
  type InitPromptPort,
} from "../../src/consumer/init/types.js";

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  return {
    ...actual,
    rename: vi.fn(actual.rename),
    access: vi.fn(actual.access),
  };
});

const products: InitProduct[] = [
  { harness_id: "demo-project", name: "Demo Project", aliases: ["demo-alias"] },
  { harness_id: "demo-global", name: "Demo Global", aliases: [] },
];
let root: string;
let environment: InitEnvironment;
let adapters: InitAdapter[];
const launch = { command: "npx", args: ["-y", "agent-harness-wiki", "mcp"] };

beforeEach(async () => {
  root = await fs.mkdtemp(path.join(tmpdir(), "ahw init "));
  environment = {
    cwd: path.join(root, "project"),
    home: path.join(root, "home"),
    platform: process.platform,
    env: {},
  };
  await fs.mkdir(environment.cwd);
  await fs.mkdir(environment.home);
  adapters = products.map((product, index) => ({
    harnessId: product.harness_id,
    project: index === 0,
    global: true,
    discover: async (scope, env, command) => ({
      targets: [
        {
          path: path.join(
            scope === "project" ? env.cwd : env.home,
            ".demo",
            "mcp.json",
          ),
          format: "jsonc",
          collection: ["mcpServers"],
          kind: "map",
          entry: { ...command },
        },
      ],
      skipped: [],
    }),
  }));
});
afterEach(async () => {
  vi.restoreAllMocks();
  vi.mocked(fs.rename).mockReset();
  vi.mocked(fs.access).mockReset();
  await fs.rm(root, { recursive: true, force: true });
});

const context = () => ({
  environment,
  products,
  adapters,
  interactive: true,
  write: vi.fn(),
});
const prompts = (selection = ["demo-project"]): InitPromptPort => ({
  multiSelect: vi.fn(async () => selection),
  selectScope: vi.fn(async () => "project" as const),
  confirm: vi.fn(async () => true),
});

describe("init command", () => {
  test("resolves product aliases and deduplicates, rejecting invalid input", () => {
    expect(selectInitProducts(products, " DEMO-ALIAS ,demo-project")).toEqual([
      products[0],
    ]);
    expect(() => selectInitProducts(products, "demo-project,")).toThrow(
      expect.objectContaining({ code: "invalid_tools" }),
    );
  });

  test.each(["tui", "arguments"])(
    "%s refusal shows the plan and creates nothing",
    async (mode) => {
      const port = prompts();
      port.confirm = vi.fn(async () => false);
      const input = context();
      const result = await runInit(
        mode === "tui" ? {} : { tools: "demo-alias" },
        {
          ...input,
          prompts: port,
          confirmLine: async () => false,
        },
      );
      expect(result.status).toBe("cancelled");
      expect(input.write).toHaveBeenCalledWith(
        expect.stringContaining("MCP configuration plan"),
      );
      expect(await fs.readdir(environment.cwd)).toEqual([]);
    },
  );

  test("TUI explains partial project support before plan and final confirmation", async () => {
    const port = prompts(["demo-project", "demo-global"]);
    const input = context();
    const result = await runInit({}, { ...input, prompts: port });
    expect(port.selectScope).toHaveBeenCalledWith(
      expect.objectContaining({
        projectDisabled: false,
        projectDescription: expect.stringContaining("Demo Global"),
      }),
    );
    expect(port.confirm).toHaveBeenCalledWith(
      expect.objectContaining({ default: false }),
    );
    expect(input.write).toHaveBeenCalledWith(
      expect.stringContaining("will not be configured"),
    );
    expect(result.plan.entries.map((entry) => entry.action)).toEqual([
      "create",
      "skip",
    ]);
  });

  test("TUI disables project when every selected product is global-only", async () => {
    const port = prompts(["demo-global"]);
    port.selectScope = vi.fn(async () => "global" as const);
    const result = await runInit({}, { ...context(), prompts: port });
    expect(port.selectScope).toHaveBeenCalledWith(
      expect.objectContaining({ projectDisabled: true }),
    );
    expect(result.plan.scope).toBe("global");
  });

  test("explicit tools with yes bypass all prompts and always print the plan", async () => {
    const port = prompts();
    const input = context();
    const result = await runInit(
      { tools: "demo-project", yes: true, global: true },
      { ...input, prompts: port, interactive: false },
    );
    expect(result.status).toBe("configured");
    expect(result.plan.scope).toBe("global");
    expect(port.multiSelect).not.toHaveBeenCalled();
    expect(port.selectScope).not.toHaveBeenCalled();
    expect(port.confirm).not.toHaveBeenCalled();
    expect(input.write).toHaveBeenCalledWith(
      expect.stringContaining("MCP configuration plan"),
    );
  });

  test("cancellation while confirming prevents every write", async () => {
    const cancellation = new AbortController();
    const port = prompts();
    port.confirm = async () => {
      cancellation.abort();
      return true;
    };
    await expect(
      runInit({}, { ...context(), prompts: port, signal: cancellation.signal }),
    ).rejects.toMatchObject({ code: "cancelled" });
    expect(await fs.readdir(environment.cwd)).toEqual([]);
  });

  test.each([{ yes: true }, { json: true }, {}])(
    "noninteractive selection requires tools: %j",
    async (options) => {
      await expect(
        runInit(options, { ...context(), interactive: false }),
      ).rejects.toMatchObject({ code: "tools_required" });
      expect(await fs.readdir(environment.cwd)).toEqual([]);
    },
  );

  test("noninteractive tools without yes show the plan but do not write", async () => {
    const input = context();
    await expect(
      runInit({ tools: "demo-project" }, { ...input, interactive: false }),
    ).rejects.toMatchObject({ code: "confirmation_required" });
    expect(input.write).toHaveBeenCalledWith(
      expect.stringContaining("MCP configuration plan"),
    );
    expect(await fs.readdir(environment.cwd)).toEqual([]);
  });

  test("explicit runtime options are retained and cache path resolves from cwd", () => {
    expect(
      initLaunch(
        {
          dataUrl: "https://demo.invalid/data/v1/",
          offline: true,
          cacheDir: "cache with spaces",
          fileCache: false,
        },
        environment.cwd,
      ),
    ).toEqual({
      command: "npx",
      args: [
        "-y",
        "agent-harness-wiki",
        "--data-url",
        "https://demo.invalid/data/v1/",
        "--offline",
        "--cache-dir",
        path.join(environment.cwd, "cache with spaces"),
        "--no-file-cache",
        "mcp",
      ],
    });
  });
});

describe("configuration transaction", () => {
  const prepare = () =>
    prepareInitPlan({
      products,
      scope: "global",
      environment,
      launch,
      adapters,
    });

  test("shared target is merged, then reruns preserve bytes and make no backup", async () => {
    const first = await prepare();
    expect(first.files).toHaveLength(1);
    expect(first.plan.entries[0]?.products).toEqual([
      "demo-project",
      "demo-global",
    ]);
    expect(await fs.readdir(environment.home)).toEqual([]);
    await applyInitPlan(first);
    const file = first.plan.entries[0]!.path!;
    const content = await fs.readFile(file, "utf8");
    expect(JSON.parse(content).mcpServers[serverName]).toEqual(launch);
    const again = await prepare();
    expect(again.files).toHaveLength(0);
    expect((await applyInitPlan(again)).backups).toEqual([]);
    expect(await fs.readFile(file, "utf8")).toBe(content);
  });

  test("a corrupt second target prevents all writes", async () => {
    const corrupt = path.join(environment.home, "corrupt.json");
    await fs.writeFile(corrupt, "{broken");
    adapters[1]!.discover = async () => ({
      targets: [
        {
          path: corrupt,
          format: "jsonc",
          collection: ["mcpServers"],
          kind: "map",
          entry: launch,
        },
      ],
      skipped: [],
    });
    await expect(prepare()).rejects.toMatchObject({ code: "invalid_config" });
    expect(await fs.readdir(environment.home)).toEqual(["corrupt.json"]);
  });

  test("compatible required fields are combined for shared files", async () => {
    const discover = adapters[1]!.discover;
    adapters[1]!.discover = async (...args) => {
      const result = await discover(...args);
      result.targets[0]!.entry = { ...result.targets[0]!.entry, tools: ["*"] };
      return result;
    };
    const prepared = await prepare();
    expect(prepared.plan.entries).toHaveLength(1);
    await applyInitPlan(prepared);
    const config = JSON.parse(
      await fs.readFile(prepared.plan.entries[0]!.path!, "utf8"),
    );
    expect(config.mcpServers[serverName]).toEqual({ ...launch, tools: ["*"] });
  });

  test("an unwritable target prevents creation of every other target", async () => {
    const locked = path.join(environment.home, "locked.json");
    await fs.writeFile(locked, "{}");
    adapters[1]!.discover = async () => ({
      targets: [
        {
          path: locked,
          format: "jsonc",
          collection: ["mcpServers"],
          kind: "map",
          entry: launch,
        },
      ],
      skipped: [],
    });
    const { access } =
      await vi.importActual<typeof import("node:fs/promises")>(
        "node:fs/promises",
      );
    vi.mocked(fs.access).mockImplementation(async (file, mode) => {
      if (file === locked)
        throw Object.assign(new Error("Demo file is not writable"), {
          code: "EACCES",
        });
      return access(file, mode);
    });
    await expect(prepare()).rejects.toMatchObject({
      code: "configuration_preflight_failed",
    });
    expect(await fs.readdir(environment.home)).toEqual(["locked.json"]);
    expect(await fs.readFile(locked, "utf8")).toBe("{}");
  });

  test("changed baseline is refused without overwriting user changes", async () => {
    const prepared = await prepare();
    const file = prepared.plan.entries[0]!.path!;
    await fs.mkdir(path.dirname(file));
    await fs.writeFile(file, '{"user":"changed"}');
    await expect(applyInitPlan(prepared)).rejects.toMatchObject({
      code: "configuration_changed",
    });
    expect(JSON.parse(await fs.readFile(file, "utf8"))).toEqual({
      user: "changed",
    });
  });

  test("updates preserve existing content in a backup and preserve permissions", async () => {
    const file = path.join(environment.home, ".demo", "mcp.json");
    await fs.mkdir(path.dirname(file));
    const original = `// retained comment\n{"other":true,"mcpServers":{"${serverName}":{"command":"old","env":{"DEMO":"value"}}}}\n`;
    await fs.writeFile(file, original, { mode: 0o600 });
    const result = await applyInitPlan(await prepare());
    expect(result.backups).toHaveLength(1);
    expect(await fs.readFile(result.backups[0]!, "utf8")).toBe(original);
    expect(await fs.readFile(file, "utf8")).toContain("retained comment");
    if (process.platform !== "win32")
      expect((await fs.stat(file)).mode & 0o777).toBe(0o600);
  });

  test("a failed second replacement restores an earlier update", async () => {
    const first = path.join(environment.home, "one.json");
    const second = path.join(environment.home, "two.json");
    const originals = ['{"first":true}', '{"second":true}'];
    await fs.writeFile(first, originals[0]!);
    await fs.writeFile(second, originals[1]!);
    for (const [index, file] of [first, second].entries())
      adapters[index]!.discover = async () => ({
        targets: [
          {
            path: file,
            format: "jsonc",
            collection: ["mcpServers"],
            kind: "map",
            entry: launch,
          },
        ],
        skipped: [],
      });
    const prepared = await prepare();
    const { rename } =
      await vi.importActual<typeof import("node:fs/promises")>(
        "node:fs/promises",
      );
    vi.mocked(fs.rename).mockImplementation(async (from, to) => {
      if (to === second) throw new Error("Demo filesystem replacement failure");
      return rename(from, to);
    });
    await expect(applyInitPlan(prepared)).rejects.toMatchObject({
      code: "configuration_write_failed",
    });
    expect(await fs.readFile(first, "utf8")).toBe(originals[0]);
    expect(await fs.readFile(second, "utf8")).toBe(originals[1]);
  });

  test.runIf(process.platform !== "win32")(
    "global symlinks remain links while their target is configured",
    async () => {
      const target = path.join(environment.home, "real.json");
      await fs.writeFile(target, '{"user":true}');
      const file = path.join(environment.home, ".demo", "mcp.json");
      await fs.mkdir(path.dirname(file));
      await fs.symlink(target, file);
      await applyInitPlan(await prepare());
      expect((await fs.lstat(file)).isSymbolicLink()).toBe(true);
      expect(
        JSON.parse(await fs.readFile(target, "utf8")).mcpServers[serverName],
      ).toEqual(launch);
    },
  );

  test.runIf(process.platform !== "win32")(
    "project symlinks cannot redirect configuration outside cwd",
    async () => {
      const target = path.join(environment.home, "user.json");
      await fs.writeFile(target, "{}");
      await fs.symlink(environment.home, path.join(environment.cwd, ".demo"));
      await expect(
        prepareInitPlan({
          products: [products[0]!],
          scope: "project",
          environment,
          launch,
          adapters,
        }),
      ).rejects.toMatchObject({ code: "path_outside_project" });
      expect(await fs.readFile(target, "utf8")).toBe("{}");
    },
  );
});
