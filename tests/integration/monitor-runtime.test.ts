import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { expect, test } from "vitest";

const exec = promisify(execFile);

test("a deployed runtime observes a synthetic dataset with its copied question catalog", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-monitor-runtime-"));
  try {
    const dataset = path.join(root, "dataset");
    await mkdir(path.join(dataset, "registry/harnesses"), { recursive: true });
    await mkdir(path.join(dataset, "registry/sources"), { recursive: true });
    await writeFile(
      path.join(dataset, "registry/harnesses/demo.yaml"),
      "schema_version: 1\nrecord_kind: production\nharness_id: demo-runtime\nname: Demo Runtime (fictional)\naliases: []\nsurfaces: [cli]\nsource_refs: [source-demo-doc]\n",
    );
    await writeFile(
      path.join(dataset, "registry/sources/doc.yaml"),
      "schema_version: 1\nrecord_kind: production\nsource_id: source-demo-doc\nharness_id: demo-runtime\nkind: official_documentation\nurl: https://example.invalid/demo.md\n",
    );
    const env = {
      ...process.env,
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_CONFIG_NOSYSTEM: "1",
    };
    await exec("git", ["-C", dataset, "init", "--quiet"], { env });
    const out = path.join(root, "runtime");
    await exec(process.execPath, [
      "--import",
      "tsx",
      "scripts/build-monitor.ts",
      "--out",
      out,
      "--dataset-root",
      dataset,
    ]);
    const mock = path.join(root, "fetch.mjs");
    await writeFile(
      mock,
      "globalThis.fetch = async (url) => { if (String(url) !== 'https://example.invalid/demo.md') throw new Error('Unexpected request'); return new Response('# Fictional runtime documentation'); };\n",
    );
    let stdout: string;
    try {
      stdout = (
        await exec(
          process.execPath,
          [
            "--import",
            mock,
            path.join(out, "monitor.mjs"),
            "--root",
            dataset,
            "precheck",
          ],
          { env },
        )
      ).stdout;
    } catch (error) {
      const failed = error as { code?: number; stdout?: string };
      expect([1, 2]).toContain(failed.code);
      stdout = failed.stdout ?? "";
    }
    const result = JSON.parse(stdout) as {
      queued: number;
      used: number;
      blocked_sources: number;
      launch: boolean;
      precheckPath: string;
    };
    expect(result).toMatchObject({
      queued: 1,
      used: 0,
      blocked_sources: 0,
      launch: false,
    });
    expect(
      JSON.parse(await readFile(result.precheckPath, "utf8")).checks[0]
        .harness_id,
    ).toBe("demo-runtime");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
