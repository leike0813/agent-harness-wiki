import path from "node:path";
import {
  closeSourceWorkspace,
  createSourceWorkspace,
  listSourceWorkspaces,
  recoverSourceWorkspaces,
} from "../src/sources/workspace.js";
import { loadAndValidateDataset } from "../src/validation/dataset.js";

const USAGE =
  "Usage: pnpm sources:workspace open --source-id <id> --commit <sha> [--baseline <sha>] --owner-pid <pid> | list --owner-pid <pid> | close <workspace-id> | recover\n";

function options(args: string[]): Map<string, string> {
  const result = new Map<string, string>();
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    const value = args[index + 1];
    if (!key?.startsWith("--") || !value || value.startsWith("--"))
      throw new Error(`Malformed option: ${key}`);
    result.set(key.slice(2), value);
  }
  return result;
}

function required(values: Map<string, string>, name: string): string {
  const value = values.get(name);
  if (!value) throw new Error(`Missing --${name}`);
  return value;
}

const [action, ...rest] = process.argv.slice(2);
const root = path.resolve(".");
try {
  if (action === "open") {
    const values = options(rest);
    const unknown = [...values.keys()].filter(
      (name) =>
        !["source-id", "commit", "baseline", "owner-pid"].includes(name),
    );
    if (unknown.length) throw new Error(`Unknown option: --${unknown[0]}`);
    const sourceId = required(values, "source-id");
    const validated = await loadAndValidateDataset({
      root,
      profile: "production",
    });
    if (!validated.ok)
      throw new Error(
        `Production dataset invalid: ${validated.diagnostics
          .map((item) => item.code)
          .join(", ")}`,
      );
    const source = validated.dataset.sources.find(
      (item) => item.source_id === sourceId,
    );
    if (!source) throw new Error(`Unknown source: ${sourceId}`);
    if (source.kind !== "git_repository")
      throw new Error(`Source is not a git repository: ${sourceId}`);
    const baseline = values.get("baseline");
    const ownerPid = Number(required(values, "owner-pid"));
    if (!Number.isInteger(ownerPid) || ownerPid <= 0)
      throw new Error("--owner-pid must be a positive integer");
    const workspace = await createSourceWorkspace({
      repository: source.repository_url,
      commit: required(values, "commit"),
      ...(baseline ? { baseline } : {}),
      ownerPid,
      projectRoot: root,
    });
    // The workspace outlives this command: the caller disposes it explicitly.
    process.stdout.write(
      `${JSON.stringify(
        {
          id: workspace.id,
          path: workspace.path,
          source_id: sourceId,
          repository_url: source.repository_url,
          commit: required(values, "commit"),
          ...(baseline ? { baseline } : {}),
          ...(workspace.changedPaths
            ? { changed_paths: workspace.changedPaths }
            : {}),
        },
        null,
        2,
      )}\n`,
    );
  } else if (action === "list") {
    const values = options(rest);
    if (values.size !== 1 || !values.has("owner-pid"))
      throw new Error("list requires only --owner-pid");
    const ownerPid = Number(required(values, "owner-pid"));
    if (!Number.isSafeInteger(ownerPid) || ownerPid <= 0)
      throw new Error("--owner-pid must be a positive integer");
    process.stdout.write(
      `${JSON.stringify(await listSourceWorkspaces(root, ownerPid))}\n`,
    );
  } else if (action === "close") {
    if (rest.length !== 1 || rest[0]!.startsWith("--"))
      throw new Error("close requires exactly one workspace id");
    await closeSourceWorkspace({ id: rest[0]!, projectRoot: root });
    process.stdout.write(`${JSON.stringify({ closed: rest[0]! })}\n`);
  } else if (action === "recover") {
    if (rest.length) throw new Error("recover takes no arguments");
    const recovered = await recoverSourceWorkspaces(root);
    process.stdout.write(`${JSON.stringify(recovered, null, 2)}\n`);
  } else {
    process.stderr.write(USAGE);
    process.exitCode = 2;
  }
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
}
