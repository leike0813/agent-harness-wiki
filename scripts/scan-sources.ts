import path from "node:path";
import { scanHarnesses } from "../src/sources/scan.js";
import { MonitorState } from "../src/sources/monitor-state.js";
import { synchronizeMonitorAudits } from "../src/sources/monitor-run.js";

try {
  const root = path.resolve(".");
  const state = await MonitorState.open(root);
  let audits;
  try {
    await synchronizeMonitorAudits(root, state);
    audits = await scanHarnesses({
      root,
      harnessIds: process.argv.slice(2),
      baselineBySource: state.baselines(true),
      onDocument: (id, bytes) => state.retainDocument(id, bytes),
    });
    state.observe(audits);
  } finally {
    state.close();
  }
  process.stdout.write(`${JSON.stringify(audits, null, 2)}\n`);
  if (audits.some((audit) => audit.status === "blocked")) process.exitCode = 1;
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
}
