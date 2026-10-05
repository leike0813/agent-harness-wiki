import { constants } from "node:fs";
import {
  access,
  copyFile,
  lstat,
  link,
  mkdir,
  open,
  readFile,
  realpath,
  rename,
  rmdir,
  stat,
  unlink,
} from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { adapters } from "./adapters.js";
import { editConfiguration } from "./editor.js";
import {
  InitError,
  type ConfigTarget,
  type InitAdapter,
  type InitEnvironment,
  type InitProduct,
  type InitScope,
  type McpLaunch,
} from "./types.js";

export interface InitPlanEntry {
  products: string[];
  path?: string;
  action: "create" | "update" | "unchanged" | "skip";
  reason?: string;
  notes: string[];
  configuration?: Record<string, unknown>;
}

export interface InitPlan {
  scope: InitScope;
  root: string;
  products: string[];
  entries: InitPlanEntry[];
}

interface Baseline {
  path: string;
  physicalPath: string;
  text: string | undefined;
  mode: number;
}

interface PlannedFile {
  baseline: Baseline;
  text: string;
}

export interface PreparedInit {
  plan: InitPlan;
  files: PlannedFile[];
}

const missing = (error: unknown) =>
  (error as NodeJS.ErrnoException).code === "ENOENT";

async function existingParent(file: string): Promise<string> {
  let directory = path.dirname(file);
  for (;;) {
    try {
      if (!(await stat(directory)).isDirectory())
        throw new InitError(
          "invalid_path",
          `Not a configuration directory: ${directory}`,
        );
      return directory;
    } catch (error) {
      if (!missing(error)) throw error;
      const parent = path.dirname(directory);
      if (parent === directory) throw error;
      directory = parent;
    }
  }
}

async function baseline(file: string): Promise<Baseline> {
  try {
    const physicalPath = await realpath(file);
    const info = await stat(physicalPath);
    if (!info.isFile())
      throw new InitError("invalid_path", `Not a configuration file: ${file}`);
    return {
      path: file,
      physicalPath,
      text: await readFile(physicalPath, "utf8"),
      mode: info.mode & 0o777,
    };
  } catch (error) {
    if (!missing(error)) throw error;
    try {
      await lstat(file);
      throw new InitError(
        "invalid_path",
        `Configuration symlink has no target: ${file}`,
      );
    } catch (linkError) {
      if (!missing(linkError)) throw linkError;
    }
    const parent = await existingParent(file);
    const physicalParent = await realpath(parent);
    return {
      path: file,
      physicalPath: path.resolve(physicalParent, path.relative(parent, file)),
      text: undefined,
      mode: 0o600,
    };
  }
}

function inside(root: string, file: string): boolean {
  const relative = path.relative(root, file);
  return (
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

async function preflight(file: Baseline): Promise<void> {
  const parent = await existingParent(file.physicalPath);
  await access(parent, constants.W_OK | constants.X_OK);
  if (file.text !== undefined) await access(file.physicalPath, constants.W_OK);
}

async function assertBaseline(expected: Baseline): Promise<void> {
  const current = await baseline(expected.path);
  if (
    current.physicalPath !== expected.physicalPath ||
    current.text !== expected.text ||
    current.mode !== expected.mode
  )
    throw new InitError(
      "configuration_changed",
      `Configuration changed after planning: ${expected.path}`,
    );
}

function mergeRequirements(
  existing: Record<string, unknown>,
  required: Record<string, unknown>,
  file: string,
): Record<string, unknown> {
  const merged = { ...existing };
  for (const [key, value] of Object.entries(required)) {
    if (!(key in merged) || isDeepStrictEqual(merged[key], value)) {
      merged[key] = value;
      continue;
    }
    const prior = merged[key];
    if (
      prior &&
      value &&
      typeof prior === "object" &&
      typeof value === "object" &&
      !Array.isArray(prior) &&
      !Array.isArray(value)
    ) {
      merged[key] = mergeRequirements(
        prior as Record<string, unknown>,
        value as Record<string, unknown>,
        file,
      );
    } else {
      throw new InitError(
        "configuration_conflict",
        `Selected harnesses require incompatible entries in ${file}`,
      );
    }
  }
  return merged;
}

export async function prepareInitPlan(input: {
  products: readonly InitProduct[];
  scope: InitScope;
  environment: InitEnvironment;
  launch: McpLaunch;
  adapters?: readonly InitAdapter[];
}): Promise<PreparedInit> {
  const { products, scope, environment, launch } = input;
  const registry = input.adapters ?? adapters;
  const plan: InitPlan = {
    scope,
    root: scope === "project" ? environment.cwd : environment.home,
    products: products.map((product) => product.harness_id),
    entries: [],
  };
  const files = new Map<string, PlannedFile>();
  const edits = new Map<
    string,
    { target: ConfigTarget; entry: InitPlanEntry }
  >();
  try {
    const projectRoot =
      scope === "project" ? await realpath(environment.cwd) : undefined;
    for (const product of products) {
      const adapter = registry.find(
        (item) => item.harnessId === product.harness_id,
      );
      const skip = (reason: string) =>
        plan.entries.push({
          products: [product.harness_id],
          action: "skip",
          reason,
          notes: [],
        });
      if (!adapter || !adapter[scope]) {
        skip(
          adapter?.reason ??
            `This harness does not support ${scope} MCP configuration.`,
        );
        continue;
      }
      const discovered = await adapter.discover(scope, environment, launch);
      for (const reason of discovered.skipped) skip(reason);
      for (const target of discovered.targets) {
        const original = await baseline(path.resolve(target.path));
        if (projectRoot && !inside(projectRoot, original.physicalPath))
          throw new InitError(
            "path_outside_project",
            `Project configuration resolves outside the current directory: ${target.path}`,
          );
        await preflight(original);
        let file = files.get(original.physicalPath);
        if (!file) {
          file = { baseline: original, text: original.text ?? "" };
          files.set(original.physicalPath, file);
        }
        // Different products may share one physical configuration entry.
        const location = JSON.stringify([
          original.physicalPath,
          target.collection,
          target.kind,
          target.nameKey,
        ]);
        const prior = edits.get(location);
        if (prior) {
          const merged = mergeRequirements(
            prior.target.entry,
            target.entry,
            target.path,
          );
          const updated = editConfiguration(file.text, {
            ...target,
            entry: merged,
          });
          file.text = updated.text;
          prior.target = { ...target, entry: merged };
          prior.entry.configuration = merged;
          if (updated.changed)
            prior.entry.action =
              original.text === undefined ? "create" : "update";
          prior.entry.products.push(product.harness_id);
          prior.entry.notes = [
            ...new Set([...prior.entry.notes, ...(target.notes ?? [])]),
          ];
          continue;
        }
        const edited = editConfiguration(
          original.text === undefined && file.text === ""
            ? undefined
            : file.text,
          target,
        );
        file.text = edited.text;
        const entry: InitPlanEntry = {
          products: [product.harness_id],
          path: original.path,
          action: !edited.changed
            ? "unchanged"
            : original.text === undefined
              ? "create"
              : "update",
          notes: target.notes ?? [],
          configuration: target.entry,
        };
        edits.set(location, { target, entry });
        plan.entries.push(entry);
      }
    }
    return {
      plan,
      files: [...files.values()].filter(
        (file) => file.text !== file.baseline.text,
      ),
    };
  } catch (error) {
    if (error instanceof InitError) throw error;
    throw new InitError(
      "configuration_preflight_failed",
      error instanceof Error
        ? error.message
        : "Configuration preflight failed.",
    );
  }
}

export interface AppliedInit {
  status: "configured" | "unchanged";
  plan: InitPlan;
  backups: string[];
}

/** Apply only a prepared, confirmed plan. Backups remain available for recovery. */
export async function applyInitPlan(
  prepared: PreparedInit,
): Promise<AppliedInit> {
  const { files, plan } = prepared;
  const directories: string[] = [];
  const written: PlannedFile[] = [];
  const backups = new Map<PlannedFile, string>();
  let temporary: string | undefined;
  try {
    for (const file of files) await assertBaseline(file.baseline);
    for (const file of files) {
      const { baseline: original } = file;
      const parent = await existingParent(original.physicalPath);
      const relative = path.relative(
        parent,
        path.dirname(original.physicalPath),
      );
      let directory = parent;
      for (const part of relative ? relative.split(path.sep) : []) {
        directory = path.join(directory, part);
        try {
          await mkdir(directory);
          directories.push(directory);
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
        }
      }
      await assertBaseline(original);
      if (original.text !== undefined) {
        const backup = `${original.physicalPath}.ahw-backup-${randomUUID()}`;
        await copyFile(original.physicalPath, backup, constants.COPYFILE_EXCL);
        backups.set(file, backup);
      }
      temporary = `${original.physicalPath}.ahw-tmp-${randomUUID()}`;
      const handle = await open(temporary, "wx", original.mode);
      try {
        await handle.writeFile(file.text, "utf8");
        await handle.chmod(original.mode);
        await handle.sync();
      } finally {
        await handle.close();
      }
      await assertBaseline(original);
      if (original.text === undefined) {
        // Publishing a new file must not replace one created concurrently.
        await link(temporary, original.physicalPath);
        written.push(file);
        await unlink(temporary);
      } else {
        await rename(temporary, original.physicalPath);
        written.push(file);
      }
      temporary = undefined;
    }
    return {
      status: files.length ? "configured" : "unchanged",
      plan,
      backups: [...backups.values()],
    };
  } catch (error) {
    const recovery: string[] = [];
    if (temporary) await unlink(temporary).catch(() => {});
    for (const file of written.reverse()) {
      try {
        const current = await baseline(file.baseline.path);
        if (
          current.physicalPath !== file.baseline.physicalPath ||
          current.text !== file.text
        )
          throw new Error("changed concurrently; retained for manual recovery");
        const backup = backups.get(file);
        if (backup) {
          const restore = `${file.baseline.physicalPath}.ahw-restore-${randomUUID()}`;
          try {
            await copyFile(backup, restore, constants.COPYFILE_EXCL);
            await assertBaseline(current);
            await rename(restore, file.baseline.physicalPath);
          } finally {
            await unlink(restore).catch(() => {});
          }
        } else {
          await assertBaseline(current);
          await unlink(file.baseline.physicalPath);
        }
      } catch (restoreError) {
        recovery.push(
          `${file.baseline.path}: ${restoreError instanceof Error ? restoreError.message : "restore failed"}`,
        );
      }
    }
    for (const directory of directories.reverse())
      await rmdir(directory).catch(() => {});
    const message =
      error instanceof Error ? error.message : "Configuration write failed.";
    if (!written.length && error instanceof InitError) throw error;
    throw new InitError(
      recovery.length
        ? "configuration_recovery_failed"
        : "configuration_write_failed",
      `${message} ${recovery.length ? recovery.join("; ") : "This round's writes were restored."}${backups.size ? ` Backups: ${[...backups.values()].join(", ")}` : ""}`,
    );
  }
}

export function renderInitPlan(plan: InitPlan): string {
  const lines = [`MCP configuration plan (${plan.scope}: ${plan.root})`];
  for (const entry of plan.entries) {
    lines.push(
      `  ${entry.action}: ${entry.products.join(", ")}${entry.path ? ` → ${entry.path}` : ""}`,
    );
    if (entry.reason) lines.push(`    ${entry.reason}`);
    for (const note of entry.notes) lines.push(`    ${note}`);
    if (entry.configuration)
      lines.push(`    ${JSON.stringify(entry.configuration)}`);
  }
  return `${lines.join("\n")}\n`;
}
