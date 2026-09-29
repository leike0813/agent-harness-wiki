import { loadAndValidateChapters } from "../src/validation/chapters.js";

const [root, profile] = process.argv.slice(2);
if (!root || (profile !== "fixture" && profile !== "production")) {
  process.stderr.write(
    "Usage: validate-chapters <root> <fixture|production>\n",
  );
  process.exitCode = 2;
} else {
  const result = await loadAndValidateChapters({ root, profile });
  for (const diagnostic of result.diagnostics)
    process.stderr.write(
      `${diagnostic.severity} ${diagnostic.code} ${diagnostic.file}${diagnostic.path}: ${diagnostic.reason} ${diagnostic.hint}\n`,
    );
  if (result.ok)
    process.stdout.write(
      `Validated ${result.dataset.chapters.length} chapter editions.\n`,
    );
  else process.exitCode = 1;
}
