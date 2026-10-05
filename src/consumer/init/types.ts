export type InitScope = "project" | "global";

export interface InitEnvironment {
  cwd: string;
  home: string;
  platform: NodeJS.Platform;
  env: NodeJS.ProcessEnv;
}

export interface McpLaunch {
  command: string;
  args: string[];
}

export interface ConfigTarget {
  path: string;
  format: "jsonc" | "toml" | "yaml";
  collection: string[];
  kind: "map" | "array" | "dsh";
  entry: Record<string, unknown>;
  nameKey?: string;
  initial?: Record<string, unknown> | unknown[];
  notes?: string[];
}

export interface InitDiscovery {
  targets: ConfigTarget[];
  skipped: string[];
}

export interface InitAdapter {
  harnessId: string;
  project: boolean;
  global: boolean;
  reason?: string;
  discover(
    scope: InitScope,
    environment: InitEnvironment,
    launch: McpLaunch,
  ): Promise<InitDiscovery>;
}

export interface InitProduct {
  harness_id: string;
  name: string;
  aliases: string[];
}

export interface InitChoice {
  name: string;
  value: string;
  description?: string;
  disabled?: string;
}

export interface InitPromptPort {
  multiSelect(config: {
    message: string;
    choices: InitChoice[];
    pageSize?: number;
    signal?: AbortSignal;
  }): Promise<string[]>;
  selectScope(config: {
    message: string;
    projectDisabled: boolean;
    projectDescription: string;
    signal?: AbortSignal;
  }): Promise<InitScope>;
  confirm(config: {
    message: string;
    default: boolean;
    signal?: AbortSignal;
  }): Promise<boolean>;
}

export class InitError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "InitError";
  }
}

export const serverName = "agent-harness-wiki";
