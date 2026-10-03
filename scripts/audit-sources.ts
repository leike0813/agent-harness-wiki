import path from "node:path";
import { auditSources } from "../src/sources/audit.js";

const results = await auditSources(path.resolve("."), path.resolve("."));
const count = (status: "verified" | "not_retained") =>
  results.filter((item) => item.status === status).length;
process.stdout.write(
  `Verified against local originals: ${count("verified")}\n` +
    `Recorded by fixed identity only: ${count("not_retained")}\n`,
);
const notRetained = results.filter((item) => item.status === "not_retained");
if (notRetained.length)
  process.stderr.write(
    `Not retained here: ${notRetained
      .map((item) => `${item.record} ${item.id}`)
      .join(", ")}\n`,
  );
