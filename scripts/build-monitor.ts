import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { Command } from "commander";
import { monitorDirectory } from "../src/sources/monitor-state.js";
import { sourceSchema } from "../src/domain/schema.js";
import YAML from "yaml";

const command = new Command("build-monitor")
  .description(
    "Build a local monitor runtime and copy its current instructions; does not change schedules or worktrees.",
  )
  .requiredOption("--out <directory>", "New runtime directory")
  .option("--dataset-root <path>", "Shared repository identity", ".");
await command.parseAsync();
const options = command.opts<{ out: string; datasetRoot: string }>();
const out = path.resolve(options.out);
await mkdir(out, { recursive: false });
const require = createRequire(import.meta.url);
// tsx already locks the bundler used for this local runtime; no extra installation.
const tsxRequire = createRequire(require.resolve("tsx/package.json"));
const { build } = tsxRequire("esbuild") as {
  build(options: {
    entryPoints: string[];
    outfile: string;
    bundle: boolean;
    platform: string;
    format: string;
    target: string;
    external: string[];
    alias: Record<string, string>;
    banner: { js: string };
  }): Promise<void>;
};
const requireBase = path.resolve("package.json");
const native = require.resolve("better-sqlite3");
await build({
  entryPoints: ["scripts/monitor-run.ts"],
  outfile: path.join(out, "lib/monitor/monitor.mjs"),
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node24",
  external: [native],
  alias: { "better-sqlite3": native },
  banner: {
    js: `import { createRequire as monitorCreateRequire } from 'node:module'; const require = monitorCreateRequire(${JSON.stringify(requireBase)});`,
  },
});
// Native SQLite resolves through the existing locked installation.
const bundled = await readFile(
  path.join(out, "lib/monitor/monitor.mjs"),
  "utf8",
);
const runtime = `// Bundle ${createHash("sha256").update(bundled).digest("hex")}\nimport './lib/monitor/monitor.mjs';\n`;
await writeFile(path.join(out, "monitor.mjs"), runtime, { flag: "wx" });
const observationUrls: Record<string, string> = {};
for (const name of await readdir("registry/sources")) {
  if (!name.endsWith(".yaml")) continue;
  const source = sourceSchema.parse(
    YAML.parse(await readFile(path.join("registry/sources", name), "utf8")),
  );
  if (source.kind === "official_documentation" && source.observation_url)
    observationUrls[source.source_id] = source.observation_url;
}
await writeFile(
  path.join(out, "observation-urls.json"),
  JSON.stringify(observationUrls),
);
for (const skill of ["harness-monitor", "harness-maintenance"])
  await cp(
    path.join(".agents/skills", skill),
    path.join(out, ".agents/skills", skill),
    { recursive: true, force: false, errorOnExist: true },
  );
await mkdir(path.join(out, "docs"));
for (const file of [
  "docs/topic-questions.md",
  "docs/data-model.md",
  "docs/automations.md",
  "docs/decisions/0012-daily-harness-monitor.md",
]) {
  await mkdir(path.dirname(path.join(out, file)), { recursive: true });
  await cp(file, path.join(out, file), {
    recursive: false,
    force: false,
    errorOnExist: true,
  });
}
process.stdout.write(
  `${JSON.stringify({ runtime: path.join(out, "monitor.mjs"), skill: path.join(out, ".agents/skills/harness-monitor/SKILL.md"), sha256: createHash("sha256").update(runtime).digest("hex"), nativeDependency: native, stateDirectory: await monitorDirectory(path.resolve(options.datasetRoot)) })}\n`,
);
