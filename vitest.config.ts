import { configDefaults, defineConfig } from "vitest/config";

// `pnpm test` and `pnpm test:integration` pass `tests/unit` and
// `tests/integration` as name filters, not path roots, so vitest still collects
// every matching spec under the repository. The ignored originals area holds
// read-only upstream checkouts that ship their own test suites; collecting them
// fails on their uninstalled workspace imports and proves nothing about this
// project.
export default defineConfig({
  test: {
    exclude: [
      ...configDefaults.exclude,
      "archive/**",
      "releases/**",
      "site/**",
    ],
  },
});
