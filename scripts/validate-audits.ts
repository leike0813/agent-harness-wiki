import path from "node:path";
import { validateAuditLedger } from "../src/sources/scan.js";

try {
  const count = await validateAuditLedger(path.resolve("."));
  process.stdout.write(`Validated ${count} upstream audit records.\n`);
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
}
