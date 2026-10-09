import { homedir } from "node:os";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { adapters } from "./adapters.js";
import { loadInitProducts, selectInitProducts } from "./catalog.js";
import { defaultInitPrompts } from "./prompts.js";
import {
  applyInitPlan,
  prepareInitPlan,
  renderInitPlan,
  type AppliedInit,
  type InitPlan,
} from "./service.js";
import {
  InitError,
  type InitAdapter,
  type InitEnvironment,
  type InitProduct,
  type InitPromptPort,
  type McpLaunch,
} from "./types.js";

export interface InitOptions {
  tools?: string;
  global?: boolean;
  yes?: boolean;
  json?: boolean;
  dataUrl?: string;
  offline?: boolean;
  cacheDir?: string;
  fileCache?: boolean;
}

export function initLaunch(options: InitOptions, cwd: string): McpLaunch {
  const args = ["-y", "agent-harness-wiki"];
  if (options.dataUrl !== undefined) args.push("--data-url", options.dataUrl);
  if (options.offline) args.push("--offline");
  if (options.cacheDir !== undefined)
    args.push("--cache-dir", path.resolve(cwd, options.cacheDir));
  if (options.fileCache === false) args.push("--no-file-cache");
  args.push("mcp");
  return { command: "npx", args };
}

async function confirmLine(message: string): Promise<boolean> {
  const cancellation = new AbortController();
  const cancel = () => cancellation.abort();
  process.once("SIGINT", cancel);
  process.once("SIGTERM", cancel);
  const input = createInterface({
    input: process.stdin,
    output: process.stderr,
  });
  input.once("SIGINT", cancel);
  try {
    return /^(?:|y|yes)$/i.test(
      (
        await input.question(`${message} [Y/n] `, {
          signal: cancellation.signal,
        })
      ).trim(),
    );
  } catch (error) {
    if (cancellation.signal.aborted)
      throw new InitError("cancelled", "Initialization cancelled.");
    throw error;
  } finally {
    input.close();
    input.removeListener("SIGINT", cancel);
    process.removeListener("SIGINT", cancel);
    process.removeListener("SIGTERM", cancel);
  }
}

export interface InitContext {
  signal?: AbortSignal;
  environment?: InitEnvironment;
  products?: readonly InitProduct[];
  adapters?: readonly InitAdapter[];
  prompts?: InitPromptPort;
  interactive?: boolean;
  write?: (message: string) => void;
  confirmLine?: (message: string) => Promise<boolean>;
}

export type InitResult =
  AppliedInit | { status: "cancelled"; plan: InitPlan; backups: string[] };

export async function runInit(
  options: InitOptions,
  context: InitContext = {},
): Promise<InitResult> {
  const checkCancelled = () => {
    if (context.signal?.aborted)
      throw new InitError("cancelled", "Initialization cancelled.");
  };
  checkCancelled();
  const cancellation = context.signal ? { signal: context.signal } : {};
  const environment = context.environment ?? {
    cwd: process.cwd(),
    home: homedir(),
    platform: process.platform,
    env: process.env,
  };
  const interactive =
    context.interactive ?? Boolean(process.stdin.isTTY && process.stderr.isTTY);
  const prompts = context.prompts ?? defaultInitPrompts;
  const write =
    context.write ?? ((message: string) => process.stderr.write(message));
  const registry = context.adapters ?? adapters;
  const products = context.products ?? (await loadInitProducts());
  if (options.tools === undefined && (options.yes || options.json))
    throw new InitError("tools_required", "--yes and --json require --tools.");
  if (options.tools === undefined && !interactive)
    throw new InitError(
      "tools_required",
      "Non-interactive initialization requires --tools and --yes.",
    );
  let selected: InitProduct[];
  if (options.tools !== undefined) {
    selected = selectInitProducts(products, options.tools);
  } else {
    const selection = await prompts.multiSelect({
      ...cancellation,
      message: "Select harnesses to configure",
      pageSize: 15,
      choices: products
        .toSorted(
          (a, b) =>
            a.name.localeCompare(b.name, "en") ||
            a.harness_id.localeCompare(b.harness_id),
        )
        .map((product) => {
          const adapter = registry.find(
            (item) => item.harnessId === product.harness_id,
          );
          const enabled = adapter && (adapter.project || adapter.global);
          return {
            name: product.name,
            value: product.harness_id,
            description: [
              product.harness_id,
              ...product.aliases,
              enabled
                ? [
                    adapter.project ? "project" : "",
                    adapter.global ? "global" : "",
                  ]
                    .filter(Boolean)
                    .join(" / ")
                : (adapter?.reason ?? "No verified local configuration entry"),
            ].join(" · "),
            ...(!enabled
              ? {
                  disabled:
                    adapter?.reason ?? "No verified local configuration entry",
                }
              : {}),
          };
        }),
    });
    if (!selection.length)
      throw new InitError("tools_required", "Select at least one harness.");
    selected = selectInitProducts(products, selection.join(","));
  }
  const unsupported = selected.filter(
    (product) =>
      !registry.find((item) => item.harnessId === product.harness_id)?.project,
  );
  const scope = options.global
    ? "global"
    : options.tools !== undefined
      ? "project"
      : await prompts.selectScope({
          ...cancellation,
          message: "Choose configuration scope",
          projectDisabled: unsupported.length === selected.length,
          projectDescription: unsupported.length
            ? `Skipped in project scope: ${unsupported.map((item) => item.name).join(", ")}`
            : `Current directory: ${environment.cwd}`,
        });
  if (scope === "project" && unsupported.length)
    write(
      `These harnesses will not be configured in project scope: ${unsupported.map((item) => item.name).join(", ")}.\n`,
    );
  const prepared = await prepareInitPlan({
    products: selected,
    scope,
    environment,
    launch: initLaunch(options, environment.cwd),
    adapters: registry,
  });
  write(renderInitPlan(prepared.plan));
  checkCancelled();
  if (!options.yes) {
    if (!interactive)
      throw new InitError(
        "confirmation_required",
        "Review the plan and rerun with --yes to apply it without a terminal.",
      );
    const message = "Apply this MCP configuration?";
    const confirmed =
      options.tools !== undefined
        ? await (context.confirmLine ?? confirmLine)(message)
        : await prompts.confirm({ message, default: true, ...cancellation });
    if (!confirmed)
      return { status: "cancelled", plan: prepared.plan, backups: [] };
  }
  checkCancelled();
  return applyInitPlan(prepared);
}
