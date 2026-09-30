import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import {
  cp,
  lstat,
  mkdir,
  readFile,
  realpath,
  rename,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import YAML from "yaml";

const exec = promisify(execFile);
const packageSet = "research/package-set";
const registry = "https://registry.npmjs.org";

export const managedPackages = {
  codex: {
    name: "@openai/codex",
    entry: "bin/codex.js",
    runtime: "node",
    flag: "--version",
    identity: /codex/i,
    platform: (v: string) => ({
      alias: "@openai/codex-linux-x64",
      name: "@openai/codex",
      version: `${v}-linux-x64`,
      entry: "vendor/x86_64-unknown-linux-musl/bin/codex",
    }),
  },
  "claude-code": {
    name: "@anthropic-ai/claude-code",
    entry: "",
    runtime: "native",
    flag: "--version",
    identity: /claude/i,
    platform: (v: string) => ({
      alias: "@anthropic-ai/claude-code-linux-x64",
      name: "@anthropic-ai/claude-code-linux-x64",
      version: v,
      entry: "claude",
    }),
  },
  opencode: {
    name: "opencode-ai",
    entry: "",
    runtime: "native",
    flag: "--version",
    identity: /opencode/i,
    platform: (v: string) => ({
      alias: "opencode-linux-x64",
      name: "opencode-linux-x64",
      version: v,
      entry: "bin/opencode",
    }),
  },
  pi: {
    name: "@mariozechner/pi-coding-agent",
    entry: "dist/cli.js",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  omp: {
    name: "@oh-my-pi/pi-coding-agent",
    entry: "dist/cli.js",
    runtime: "bun",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  "gemini-cli": {
    name: "@google/gemini-cli",
    entry: "bundle/gemini.js",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  "qwen-code": {
    name: "@qwen-code/qwen-code",
    entry: "cli-entry.js",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  continue: {
    name: "@continuedev/cli",
    entry: "dist/cn.js",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  auggie: {
    name: "@augmentcode/auggie",
    entry: "augment.mjs",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  "kimi-code": {
    name: "@moonshot-ai/kimi-code",
    entry: "dist/main.mjs",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  "minimax-code": {
    name: "@minimax-ai/code",
    entry: "cli.js",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  codebuddy: {
    name: "@tencent-ai/codebuddy-code",
    entry: "bin/codebuddy",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  junie: {
    name: "@jetbrains/junie",
    entry: "bin/index.js",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  qoder: {
    name: "@qoder-ai/qodercli",
    entry: "bundle/qodercli.js",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  "command-code": {
    name: "command-code",
    entry: "dist/index.mjs",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  costrict: {
    name: "@costrict/csc",
    entry: "dist/cli-node.js",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  autohand: {
    name: "autohand-cli",
    entry: "dist/index.js",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  codebuff: {
    name: "codebuff",
    entry: "index.js",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  forgecode: {
    name: "forgecode",
    entry: "forge.js",
    runtime: "node",
    flag: "--version",
    identity: /forge/i,
    platform: undefined,
  },
  crush: {
    name: "@charmland/crush",
    entry: "run-crush.js",
    runtime: "node",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: undefined,
  },
  cline: {
    name: "cline",
    entry: "",
    runtime: "native",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: (v: string) => ({
      alias: "@cline/cli-linux-x64",
      name: "@cline/cli-linux-x64",
      version: v,
      entry: "bin/cline",
    }),
  },
  goose: {
    name: "@aaif/goose-acp",
    entry: "",
    runtime: "native",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: (v: string) => ({
      alias: "@aaif/goose-binary-linux-x64",
      name: "@aaif/goose-binary-linux-x64",
      version: v,
      entry: "bin/goose",
    }),
  },
  "github-copilot": {
    name: "@github/copilot",
    entry: "",
    runtime: "native",
    flag: "--version",
    identity: /copilot/i,
    platform: (v: string) => ({
      alias: "@github/copilot-linux-x64",
      name: "@github/copilot-linux-x64",
      version: v,
      entry: "copilot",
    }),
  },
  amp: {
    name: "@ampcode/cli",
    entry: "",
    runtime: "native",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: (v: string) => ({
      alias: "@ampcode/cli-linux-x64",
      name: "@ampcode/cli-linux-x64",
      version: v,
      entry: "amp",
    }),
  },
  "factory-droid": {
    name: "droid",
    entry: "",
    runtime: "native",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: (v: string) => ({
      alias: "@factory/cli-linux-x64",
      name: "@factory/cli-linux-x64",
      version: v,
      entry: "bin/droid",
    }),
  },
  grok: {
    name: "@xai-official/grok",
    entry: "bin/grok",
    runtime: "node",
    flag: "--version",
    identity: /grok/i,
    platform: undefined,
  },
  "kilo-code": {
    name: "@kilocode/cli",
    entry: "",
    runtime: "native",
    flag: "--version",
    identity: /\d+\.\d+\.\d+/,
    platform: (v: string) => ({
      alias: "@kilocode/cli-linux-x64",
      name: "@kilocode/cli-linux-x64",
      version: v,
      entry: "bin/kilo",
    }),
  },
  devin: {
    // Cognition publishes the CLI as per-platform binary packages with no root
    // wrapper package, so the linux/x64 package is the executable artifact.
    name: "@cognition-ai/cli-linux-x64",
    entry: "bin/devin",
    runtime: "native",
    flag: "--version",
    identity: /devin/i,
    platform: undefined,
  },
} as const;

export type ManagedId = keyof typeof managedPackages;
type Lock = {
  packages?: Record<string, { resolution?: { integrity?: string } }>;
  importers?: Record<
    string,
    { dependencies?: Record<string, { specifier?: string }> }
  >;
};
type Metadata = { name: string; version: string; dist: { integrity: string } };
type Result = {
  id: ManagedId;
  package: string;
  selected: string | null;
  observed: string;
  integrity: string;
  channel: "latest" | "selected";
  observed_at: string;
  status:
    | "no_change"
    | "candidate"
    | "anomaly"
    | "blocked"
    | "promoted"
    | "startup_success";
  reason?: string;
  entry?: string;
  runtime?: string;
  command?: string[];
  sandbox?: string[];
  exit_code?: number;
  output?: string;
  candidate?: string;
};

function compareVersions(a: string, b: string): number | undefined {
  const pattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
  const left = a.match(pattern)?.slice(1).map(Number);
  const right = b.match(pattern)?.slice(1).map(Number);
  if (
    !left ||
    !right ||
    [...left, ...right].some((v) => !Number.isSafeInteger(v))
  )
    return undefined;
  for (let i = 0; i < 3; i += 1)
    if (left[i] !== right[i]) return Math.sign(left[i]! - right[i]!);
  return 0;
}

function integrity(
  lock: Lock,
  name: string,
  version: string,
): string | undefined {
  return lock.packages?.[`${name}@${version}`]?.resolution?.integrity;
}

async function metadata(
  name: string,
  version = "latest",
  fetchImpl: typeof fetch = fetch,
): Promise<Metadata> {
  const response = await fetchImpl(
    `${registry}/${encodeURIComponent(name)}/${encodeURIComponent(version)}`,
    { signal: AbortSignal.timeout(30_000), redirect: "error" },
  );
  if (!response.ok) throw new Error(`npm metadata returned ${response.status}`);
  if (Number(response.headers.get("content-length")) > 1024 * 1024)
    throw new Error("npm metadata exceeds size limit");
  const reader = response.body?.getReader();
  if (!reader) throw new Error("npm metadata has no body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 1024 * 1024) {
      await reader.cancel();
      throw new Error("npm metadata exceeds size limit");
    }
    chunks.push(value);
  }
  const data: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  if (!data || typeof data !== "object")
    throw new Error("Invalid npm metadata");
  const record = data as Record<string, unknown>;
  const dist = record.dist as Record<string, unknown> | undefined;
  if (
    record.name !== name ||
    (version !== "latest" && record.version !== version) ||
    typeof record.version !== "string" ||
    typeof dist?.integrity !== "string" ||
    !/^sha512-[A-Za-z0-9+/]+={0,2}$/.test(dist.integrity)
  )
    throw new Error("Invalid npm package identity or integrity");
  return { name, version: record.version, dist: { integrity: dist.integrity } };
}

async function readSelection(
  root: string,
): Promise<{ manifest: { dependencies: Record<string, string> }; lock: Lock }> {
  const dir = path.join(root, packageSet);
  return {
    manifest: JSON.parse(
      await readFile(path.join(dir, "package.json"), "utf8"),
    ) as { dependencies: Record<string, string> },
    lock: YAML.parse(
      await readFile(path.join(dir, "pnpm-lock.yaml"), "utf8"),
    ) as Lock,
  };
}

async function audit(root: string, result: Result): Promise<Result> {
  const dir = path.join(root, "var/managed-packages/audits");
  await mkdir(dir, { recursive: true });
  await writeFile(
    path.join(
      dir,
      `${result.observed_at.replaceAll(":", "-")}-${result.id}-${randomUUID()}.json`,
    ),
    `${JSON.stringify(result, null, 2)}\n`,
    { flag: "wx" },
  );
  return result;
}

export async function observeManaged(
  root: string,
  id: ManagedId,
  fetchImpl: typeof fetch = fetch,
): Promise<Result> {
  const item = managedPackages[id];
  const { manifest, lock } = await readSelection(root);
  const selected = manifest.dependencies[item.name] ?? null;
  const observed_at = new Date().toISOString();
  try {
    const latest = await metadata(item.name, "latest", fetchImpl);
    const order = selected ? compareVersions(latest.version, selected) : 1;
    const previous = selected
      ? integrity(lock, item.name, selected)
      : undefined;
    const reason =
      order === undefined
        ? "Incomparable version"
        : order < 0
          ? "Latest tag rollback"
          : order === 0 && previous !== latest.dist.integrity
            ? "Same-version integrity drift"
            : undefined;
    return audit(root, {
      id,
      package: item.name,
      selected,
      observed: latest.version,
      integrity: latest.dist.integrity,
      channel: "latest",
      observed_at,
      status: reason ? "anomaly" : order === 0 ? "no_change" : "candidate",
      ...(reason ? { reason } : {}),
    });
  } catch (error) {
    return audit(root, {
      id,
      package: item.name,
      selected,
      observed: "",
      integrity: "",
      channel: "latest",
      observed_at,
      status: "blocked",
      reason: String(error),
    });
  }
}

async function installedEntry(
  dir: string,
  id: ManagedId,
  version: string,
  lock: Lock,
  fetchImpl: typeof fetch,
): Promise<{ entry: string; runtime: string }> {
  const item = managedPackages[id];
  const packageRoot = await realpath(path.join(dir, "node_modules", item.name));
  if (
    !packageRoot.startsWith(
      `${path.join(dir, "node_modules/.pnpm")}${path.sep}`,
    )
  )
    throw new Error("Package link escapes candidate");
  const pkg = JSON.parse(
    await readFile(path.join(packageRoot, "package.json"), "utf8"),
  ) as { name?: string; version?: string };
  if (pkg.name !== item.name || pkg.version !== version)
    throw new Error("Installed package identity differs");
  let entryRoot = packageRoot;
  let relativeEntry: string = item.entry;
  if (item.platform) {
    const dependency = item.platform(version);
    const modules = path.resolve(
      packageRoot,
      ...item.name.split("/").map(() => ".."),
    );
    const depRoot = await realpath(path.join(modules, dependency.alias));
    if (
      !depRoot.startsWith(`${path.join(dir, "node_modules/.pnpm")}${path.sep}`)
    )
      throw new Error("Platform dependency escapes candidate");
    const dep = JSON.parse(
      await readFile(path.join(depRoot, "package.json"), "utf8"),
    ) as { name?: string; version?: string };
    if (dep.name !== dependency.name || dep.version !== dependency.version)
      throw new Error("Platform dependency missing or mismatched");
    const official = await metadata(
      dependency.name,
      dependency.version,
      fetchImpl,
    );
    if (
      integrity(lock, dependency.name, dependency.version) !==
      official.dist.integrity
    )
      throw new Error("Platform dependency integrity differs from registry");
    if (!item.entry) {
      entryRoot = depRoot;
      relativeEntry = dependency.entry;
    } else if (!(await stat(path.join(depRoot, dependency.entry))).isFile())
      throw new Error("Platform executable missing");
  }
  if (id === "omp") {
    const wrapper = await realpath(path.join(packageRoot, "..", "pi-natives"));
    const platform = await realpath(
      path.join(wrapper, "..", "pi-natives-linux-x64"),
    );
    for (const [root, name] of [
      [wrapper, "@oh-my-pi/pi-natives"],
      [platform, "@oh-my-pi/pi-natives-linux-x64"],
    ] as const) {
      if (
        !root.startsWith(`${path.join(dir, "node_modules/.pnpm")}${path.sep}`)
      )
        throw new Error("OMP native dependency escapes candidate");
      const pkg = JSON.parse(
        await readFile(path.join(root, "package.json"), "utf8"),
      ) as { name?: string; version?: string };
      if (pkg.name !== name || pkg.version !== version)
        throw new Error("OMP native dependency missing or mismatched");
      if (
        integrity(lock, name, version) !==
        (await metadata(name, version, fetchImpl)).dist.integrity
      )
        throw new Error(
          "OMP native dependency integrity differs from registry",
        );
    }
    if (
      !(
        await stat(path.join(platform, "pi_natives.linux-x64-baseline.node"))
      ).isFile()
    )
      throw new Error("OMP native binding missing");
  }
  const entry = await realpath(path.join(entryRoot, relativeEntry));
  if (
    !entry.startsWith(`${path.join(dir, "node_modules/.pnpm")}${path.sep}`) ||
    !(await stat(entry)).isFile()
  )
    throw new Error("Direct executable entry missing or unsafe");
  return { entry: path.relative(dir, entry), runtime: item.runtime };
}

export async function sandboxStartup(
  dir: string,
  id: ManagedId,
  version: string,
  entry: string,
  runtime: string,
): Promise<
  Pick<
    Result,
    "entry" | "runtime" | "command" | "sandbox" | "exit_code" | "output"
  > & { ok: boolean; reason?: string }
> {
  if (process.platform !== "linux" || process.arch !== "x64")
    return { entry, runtime, ok: false, reason: "Linux x64 sandbox required" };
  const executable =
    runtime === "native" ? `/package/${entry}` : `/runtime/${runtime}`;
  const command =
    runtime === "native"
      ? [executable, managedPackages[id].flag]
      : [executable, `/package/${entry}`, managedPackages[id].flag];
  const runtimePath =
    runtime === "bun"
      ? (process.env.PATH?.split(path.delimiter).map((part) =>
          path.join(part, "bun"),
        ) ?? [])
      : runtime === "node"
        ? [process.execPath]
        : [];
  let executablePath: string | undefined;
  for (const file of runtimePath) {
    try {
      executablePath = await realpath(file);
      break;
    } catch {
      /* Continue searching PATH. */
    }
  }
  if (!executablePath && runtime !== "native")
    return {
      entry,
      runtime,
      command,
      ok: false,
      reason: `${runtime} runtime unavailable`,
    };
  const sandbox = [
    "--unshare-all",
    "--uid",
    "65534",
    "--gid",
    "65534",
    "--die-with-parent",
    "--new-session",
    "--clearenv",
    "--setenv",
    "HOME",
    "/home/worker",
    "--setenv",
    "XDG_CONFIG_HOME",
    "/home/worker/.config",
    "--setenv",
    "PATH",
    "/usr/bin:/bin",
    "--setenv",
    "TMPDIR",
    "/tmp",
    "--ro-bind",
    "/usr",
    "/usr",
    "--ro-bind-try",
    "/lib",
    "/lib",
    "--ro-bind-try",
    "/lib64",
    "/lib64",
    "--symlink",
    "usr/bin",
    "/bin",
    "--proc",
    "/proc",
    "--dev",
    "/dev",
    "--perms",
    "1777",
    "--tmpfs",
    "/tmp",
    "--tmpfs",
    "/home",
    "--perms",
    "0777",
    "--dir",
    "/home/worker",
    "--perms",
    "0777",
    "--tmpfs",
    "/workspace",
    "--dir",
    "/runtime",
    ...(executablePath ? ["--ro-bind", executablePath, executable] : []),
    "--ro-bind",
    dir,
    "/package",
    "--chdir",
    "/workspace",
    "--",
    "/usr/bin/prlimit",
    "--nproc=64",
    "--nofile=128",
    ...command,
  ];
  try {
    const { stdout, stderr } = await exec("bwrap", sandbox, {
      timeout: 20_000,
      maxBuffer: 64 * 1024,
      env: { PATH: "/usr/bin:/bin" },
    });
    const output = `${stdout}\n${stderr}`.slice(0, 4096);
    const ok =
      output.includes(version) &&
      (managedPackages[id].identity.test(output) || id === "opencode");
    return {
      entry,
      runtime,
      command,
      sandbox,
      exit_code: 0,
      output,
      ok,
      ...(ok ? {} : { reason: "No recognizable product identity" }),
    };
  } catch (error) {
    const failure = error as Error & {
      stdout?: string;
      stderr?: string;
      code?: number | string;
    };
    return {
      entry,
      runtime,
      command,
      sandbox,
      exit_code: typeof failure.code === "number" ? failure.code : -1,
      output: `${failure.stdout ?? ""}\n${failure.stderr ?? ""}`.slice(0, 4096),
      ok: false,
      reason:
        failure.code === "ENOENT"
          ? "bwrap unavailable"
          : `Sandbox command failed: ${String(failure.code ?? "unknown")}`,
    };
  }
}

export async function checkCurrentManaged(
  root: string,
  id: ManagedId,
  fetchImpl: typeof fetch = fetch,
): Promise<Result> {
  const { manifest, lock } = await readSelection(root);
  const name = managedPackages[id].name;
  const version = manifest.dependencies[name] ?? null;
  const result: Result = {
    id,
    package: name,
    selected: version,
    observed: version ?? "",
    integrity: version ? (integrity(lock, name, version) ?? "") : "",
    channel: "selected",
    observed_at: new Date().toISOString(),
    status: "blocked",
  };
  try {
    if (!version) throw new Error(`Package not selected: ${name}`);
    if (!result.integrity)
      throw new Error("Selected package absent from lockfile");
    const { entry, runtime } = await installedEntry(
      path.join(root, packageSet),
      id,
      version,
      lock,
      fetchImpl,
    );
    const startup = await sandboxStartup(
      path.join(root, packageSet),
      id,
      version,
      entry,
      runtime,
    );
    Object.assign(result, startup, {
      status: startup.ok ? "startup_success" : "blocked",
    });
    if (!startup.ok) result.reason = startup.reason ?? "Startup failed";
  } catch (error) {
    result.reason = String(error);
  }
  return audit(root, result);
}

export async function updateManaged(
  root: string,
  id: ManagedId,
  fetchImpl: typeof fetch = fetch,
  resumeId?: string,
): Promise<Result> {
  const observed = await observeManaged(root, id, fetchImpl);
  if (observed.status !== "candidate") return observed;
  const rootDir = path.join(root, packageSet);
  if (resumeId && !/^[a-f0-9-]{36}$/.test(resumeId))
    throw new Error("Invalid candidate ID");
  const candidate = path.join(
    root,
    "var/managed-packages/candidates",
    resumeId ?? randomUUID(),
  );
  if (resumeId) {
    if (
      !(await lstat(candidate)).isDirectory() ||
      (await realpath(candidate)) !== candidate
    )
      throw new Error("Unsafe candidate directory");
  } else await mkdir(candidate, { recursive: true });
  const result: Result = {
    ...observed,
    candidate: path.relative(root, candidate),
  };
  try {
    if (!resumeId)
      for (const file of [
        "package.json",
        "pnpm-lock.yaml",
        "pnpm-workspace.yaml",
      ])
        await cp(path.join(rootDir, file), path.join(candidate, file));
    const manifest = JSON.parse(
      await readFile(path.join(candidate, "package.json"), "utf8"),
    ) as { dependencies: Record<string, string> };
    if (resumeId && manifest.dependencies[result.package] !== result.observed)
      throw new Error("Candidate version differs from official latest");
    if (!resumeId) {
      manifest.dependencies[result.package] = result.observed;
      await writeFile(
        path.join(candidate, "package.json"),
        `${JSON.stringify(manifest, null, 2)}\n`,
      );
      const store = path.join(root, ".pnpm-store");
      const options = {
        timeout: 600_000,
        maxBuffer: 1024 * 1024,
        env: {
          PATH: process.env.PATH ?? "/usr/bin:/bin",
          HOME: candidate,
          CI: "true",
          npm_config_userconfig: "/dev/null",
        },
      };
      const args = [
        "install",
        "--dir",
        candidate,
        "--ignore-scripts",
        "--store-dir",
        store,
        "--config.userconfig=/dev/null",
        "--reporter=append-only",
        "--fetch-retries=2",
        "--fetch-timeout=120000",
      ];
      await exec(
        "pnpm",
        [...args, "--lockfile-only", "--no-frozen-lockfile"],
        options,
      );
      await exec("pnpm", [...args, "--frozen-lockfile"], options);
    }
    const lock = YAML.parse(
      await readFile(path.join(candidate, "pnpm-lock.yaml"), "utf8"),
    ) as Lock;
    if (
      integrity(lock, result.package, result.observed) !== result.integrity ||
      lock.importers?.["."]?.dependencies?.[result.package]?.specifier !==
        result.observed
    )
      throw new Error("Candidate main package integrity differs from registry");
    for (const current of Object.keys(managedPackages) as ManagedId[]) {
      const currentName = managedPackages[current].name;
      const currentVersion = manifest.dependencies[currentName];
      // A registered CLI can remain unselected after a failed first admission.
      if (!currentVersion) {
        if (current === id)
          throw new Error(`Package not selected: ${currentName}`);
        continue;
      }
      const { entry, runtime } = await installedEntry(
        candidate,
        current,
        currentVersion,
        lock,
        fetchImpl,
      );
      const startup = await sandboxStartup(
        candidate,
        current,
        currentVersion,
        entry,
        runtime,
      );
      if (current === id) Object.assign(result, startup);
      if (!startup.ok)
        throw new Error(`${current}: ${startup.reason ?? "Startup failed"}`);
    }
    await audit(root, { ...result, status: "startup_success" });
    await promoteCandidate(rootDir, candidate);
    result.status = "promoted";
    try {
      return await audit(root, result);
    } catch {
      return result;
    }
  } catch (error) {
    result.status = "blocked";
    const failure = error as Error & {
      stdout?: string;
      stderr?: string;
      code?: string | number;
    };
    result.reason = `${failure.message.split("\n")[0]} (${String(failure.code ?? "unknown")}): ${(failure.stderr || failure.stdout || "").slice(-1500)}`;
    return audit(root, result);
  }
}

export async function promoteCandidate(
  selected: string,
  candidate: string,
): Promise<void> {
  for (const file of ["package.json", "pnpm-lock.yaml", "node_modules"]) {
    const item = await lstat(path.join(candidate, file));
    if (
      item.isSymbolicLink() ||
      (file === "node_modules" ? !item.isDirectory() : !item.isFile())
    )
      throw new Error(`Candidate missing or unsafe ${file}`);
    await lstat(path.join(selected, file));
  }
  const backup = path.join(path.dirname(candidate), `previous-${randomUUID()}`);
  await mkdir(backup, { recursive: true });
  const files = ["package.json", "pnpm-lock.yaml", "node_modules"];
  const moved: string[] = [];
  try {
    for (const file of files) {
      await rename(path.join(selected, file), path.join(backup, file));
      moved.push(file);
    }
    for (const file of files)
      await rename(path.join(candidate, file), path.join(selected, file));
  } catch (error) {
    for (const file of files) {
      try {
        await rename(path.join(selected, file), path.join(candidate, file));
      } catch {
        /* Not yet promoted. */
      }
    }
    for (const file of moved)
      await rename(path.join(backup, file), path.join(selected, file));
    throw error;
  }
}
