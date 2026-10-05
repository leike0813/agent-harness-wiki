import { expect, test } from "vitest";
import { parse as parseJsonc } from "jsonc-parser";
import { parse as parseToml } from "@decimalturn/toml-patch";
import { parse as parseYaml } from "yaml";
import { editConfiguration } from "../../src/consumer/init/editor.js";
import {
  InitError,
  serverName,
  type ConfigTarget,
} from "../../src/consumer/init/types.js";

function at(value: unknown, ...keys: (string | number)[]): unknown {
  let current: unknown = value;
  for (const key of keys) {
    current = (current as Record<string | number, unknown>)[key];
  }
  return current;
}

function invalidOf(run: () => unknown): InitError {
  try {
    run();
  } catch (error) {
    expect(error).toBeInstanceOf(InitError);
    expect((error as InitError).code).toBe("invalid_config");
    return error as InitError;
  }
  throw new Error("expected an invalid_config InitError");
}

function jsoncMap(entry: Record<string, unknown>): ConfigTarget {
  return {
    path: "mcp.json",
    format: "jsonc",
    collection: ["mcpServers"],
    kind: "map",
    entry,
  };
}

function tomlMap(entry: Record<string, unknown>): ConfigTarget {
  return {
    path: "config.toml",
    format: "toml",
    collection: ["mcp_servers"],
    kind: "map",
    entry,
  };
}

function yamlMap(entry: Record<string, unknown>): ConfigTarget {
  return {
    path: "config.yaml",
    format: "yaml",
    collection: ["mcpServers"],
    kind: "map",
    entry,
  };
}

const launchEntry = {
  command: "npx",
  args: ["-y", "agent-harness-wiki", "mcp"],
};

/* ---------------------------------------------------------------- JSONC --- */

test("jsonc map inserts a server and preserves comments", () => {
  const input = [
    "{",
    "  // hosts",
    '  "mcpServers": {',
    '    "fictional-one": { "command": "fictional-one" } // keep me',
    "  }",
    "}",
    "",
  ].join("\n");
  const target = jsoncMap(launchEntry);
  const result = editConfiguration(input, target);
  expect(result.changed).toBe(true);
  expect(result.text).toContain("// hosts");
  expect(result.text).toContain("// keep me");
  const parsed = parseJsonc(result.text);
  expect(at(parsed, "mcpServers", "fictional-one")).toEqual({
    command: "fictional-one",
  });
  expect(at(parsed, "mcpServers", serverName)).toEqual(launchEntry);

  const again = editConfiguration(result.text, target);
  expect(again.changed).toBe(false);
  expect(again.text).toBe(result.text);
});

test("jsonc map overlays desired fields and keeps extra server fields", () => {
  const input = [
    "{",
    '  "mcpServers": {',
    '    "agent-harness-wiki": {',
    '      "command": "npx", // launch',
    '      "args": ["-y", "agent-harness-wiki@1.0.0", "mcp"],',
    '      "env": { "CUSTOM_FLAG": "keep" }',
    "    }",
    "  }",
    "}",
    "",
  ].join("\n");
  const target = jsoncMap({
    command: "npx",
    args: ["-y", "agent-harness-wiki@1.1.0", "mcp"],
  });
  const result = editConfiguration(input, target);
  expect(result.changed).toBe(true);
  expect(result.text).toContain("// launch");
  const entry = at(parseJsonc(result.text), "mcpServers", serverName);
  expect(at(entry, "env")).toEqual({ CUSTOM_FLAG: "keep" });
  expect(at(entry, "args")).toEqual(["-y", "agent-harness-wiki@1.1.0", "mcp"]);

  expect(editConfiguration(result.text, target).changed).toBe(false);
});

test("jsonc map inserts several fields into an existing empty server", () => {
  const input = [
    "{",
    '  "mcpServers": { "agent-harness-wiki": {} }',
    "}",
    "",
  ].join("\n");
  const target = jsoncMap(launchEntry);
  const result = editConfiguration(input, target);
  expect(result.changed).toBe(true);
  expect(at(parseJsonc(result.text), "mcpServers", serverName)).toEqual(
    launchEntry,
  );
  expect(editConfiguration(result.text, target).changed).toBe(false);
});

test("jsonc array matches by name key and inserts when missing", () => {
  const input = [
    "{",
    '  "servers": [',
    '    { "name": "fictional-one", "command": "fictional-one" }',
    "  ]",
    "}",
    "",
  ].join("\n");
  const target: ConfigTarget = {
    path: "mcp.json",
    format: "jsonc",
    collection: ["servers"],
    kind: "array",
    entry: { name: "agent-harness-wiki", ...launchEntry },
  };
  const result = editConfiguration(input, target);
  expect(result.changed).toBe(true);
  expect(at(parseJsonc(result.text), "servers")).toEqual([
    { name: "fictional-one", command: "fictional-one" },
    { name: "agent-harness-wiki", ...launchEntry },
  ]);
  expect(editConfiguration(result.text, target).changed).toBe(false);

  const duplicate = [
    "{",
    '  "servers": [',
    '    { "name": "agent-harness-wiki", "command": "a" },',
    '    { "name": "agent-harness-wiki", "command": "b" }',
    "  ]",
    "}",
    "",
  ].join("\n");
  invalidOf(() => editConfiguration(duplicate, target));
});

test("jsonc rejects malformed parents, roots and entries", () => {
  invalidOf(() =>
    editConfiguration('{ "mcp": "invalid" }', {
      ...jsoncMap(launchEntry),
      collection: ["mcp", "servers"],
    }),
  );
  invalidOf(() => editConfiguration("", jsoncMap(launchEntry)));
  invalidOf(() => editConfiguration("[]", jsoncMap(launchEntry)));
  invalidOf(() =>
    editConfiguration('{ "mcpServers": [] }', jsoncMap(launchEntry)),
  );
  invalidOf(() =>
    editConfiguration(
      '{ "mcpServers": { "agent-harness-wiki": "oops" } }',
      jsoncMap(launchEntry),
    ),
  );
});

test("jsonc does not support dsh targets", () => {
  invalidOf(() =>
    editConfiguration(undefined, {
      path: "patch.json",
      format: "jsonc",
      collection: ["insert"],
      kind: "dsh",
      entry: { id: "wiki-mcp" },
    }),
  );
});

test("jsonc synthesizes from the initial template only when text is absent", () => {
  const target: ConfigTarget = {
    path: "mcp.json",
    format: "jsonc",
    collection: ["mcpServers"],
    kind: "map",
    entry: launchEntry,
    initial: { name: "fictional-host", version: 1, schema: "v1" },
  };
  const result = editConfiguration(undefined, target);
  expect(result.changed).toBe(true);
  const parsed = parseJsonc(result.text);
  expect(at(parsed, "name")).toBe("fictional-host");
  expect(at(parsed, "mcpServers", serverName)).toEqual(launchEntry);
  expect(editConfiguration(result.text, target).changed).toBe(false);
});

/* ----------------------------------------------------------------- TOML --- */

test("toml map inserts a server and preserves comments", () => {
  const input = [
    "# hosts",
    "[mcp_servers.other]",
    'command = "fictional" # keep',
    "",
  ].join("\n");
  const target = tomlMap(launchEntry);
  const result = editConfiguration(input, target);
  expect(result.changed).toBe(true);
  expect(result.text).toContain("# hosts");
  expect(result.text).toContain("# keep");
  const parsed = parseToml(result.text);
  expect(at(parsed, "mcp_servers", "other", "command")).toBe("fictional");
  expect(at(parsed, "mcp_servers", serverName, "command")).toBe("npx");
  expect(editConfiguration(result.text, target).changed).toBe(false);
});

test("toml map merges desired fields over an existing table", () => {
  const input = [
    "[mcp_servers.agent-harness-wiki]",
    'command = "npx" # launch',
    'args = ["-y", "agent-harness-wiki@1.0.0", "mcp"]',
    "",
    "[mcp_servers.agent-harness-wiki.env]",
    'CUSTOM_FLAG = "keep"',
    "",
  ].join("\n");
  const target = tomlMap({
    command: "npx",
    args: ["-y", "agent-harness-wiki@1.1.0", "mcp"],
  });
  const result = editConfiguration(input, target);
  expect(result.changed).toBe(true);
  expect(result.text).toContain("# launch");
  const entry = at(parseToml(result.text), "mcp_servers", serverName);
  expect(at(entry, "env")).toEqual({ CUSTOM_FLAG: "keep" });
  expect(at(entry, "args")).toEqual(["-y", "agent-harness-wiki@1.1.0", "mcp"]);
  expect(editConfiguration(result.text, target).changed).toBe(false);
});

test("toml treats a blank file as empty but rejects malformed input", () => {
  const target: ConfigTarget = {
    ...tomlMap(launchEntry),
    initial: { required: true },
  };
  const result = editConfiguration("", target);
  expect(result.changed).toBe(true);
  const parsed = parseToml(result.text);
  expect(at(parsed, "mcp_servers", serverName, "command")).toBe("npx");
  expect(at(parsed, "required")).toBeUndefined();

  invalidOf(() => editConfiguration("name = ", tomlMap(launchEntry)));
  invalidOf(() =>
    editConfiguration("[[servers]]\nname = 'x'\n", {
      ...tomlMap(launchEntry),
      collection: [],
      kind: "array",
    }),
  );
});

test("toml array matches by name and rejects duplicates", () => {
  const input = [
    "[[servers]]",
    'name = "fictional-one"',
    'command = "fictional-one"',
    "",
  ].join("\n");
  const target: ConfigTarget = {
    path: "config.toml",
    format: "toml",
    collection: ["servers"],
    kind: "array",
    entry: { name: "agent-harness-wiki", ...launchEntry },
  };
  const result = editConfiguration(input, target);
  expect(result.changed).toBe(true);
  expect(at(parseToml(result.text), "servers")).toHaveLength(2);
  expect(editConfiguration(result.text, target).changed).toBe(false);

  const duplicate = [
    "[[servers]]",
    'name = "agent-harness-wiki"',
    "[[servers]]",
    'name = "agent-harness-wiki"',
    "",
  ].join("\n");
  invalidOf(() => editConfiguration(duplicate, target));
});

test("toml synthesis clones the initial template and keeps plans independent", () => {
  const initial = { name: "fictional-host", version: 1 };
  const snapshot = structuredClone(initial);

  const first = tomlMap({
    command: "npx",
    args: ["-y", "agent-harness-wiki@1.0.0", "mcp"],
    env: { CUSTOM_FLAG: "one" },
  });
  first.initial = initial;
  const firstParsed = parseToml(editConfiguration(undefined, first).text);
  expect(at(firstParsed, "name")).toBe("fictional-host");
  expect(at(firstParsed, "mcp_servers", serverName, "env", "CUSTOM_FLAG")).toBe(
    "one",
  );

  const second = tomlMap({ command: "node", args: ["server.js"] });
  second.initial = initial;
  const secondEntry = at(
    parseToml(editConfiguration(undefined, second).text),
    "mcp_servers",
    serverName,
  );
  expect(at(secondEntry, "command")).toBe("node");
  expect(at(secondEntry, "args")).toEqual(["server.js"]);
  expect(at(secondEntry, "env")).toBeUndefined();

  expect(initial).toEqual(snapshot);
  expect(first.entry).toEqual({
    command: "npx",
    args: ["-y", "agent-harness-wiki@1.0.0", "mcp"],
    env: { CUSTOM_FLAG: "one" },
  });
});

/* ----------------------------------------------------------------- YAML --- */

test("yaml map preserves comments, anchors and aliases while updating", () => {
  const input = [
    "# hosts",
    "defaults: &def",
    "  command: fictional # shared",
    "mcpServers:",
    "  other:",
    "    command: fictional",
    "  agent-harness-wiki:",
    "    command: npx # launch",
    "    inherit: *def",
    "    args:",
    "      - -y",
    "      - agent-harness-wiki@1.0.0",
    "      - mcp",
    "    env:",
    "      CUSTOM_FLAG: keep",
    "",
  ].join("\n");
  const target = yamlMap({
    command: "npx",
    args: ["-y", "agent-harness-wiki@1.1.0", "mcp"],
  });
  const result = editConfiguration(input, target);
  expect(result.changed).toBe(true);
  expect(result.text).toContain("# hosts");
  expect(result.text).toContain("# shared");
  expect(result.text).toContain("&def");
  expect(result.text).toContain("*def");
  const entry = at(parseYaml(result.text), "mcpServers", serverName);
  expect(at(entry, "env")).toEqual({ CUSTOM_FLAG: "keep" });
  expect(at(entry, "args")).toEqual(["-y", "agent-harness-wiki@1.1.0", "mcp"]);
  expect(editConfiguration(result.text, target).changed).toBe(false);
});

test("yaml map inserts a new server and is idempotent", () => {
  const input = [
    "# hosts",
    "mcpServers:",
    "  fictional-one:",
    "    command: fictional-one # keep",
    "",
  ].join("\n");
  const target = yamlMap(launchEntry);
  const result = editConfiguration(input, target);
  expect(result.changed).toBe(true);
  expect(result.text).toContain("# hosts");
  expect(result.text).toContain("# keep");
  const parsed = parseYaml(result.text);
  expect(at(parsed, "mcpServers", "fictional-one", "command")).toBe(
    "fictional-one",
  );
  expect(at(parsed, "mcpServers", serverName)).toEqual(launchEntry);
  expect(editConfiguration(result.text, target).changed).toBe(false);
});

test("yaml array matches by name key and rejects duplicates", () => {
  const input = [
    "servers:",
    "  - name: fictional-one",
    "    command: fictional-one",
    "",
  ].join("\n");
  const target: ConfigTarget = {
    path: "config.yaml",
    format: "yaml",
    collection: ["servers"],
    kind: "array",
    entry: { name: "agent-harness-wiki", ...launchEntry },
  };
  const result = editConfiguration(input, target);
  expect(result.changed).toBe(true);
  expect(at(parseYaml(result.text), "servers")).toHaveLength(2);
  expect(editConfiguration(result.text, target).changed).toBe(false);

  const duplicate = [
    "servers:",
    "  - name: agent-harness-wiki",
    "  - name: agent-harness-wiki",
    "",
  ].join("\n");
  invalidOf(() => editConfiguration(duplicate, target));
});

const dshEntry = {
  id: "wiki-mcp",
  name: "@deepseek-ai/dsh-mcp-client",
  config: {
    serverName: "agent-harness-wiki",
    transport: "stdio",
    command: "npx",
    args: ["-y", "agent-harness-wiki", "mcp"],
  },
};

function dshTarget(entry: Record<string, unknown>): ConfigTarget {
  return {
    path: "cordis.yml",
    format: "yaml",
    collection: ["insert"],
    kind: "dsh",
    entry,
  };
}

test("yaml dsh updates an id found in a later insert list without duplication", () => {
  const input = [
    "# patch file",
    "- insert:",
    "    - id: unrelated",
    "      name: '@example/unrelated'",
    "      config:",
    "        value: 1",
    "- insert:",
    "    - id: wiki-mcp",
    "      name: '@deepseek-ai/dsh-mcp-client'",
    "      config:",
    "        serverName: agent-harness-wiki",
    "        transport: stdio",
    "        command: old # launch",
    "        cwd: !!js process.cwd()",
    "",
  ].join("\n");
  const target = dshTarget(dshEntry);
  const result = editConfiguration(input, target);
  expect(result.changed).toBe(true);
  expect(result.text.match(/id: wiki-mcp/g)).toHaveLength(1);
  expect(result.text).toContain("# patch file");
  expect(result.text).toContain("# launch");
  expect(result.text).toContain("!!js process.cwd()");
  expect(result.text).not.toContain(process.cwd());
  const parsed = parseYaml(
    result.text.replace("!!js process.cwd()", "process.cwd()"),
  );
  expect(parsed).toHaveLength(2);
  expect(at(parsed, 0, "insert")).toHaveLength(1);
  const rows = at(parsed, 1, "insert") as unknown[];
  expect(rows).toHaveLength(1);
  expect(at(rows, 0, "config", "command")).toBe("npx");
  expect(at(rows, 0, "config", "args")).toEqual([
    "-y",
    "agent-harness-wiki",
    "mcp",
  ]);

  expect(editConfiguration(result.text, target).changed).toBe(false);
});

test("yaml dsh appends a new plugin into the matching insert list", () => {
  const input = [
    "- insert:",
    "    - id: unrelated",
    "      name: '@example/unrelated'",
    "- insert:",
    "    - id: other-mcp",
    "      name: '@deepseek-ai/dsh-mcp-client'",
    "      config:",
    "        serverName: other",
    "",
  ].join("\n");
  const target = dshTarget(dshEntry);
  const result = editConfiguration(input, target);
  expect(result.changed).toBe(true);
  expect(result.text.match(/id: wiki-mcp/g)).toHaveLength(1);
  const parsed = parseYaml(result.text) as unknown[];
  expect(at(parsed, 0, "insert")).toHaveLength(1);
  expect(at(parsed, 1, "insert")).toHaveLength(2);
  expect(editConfiguration(result.text, target).changed).toBe(false);
});

test("yaml dsh rejects duplicate ids across insert lists", () => {
  const input = [
    "- insert:",
    "    - id: wiki-mcp",
    "      name: '@deepseek-ai/dsh-mcp-client'",
    "- insert:",
    "    - id: wiki-mcp",
    "      name: '@deepseek-ai/dsh-mcp-client'",
    "",
  ].join("\n");
  invalidOf(() => editConfiguration(input, dshTarget(dshEntry)));
});

test("yaml rejects malformed input and wrong root shapes without echoing content", () => {
  const secret = "SUPERSECRETVALUE";
  const error = invalidOf(() =>
    editConfiguration(
      "a: [1, 2\nsecret: " + secret + "\n",
      yamlMap(launchEntry),
    ),
  );
  expect(error.message).not.toContain(secret);
  invalidOf(() => editConfiguration("", yamlMap(launchEntry)));
  invalidOf(() => editConfiguration("insert: []", dshTarget(dshEntry)));
  invalidOf(() =>
    editConfiguration("mcp: value", {
      ...yamlMap(launchEntry),
      collection: ["mcp", "servers"],
    }),
  );
});

test("switching a remote server to a process drops remote fields in every format", () => {
  const jsoncInput = [
    "{",
    '  "mcpServers": {',
    '    "agent-harness-wiki": {',
    '      "type": "http",',
    '      "url": "https://old.example/mcp",',
    '      "headers": { "X-Legacy": "1" }',
    "    }",
    "  }",
    "}",
    "",
  ].join("\n");
  const jsoncSwitched = editConfiguration(jsoncInput, jsoncMap(launchEntry));
  expect(at(parseJsonc(jsoncSwitched.text), "mcpServers", serverName)).toEqual(
    launchEntry,
  );
  expect(
    editConfiguration(jsoncSwitched.text, jsoncMap(launchEntry)).changed,
  ).toBe(false);

  const tomlInput = [
    "[mcp_servers.agent-harness-wiki]",
    'type = "http"',
    'url = "https://old.example/mcp"',
    "",
  ].join("\n");
  const tomlSwitched = editConfiguration(tomlInput, tomlMap(launchEntry));
  expect(at(parseToml(tomlSwitched.text), "mcp_servers", serverName)).toEqual(
    launchEntry,
  );
  expect(
    editConfiguration(tomlSwitched.text, tomlMap(launchEntry)).changed,
  ).toBe(false);

  const yamlArrayInput = [
    "servers:",
    "  - name: agent-harness-wiki",
    "    type: http",
    "    url: https://old.example/mcp",
    "",
  ].join("\n");
  const yamlArrayTarget: ConfigTarget = {
    path: "c.yaml",
    format: "yaml",
    collection: ["servers"],
    kind: "array",
    entry: { name: "agent-harness-wiki", ...launchEntry },
  };
  const yamlSwitched = editConfiguration(yamlArrayInput, yamlArrayTarget);
  expect(at(parseYaml(yamlSwitched.text), "servers", 0)).toEqual({
    name: "agent-harness-wiki",
    ...launchEntry,
  });
  expect(editConfiguration(yamlSwitched.text, yamlArrayTarget).changed).toBe(
    false,
  );

  const dshInput = [
    "- insert:",
    "    - id: wiki-mcp",
    "      name: '@deepseek-ai/dsh-mcp-client'",
    "      config:",
    "        serverName: agent-harness-wiki",
    "        transport: streamable-http",
    "        url: https://old.example/mcp",
    "",
  ].join("\n");
  const dshSwitched = editConfiguration(dshInput, dshTarget(dshEntry));
  expect(at(parseYaml(dshSwitched.text), 0, "insert", 0, "config")).toEqual(
    dshEntry.config,
  );
  expect(editConfiguration(dshSwitched.text, dshTarget(dshEntry)).changed).toBe(
    false,
  );
});
