import path from "node:path";
import {
  checkCurrentManaged,
  managedPackages,
  observeManaged,
  updateManaged,
  type ManagedId,
} from "../src/sources/managed.js";

const [action, id, candidateId] = process.argv.slice(2);
if (
  (action !== "observe" && action !== "update" && action !== "check-current") ||
  (id && !(id in managedPackages)) ||
  (action === "update" && !id) ||
  (candidateId && action !== "update")
) {
  process.stderr.write(
    "Usage: pnpm managed:packages observe|check-current [harness-id] | update <harness-id> [candidate-id]\n",
  );
  process.exitCode = 2;
} else {
  const ids = (id ? [id] : Object.keys(managedPackages)) as ManagedId[];
  for (const selected of ids) {
    const root = path.resolve(".");
    const result =
      action === "update"
        ? await updateManaged(root, selected, fetch, candidateId)
        : action === "check-current"
          ? await checkCurrentManaged(root, selected)
          : await observeManaged(root, selected);
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    if (result.status === "blocked" || result.status === "anomaly")
      process.exitCode = 1;
  }
}
