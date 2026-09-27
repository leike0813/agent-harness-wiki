import path from "node:path";
import { scanHarnesses } from "../src/sources/scan.js";

try {
  const audits = await scanHarnesses({
    root: path.resolve("."),
    harnessIds: process.argv.slice(2),
  });
  process.stdout.write(`${JSON.stringify(audits, null, 2)}\n`);
  if (audits.some((audit) => audit.status === "blocked")) process.exitCode = 1;
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
}
