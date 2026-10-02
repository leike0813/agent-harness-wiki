import {
  cp,
  lstat,
  mkdir,
  mkdtemp,
  open,
  readdir,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as z from "zod";
import {
  onlinePointerSchema,
  parseOnlineResource,
  resourcePathSchema,
  type OnlineResource,
} from "../domain/online.js";
import { canonical, sha256 } from "./projection.js";
import {
  prepareOnlineRelease,
  verifyOnlineResources,
} from "./online-release.js";
import { buildSitePages } from "./site.js";

export const deploymentByteLimit = 512 * 1024 * 1024;
const filePath = z
  .string()
  .min(1)
  .refine(
    (value) =>
      !value.startsWith("/") &&
      !value.includes("\\") &&
      value.split("/").every((part) => part && part !== "." && part !== ".."),
  );
const integritySchema = z.strictObject({
  schema_version: z.literal(1),
  release_id: z.string(),
  input_sha256: z.string().regex(/^[a-f0-9]{64}$/),
  base: z.string(),
  knowledge_published_at: z.iso.datetime(),
  files: z.record(filePath, z.string().regex(/^[a-f0-9]{64}$/)),
});
const project = fileURLToPath(new URL("../../", import.meta.url));
export type OnlineSiteOptions = {
  datasetRoot: string;
  profile: "fixture" | "production";
  commit: string;
  publishedAt: string;
  base: string;
  outDir: string;
  retain?: string[];
};

async function inventory(root: string, relative = ""): Promise<string[]> {
  const result: string[] = [];
  for (const entry of await readdir(path.join(root, relative), {
    withFileTypes: true,
  })) {
    const file = path.posix.join(relative, entry.name);
    filePath.parse(file);
    if (entry.isSymbolicLink())
      throw new Error(`Deployment symlink rejected: ${file}`);
    if (entry.isDirectory()) {
      for (const child of await inventory(root, file)) result.push(child);
    } else if (entry.isFile()) result.push(file);
    else throw new Error(`Deployment special file rejected: ${file}`);
  }
  return result.sort();
}

export async function checkDeploymentCapacity(
  root: string,
): Promise<{ bytes: number; directories: Record<string, number> }> {
  let bytes = 0;
  const directories: Record<string, number> = {};
  for (const file of await inventory(root)) {
    const size = (await stat(path.join(root, file))).size;
    bytes += size;
    const group = file.split("/").slice(0, 4).join("/");
    directories[group] = (directories[group] ?? 0) + size;
  }
  if (bytes > deploymentByteLimit) {
    const major = Object.entries(directories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    throw new Error(
      `Deployment capacity exceeded: ${bytes} > ${deploymentByteLimit}; ${JSON.stringify(major)}`,
    );
  }
  return { bytes, directories };
}

async function readResources(
  root: string,
  releaseId: string,
): Promise<Map<string, OnlineResource>> {
  const directory = path.join(root, "data/v1/releases", releaseId);
  const resources = new Map<string, OnlineResource>();
  for (const relative of await inventory(directory)) {
    resourcePathSchema.parse(relative);
    resources.set(
      relative,
      parseOnlineResource(
        JSON.parse(await readFile(path.join(directory, relative), "utf8")),
        releaseId,
      ),
    );
  }
  return resources;
}

async function verifyPageLinks(
  root: string,
  files: string[],
  releaseId: string,
  base: string,
): Promise<void> {
  const available = new Set(files);
  for (const file of files.filter((name) => name.endsWith(".html"))) {
    const html = await readFile(path.join(root, file), "utf8");
    if (file !== "404.html" && !html.includes(releaseId))
      throw new Error(`Page release identity missing: ${file}`);
    for (const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
      const target = match[1]!.replaceAll("&amp;", "&").split("?")[0]!;
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target)) continue;
      if (target.startsWith("/") && !target.startsWith(base))
        throw new Error(`Page link escapes base: ${file}`);
      let resolved = target.startsWith("/")
        ? target.slice(base.length)
        : path.posix.normalize(
            path.posix.join(path.posix.dirname(file), target),
          );
      try {
        resolved = decodeURIComponent(resolved);
      } catch {
        throw new Error(`Invalid page URL: ${file}`);
      }
      if (!resolved || resolved.endsWith("/")) resolved += "index.html";
      if (!available.has(resolved) && !available.has(`${resolved}.html`))
        throw new Error(`Page link resource missing: ${file} -> ${resolved}`);
    }
  }
}

export async function verifyOnlineDeployment(
  root: string,
): Promise<{ releaseId: string; bytes: number; files: number }> {
  const directory = await lstat(root);
  if (directory.isSymbolicLink() || !directory.isDirectory())
    throw new Error("Deployment root must be a directory without symlinks.");
  const record = integritySchema.parse(
    JSON.parse(await readFile(path.join(root, "integrity.json"), "utf8")),
  );
  if (!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(record.base))
    throw new Error("Invalid site base path.");
  const files = await inventory(root);
  const expected = Object.keys(record.files).sort();
  if (
    files.filter((file) => file !== "integrity.json").join("\n") !==
    expected.join("\n")
  )
    throw new Error("Deployment file inventory differs.");
  const capacity = await checkDeploymentCapacity(root);
  for (const file of expected)
    if (sha256(await readFile(path.join(root, file))) !== record.files[file])
      throw new Error(`Deployment hash mismatch: ${file}`);
  const pointer = onlinePointerSchema.parse(
    JSON.parse(await readFile(path.join(root, "data/v1/current.json"), "utf8")),
  );
  if (
    pointer.state !== "active" ||
    pointer.release_id !== record.release_id ||
    pointer.manifest !== `releases/${record.release_id}/manifest.json`
  )
    throw new Error("Deployment current identity differs.");
  const releases = await readdir(path.join(root, "data/v1/releases"));
  let manifest: OnlineResource | undefined;
  for (const releaseId of releases) {
    const resources = await readResources(root, releaseId);
    verifyOnlineResources(resources, releaseId);
    if (releaseId === record.release_id)
      manifest = resources.get("manifest.json");
  }
  if (
    manifest?.resource_kind !== "manifest" ||
    manifest.knowledge_published_at !== record.knowledge_published_at
  )
    throw new Error("Deployment publication time differs.");
  await verifyPageLinks(root, files, record.release_id, record.base);
  return {
    releaseId: record.release_id,
    bytes: capacity.bytes,
    files: files.length,
  };
}

async function writeResources(
  root: string,
  resources: Map<string, OnlineResource>,
  releaseId: string,
): Promise<void> {
  for (const [relative, resource] of resources) {
    resourcePathSchema.parse(relative);
    const file = path.join(root, "data/v1/releases", releaseId, relative);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, `${JSON.stringify(resource)}\n`);
  }
  await writeFile(
    path.join(root, "data/v1/current.json"),
    `${JSON.stringify(onlinePointerSchema.parse({ protocol_version: 1, state: "active", release_id: releaseId, manifest: `releases/${releaseId}/manifest.json` }))}\n`,
  );
}

async function retainResources(root: string, inputs: string[]): Promise<void> {
  for (const input of inputs) {
    await verifyOnlineDeployment(input);
    const dataRoot = path.join(input, "data");
    for (const file of (await inventory(dataRoot)).filter(
      (file) => file !== "v1/current.json",
    )) {
      const from = path.join(dataRoot, file),
        to = path.join(root, "data", file);
      try {
        if (!Buffer.from(await readFile(from)).equals(await readFile(to)))
          throw new Error(`Retained immutable resource conflicts: ${file}`);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
        await mkdir(path.dirname(to), { recursive: true });
        await cp(from, to, { force: false, errorOnExist: true });
      }
    }
  }
}

export async function buildOnlineSite(
  options: OnlineSiteOptions,
): Promise<{ releaseId: string; bytes: number; files: number }> {
  const output = path.resolve(options.outDir);
  const parent = path.dirname(output);
  await mkdir(parent, { recursive: true });
  const lock = await open(`${output}.lock`, "wx");
  let stage: string | undefined;
  try {
    const extraInputs: Record<string, string> = {};
    for (const file of [
      "package.json",
      "pnpm-lock.yaml",
      "site/package.json",
      "site/reading-results.md",
      "src/compiler/online-release.ts",
      "src/compiler/online-site.ts",
      "src/compiler/site.ts",
      "src/compiler/chapter-release.ts",
      "src/query/lexical.ts",
      "src/query/search-index.ts",
      "src/domain/online.ts",
    ])
      extraInputs[file] = sha256(await readFile(path.join(project, file)));
    const retainedInputs: string[] = [];
    for (const directory of options.retain ?? []) {
      await verifyOnlineDeployment(directory);
      retainedInputs.push(
        sha256(await readFile(path.join(directory, "integrity.json"))),
      );
    }
    extraInputs.retained = canonical([...new Set(retainedInputs)].sort());
    const prepared = await prepareOnlineRelease({ ...options, extraInputs });
    let exists = false;
    try {
      await lstat(output);
      exists = true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    if (exists) {
      const existing = integritySchema.parse(
        JSON.parse(await readFile(path.join(output, "integrity.json"), "utf8")),
      );
      if (
        existing.release_id !== prepared.releaseId ||
        existing.input_sha256 !== prepared.inputDigest ||
        existing.base !== options.base ||
        existing.knowledge_published_at !== options.publishedAt
      )
        throw new Error("Existing online output cannot be overwritten.");
      return await verifyOnlineDeployment(output);
    }
    stage = await mkdtemp(path.join(parent, ".online-staging-"));
    await buildSitePages({
      outDir: stage,
      base: options.base,
      knowledge: prepared.knowledge,
      online: true,
    });
    await writeResources(stage, prepared.resources, prepared.releaseId);
    const written = await readResources(stage, prepared.releaseId);
    verifyOnlineResources(written, prepared.releaseId, prepared.knowledge);
    if (
      written.size !== prepared.resources.size ||
      [...prepared.resources].some(
        ([file, resource]) =>
          canonical(written.get(file)) !== canonical(resource),
      )
    )
      throw new Error(
        "Written resources differ from the validated projection.",
      );
    await retainResources(stage, options.retain ?? []);
    const hashes: Record<string, string> = {};
    for (const file of await inventory(stage))
      hashes[file] = sha256(await readFile(path.join(stage, file)));
    await writeFile(
      path.join(stage, "integrity.json"),
      canonical(
        integritySchema.parse({
          schema_version: 1,
          release_id: prepared.releaseId,
          input_sha256: prepared.inputDigest,
          base: options.base,
          knowledge_published_at: options.publishedAt,
          files: hashes,
        }),
      ),
    );
    const verified = await verifyOnlineDeployment(stage);
    await rename(stage, output);
    stage = undefined;
    return verified;
  } finally {
    if (stage) await rm(stage, { recursive: true, force: true });
    await lock.close();
    await rm(`${output}.lock`);
  }
}
