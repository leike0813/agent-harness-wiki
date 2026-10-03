import path from "node:path";
import { checkHarnesses } from "../src/sources/scan.js";

try {
  const ids = process.argv.slice(2);
  const results = await checkHarnesses({
    root: path.resolve("."),
    ...(ids.length ? { harnessIds: ids } : {}),
  });
  process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
  if (results.some((result) => result.status === "blocked"))
    process.exitCode = 1;
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
}
