import { loadAndValidateDataset } from "../src/validation/dataset.js";

const [root, profile] = process.argv.slice(2);
if (!root || (profile !== "fixture" && profile !== "production")) {
  process.stderr.write("Usage: validate-dataset <root> <fixture|production>\n");
  process.exitCode = 2;
} else {
  const result = await loadAndValidateDataset({ root, profile });
  for (const diagnostic of result.diagnostics) {
    process.stderr.write(
      `${diagnostic.severity} ${diagnostic.code} ${diagnostic.file}${diagnostic.path}: ${diagnostic.reason} ${diagnostic.hint}\n`,
    );
  }
  if (result.ok)
    process.stdout.write(`Validated ${result.dataset.claims.length} claims.\n`);
  else process.exitCode = 1;
}
