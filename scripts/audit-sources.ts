import path from "node:path";
import { auditSources } from "../src/sources/audit.js";

await auditSources(path.resolve("."), path.resolve("."));
process.stderr.write("Local source originals match published metadata.\n");
