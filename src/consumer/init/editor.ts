/**
 * Pure, format-aware editor for MCP host configuration files.
 *
 * editConfiguration adds or updates exactly one MCP server entry and leaves the
 * rest of the document alone:
 *
 * - map: the entry is keyed by the fixed serverName constant.
 * - array: an entry is matched by entry[target.nameKey] (default "name").
 * - dsh: a Cordis patch sequence carries an "insert" list of plugins and rows
 *   are matched by entry.id.
 *
 * Merge semantics: desired fields are overlaid onto an existing entry. Plain
 * object fields are merged recursively, so extra existing fields such as "env"
 * or custom controls survive, while arrays and scalars are replaced by the
 * desired value. When the desired subset already matches the existing entry the
 * result reports changed: false and returns the input text byte-for-byte.
 *
 * Documents are edited through their CST (YAML), the JSONC tree, or the TOML
 * patcher, so comments, anchors, aliases and non-evaluated custom tags such as
 * the !!js tag are preserved. Custom tags are never evaluated.
 */
import { isDeepStrictEqual as isDeepStrictEqualImpl } from "node:util";
import {
  applyEdits as applyJsoncEdits,
  getNodeValue,
  modify as modifyJsonc,
  parseTree as parseJsoncTree,
  type FormattingOptions,
  type JSONPath,
  type ParseError as JsoncParseError,
} from "jsonc-parser";
import {
  parse as parseToml,
  patch as patchToml,
  stringify as stringifyToml,
} from "@decimalturn/toml-patch";
import {
  Document,
  isAlias,
  isMap,
  isScalar,
  isSeq,
  parseDocument,
  type Node as YamlNode,
  type Pair as YamlPair,
  type YAMLMap,
  type YAMLSeq,
} from "yaml";
import { InitError, serverName, type ConfigTarget } from "./types.js";

export interface EditConfigurationResult {
  text: string;
  changed: boolean;
}

interface ChangePlan {
  changed: boolean;
}

interface JsoncPlan extends ChangePlan {
  text: string;
}

/**
 * Add or update the single MCP server entry described by target.
 *
 * text is the current file content, or undefined when the file does not exist
 * yet; in that case target.initial (or an empty container) seeds the new
 * document. The function is pure: it never writes files and only returns the
 * resulting text and whether it differs.
 */
export function editConfiguration(
  text: string | undefined,
  target: ConfigTarget,
): EditConfigurationResult {
  switch (target.format) {
    case "jsonc":
      return editJsonc(text, target);
    case "toml":
      return editToml(text, target);
    case "yaml":
      return editYaml(text, target);
  }
}

function invalid(message: string): never {
  throw new InitError("invalid_config", message);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Structural equality for parsed data. Parsers build objects and arrays with
 * different prototypes than caller literals, so prototypes are ignored.
 */
function isDeepStrictEqual(left: unknown, right: unknown): boolean {
  return isDeepStrictEqualImpl(left, right, { skipPrototype: true });
}

/** Overlay desired onto existing, merging plain objects and replacing the rest. */
const REMOTE_TRANSPORT_TYPES = new Set([
  "http",
  "https",
  "sse",
  "ws",
  "wss",
  "remote",
  "streamable-http",
  "streamablehttp",
  "streamable_http",
]);

/** A stdio/local process entry, identified by command/cmd or an explicit type. */
function isProcessDescriptor(value: Record<string, unknown>): boolean {
  return (
    "command" in value ||
    "cmd" in value ||
    value["type"] === "local" ||
    value["type"] === "stdio"
  );
}

/** A remote transport entry, identified by a url or a remote transport type. */
function isRemoteDescriptor(value: Record<string, unknown>): boolean {
  return (
    "url" in value ||
    (typeof value["type"] === "string" &&
      REMOTE_TRANSPORT_TYPES.has(value["type"].toLowerCase()))
  );
}

function mergeEntry(
  existing: Record<string, unknown>,
  desired: Record<string, unknown>,
): Record<string, unknown> {
  // Switching a remote server to a local process must not inherit url/type/headers.
  if (isProcessDescriptor(desired) && isRemoteDescriptor(existing)) {
    return structuredClone(desired);
  }
  const merged: Record<string, unknown> = { ...existing };
  for (const [key, value] of Object.entries(desired)) {
    const current = merged[key];
    merged[key] =
      isPlainObject(current) && isPlainObject(value)
        ? mergeEntry(current, value)
        : value;
  }
  return merged;
}

function nameKeyOf(target: ConfigTarget): string {
  return target.nameKey ?? "name";
}

function arrayEntryName(target: ConfigTarget): unknown {
  const key = nameKeyOf(target);
  const name = target.entry[key];
  if (name === undefined) {
    invalid(
      "Target entry is missing '" + key + "', required to match array entries.",
    );
  }
  return name;
}

function dshEntryId(target: ConfigTarget): unknown {
  const id = target.entry["id"];
  if (id === undefined) {
    invalid("Target entry is missing 'id', required to match dsh plugins.");
  }
  return id;
}

function initialValue(target: ConfigTarget): unknown {
  // Clone so a synthesized document never shares the adapter's reusable layout.
  if (target.initial !== undefined) return structuredClone(target.initial);
  if (target.kind === "dsh") return [];
  if (target.kind === "array" && target.collection.length === 0) return [];
  return {};
}

function buildResult(text: string, changed: boolean): EditConfigurationResult {
  return { text, changed };
}

function getPath(root: unknown, path: readonly (string | number)[]): unknown {
  let current: unknown = root;
  for (const segment of path) {
    if (Array.isArray(current)) {
      if (typeof segment !== "number") return undefined;
      current = current[segment];
    } else if (isPlainObject(current)) {
      current = current[String(segment)];
    } else {
      return undefined;
    }
    if (current === undefined) return undefined;
  }
  return current;
}

function setPath(
  root: Record<string, unknown>,
  path: readonly string[],
  value: unknown,
): void {
  const last = path[path.length - 1];
  if (last === undefined) return;
  let current = root;
  for (let index = 0; index < path.length - 1; index += 1) {
    const segment = path[index]!;
    const next = current[segment];
    if (isPlainObject(next)) {
      current = next;
    } else {
      const created: Record<string, unknown> = {};
      current[segment] = created;
      current = created;
    }
  }
  current[last] = value;
}

/**
 * Reject a malformed parent before a write would silently replace a scalar or
 * an array. Every prefix of path (root included) must be a plain object; a
 * missing prefix is fine because the write creates it.
 */
function requireObjectParents(root: unknown, path: readonly string[]): void {
  let current: unknown = root;
  for (const segment of path) {
    if (current === undefined) return;
    if (!isPlainObject(current)) {
      invalid(
        "Configuration path '" + path.join(".") + "' has a non-object parent.",
      );
    }
    current = current[segment];
  }
}

/* -------------------------------------------------------------------------- */
/* JSONC                                                                      */
/* -------------------------------------------------------------------------- */

function editJsonc(
  text: string | undefined,
  target: ConfigTarget,
): EditConfigurationResult {
  const input = text ?? "";
  const synthesized = text === undefined;
  let baseText: string;
  let root: unknown;
  if (synthesized) {
    root = initialValue(target);
    baseText = JSON.stringify(root, null, 2) + "\n";
  } else {
    const errors: JsoncParseError[] = [];
    const tree = parseJsoncTree(input, errors, { allowTrailingComma: true });
    if (errors.length > 0 || tree === undefined) {
      invalid("Existing JSON configuration is not valid JSON with comments.");
    }
    root = getNodeValue(tree);
    baseText = input;
  }
  const formattingOptions: FormattingOptions = {
    tabSize: 2,
    insertSpaces: true,
    eol: baseText.includes("\r\n") ? "\r\n" : "\n",
  };
  if (target.kind === "dsh") {
    invalid("dsh configuration is only supported for YAML.");
  }
  const plan = planJsoncCollection(baseText, root, target, formattingOptions);
  return buildResult(plan.text, synthesized || plan.changed);
}

function jsoncWrite(
  text: string,
  path: JSONPath,
  value: unknown,
  formattingOptions: FormattingOptions,
): string {
  return applyJsoncEdits(
    text,
    modifyJsonc(text, path, value, { formattingOptions }),
  );
}

function planJsoncCollection(
  baseText: string,
  root: unknown,
  target: ConfigTarget,
  formattingOptions: FormattingOptions,
): JsoncPlan {
  const collection = target.collection;
  if (collection.length > 0) requireObjectParents(root, collection);
  const container = getPath(root, collection);

  if (target.kind === "map") {
    if (!isPlainObject(root))
      invalid("Configuration root must be a JSON object.");
    if (container !== undefined && !isPlainObject(container)) {
      invalid(
        "Configuration path '" +
          collection.join(".") +
          "' is not a JSON object.",
      );
    }
    const existing = isPlainObject(container)
      ? container[serverName]
      : undefined;
    if (existing !== undefined && !isPlainObject(existing)) {
      invalid("Existing '" + serverName + "' entry is not a JSON object.");
    }
    if (existing === undefined) {
      return {
        text: jsoncWrite(
          baseText,
          [...collection, serverName],
          target.entry,
          formattingOptions,
        ),
        changed: true,
      };
    }
    const merged = mergeEntry(existing, target.entry);
    const changed = !isDeepStrictEqual(existing, merged);
    let text = baseText;
    if (changed) {
      for (const key of Object.keys(existing)) {
        if (!Object.prototype.hasOwnProperty.call(merged, key)) {
          text = jsoncWrite(
            text,
            [...collection, serverName, key],
            undefined,
            formattingOptions,
          );
        }
      }
      for (const [key, value] of Object.entries(merged)) {
        if (!isDeepStrictEqual(existing[key], value)) {
          text = jsoncWrite(
            text,
            [...collection, serverName, key],
            value,
            formattingOptions,
          );
        }
      }
    }
    return { text, changed };
  }

  if (collection.length === 0) {
    if (!Array.isArray(root))
      invalid("Configuration root must be a JSON array.");
  } else if (!isPlainObject(root)) {
    invalid("Configuration root must be a JSON object.");
  }
  if (container !== undefined && !Array.isArray(container)) {
    invalid(
      "Configuration path '" + collection.join(".") + "' is not a JSON array.",
    );
  }
  const nameKey = nameKeyOf(target);
  const wanted = arrayEntryName(target);
  const list = Array.isArray(container) ? container : undefined;
  const matches: number[] = [];
  list?.forEach((element, index) => {
    if (isPlainObject(element) && element[nameKey] === wanted)
      matches.push(index);
  });
  if (matches.length > 1) {
    invalid(
      "Configuration already contains multiple '" +
        String(wanted) +
        "' entries.",
    );
  }
  const index = matches.length === 1 ? matches[0]! : -1;
  if (index === -1) {
    const insertIndex = list ? list.length : 0;
    return {
      text: jsoncWrite(
        baseText,
        [...collection, insertIndex],
        target.entry,
        formattingOptions,
      ),
      changed: true,
    };
  }
  const existing = list![index] as Record<string, unknown>;
  if (!isPlainObject(existing)) {
    invalid("Existing '" + String(wanted) + "' entry is not a JSON object.");
  }
  const merged = mergeEntry(existing, target.entry);
  const changed = !isDeepStrictEqual(existing, merged);
  let text = baseText;
  if (changed) {
    for (const key of Object.keys(existing)) {
      if (!Object.prototype.hasOwnProperty.call(merged, key)) {
        text = jsoncWrite(
          text,
          [...collection, index, key],
          undefined,
          formattingOptions,
        );
      }
    }
    for (const [key, value] of Object.entries(merged)) {
      if (!isDeepStrictEqual(existing[key], value)) {
        text = jsoncWrite(
          text,
          [...collection, index, key],
          value,
          formattingOptions,
        );
      }
    }
  }
  return { text, changed };
}

/* -------------------------------------------------------------------------- */
/* TOML                                                                       */
/* -------------------------------------------------------------------------- */

function editToml(
  text: string | undefined,
  target: ConfigTarget,
): EditConfigurationResult {
  const input = text ?? "";
  const synthesized = text === undefined;
  let baseText: string;
  let root: unknown;
  if (synthesized) {
    root = initialValue(target);
    baseText = stringifyToml(root);
  } else {
    try {
      root = parseToml(input);
    } catch {
      invalid("Existing TOML configuration could not be parsed.");
    }
    baseText = input;
  }
  if (!isPlainObject(root)) invalid("TOML configuration root must be a table.");
  if (target.kind === "dsh")
    invalid("dsh configuration cannot be edited as TOML.");

  const plan =
    target.kind === "map"
      ? planTomlMap(root, target)
      : planTomlArray(root, target);
  const edited = plan.changed ? patchToml(baseText, root) : baseText;
  return buildResult(edited, synthesized || plan.changed);
}

function planTomlMap(
  root: Record<string, unknown>,
  target: ConfigTarget,
): ChangePlan {
  const collection = target.collection;
  if (collection.length > 0) requireObjectParents(root, collection);
  const container = getPath(root, collection);
  if (container !== undefined && !isPlainObject(container)) {
    invalid(
      "Configuration path '" + collection.join(".") + "' is not a TOML table.",
    );
  }
  const existing = isPlainObject(container) ? container[serverName] : undefined;
  if (existing !== undefined && !isPlainObject(existing)) {
    invalid("Existing '" + serverName + "' entry is not a TOML table.");
  }
  if (existing === undefined) {
    setPath(root, [...collection, serverName], structuredClone(target.entry));
    return { changed: true };
  }
  const merged = mergeEntry(existing, target.entry);
  const changed = !isDeepStrictEqual(existing, merged);
  if (changed) setPath(root, [...collection, serverName], merged);
  return { changed };
}

function planTomlArray(
  root: Record<string, unknown>,
  target: ConfigTarget,
): ChangePlan {
  const collection = target.collection;
  if (collection.length === 0) {
    invalid("TOML configuration cannot use a root array.");
  }
  requireObjectParents(root, collection);
  const container = getPath(root, collection);
  if (container !== undefined && !Array.isArray(container)) {
    invalid(
      "Configuration path '" +
        collection.join(".") +
        "' is not a TOML array of tables.",
    );
  }
  const nameKey = nameKeyOf(target);
  const wanted = arrayEntryName(target);
  const list = Array.isArray(container) ? container : undefined;
  const matches: number[] = [];
  list?.forEach((element, index) => {
    if (isPlainObject(element) && element[nameKey] === wanted)
      matches.push(index);
  });
  if (matches.length > 1) {
    invalid(
      "Configuration already contains multiple '" +
        String(wanted) +
        "' entries.",
    );
  }
  const index = matches.length === 1 ? matches[0]! : -1;
  if (index === -1) {
    const array = list ?? createArray(root, collection);
    array.push(structuredClone(target.entry));
    return { changed: true };
  }
  const existing = list![index] as Record<string, unknown>;
  if (!isPlainObject(existing)) {
    invalid("Existing '" + String(wanted) + "' entry is not a TOML table.");
  }
  const merged = mergeEntry(existing, target.entry);
  const changed = !isDeepStrictEqual(existing, merged);
  if (changed) list![index] = merged;
  return { changed };
}

function createArray(
  root: Record<string, unknown>,
  path: readonly string[],
): unknown[] {
  const array: unknown[] = [];
  setPath(root, path, array);
  return array;
}

/* -------------------------------------------------------------------------- */
/* YAML                                                                       */
/* -------------------------------------------------------------------------- */

function editYaml(
  text: string | undefined,
  target: ConfigTarget,
): EditConfigurationResult {
  const input = text ?? "";
  const synthesized = text === undefined;
  let doc: Document;
  if (synthesized) {
    doc = new Document(initialValue(target));
  } else {
    doc = parseDocument(input);
    if (doc.errors.length > 0) {
      const error = doc.errors[0]!;
      const position = error.linePos?.[0];
      invalid(
        "Existing YAML configuration could not be parsed (" +
          error.code +
          (position
            ? " at line " + position.line + ", column " + position.col
            : "") +
          ").",
      );
    }
  }

  const plan =
    target.kind === "dsh"
      ? planYamlDsh(doc, doc.contents, target)
      : planYamlCollection(doc, doc.contents, target);
  const edited = synthesized || plan.changed ? doc.toString() : input;
  return buildResult(edited, synthesized || plan.changed);
}

function newMapNode(doc: Document): YAMLMap {
  return doc.createNode({}) as unknown as YAMLMap;
}

function newSeqNode(doc: Document): YAMLSeq {
  return doc.createNode([]) as unknown as YAMLSeq;
}

function asYamlNode(value: unknown): YamlNode | undefined {
  if (value === null || value === undefined) return undefined;
  if (isAlias(value) || isScalar(value) || isMap(value) || isSeq(value)) {
    return value;
  }
  return undefined;
}

function yamlFindPair(map: YAMLMap, key: string): YamlPair | undefined {
  return map.items.find((pair) => isScalar(pair.key) && pair.key.value === key);
}

function yamlMapGetNode(map: YAMLMap, key: string): YamlNode | undefined {
  const pair = yamlFindPair(map, key);
  return pair === undefined ? undefined : asYamlNode(pair.value);
}

function yamlScalarValue(map: YAMLMap, key: string): unknown {
  const node = yamlMapGetNode(map, key);
  return node !== undefined && isScalar(node) ? node.value : undefined;
}

function yamlMapIsRemote(map: YAMLMap): boolean {
  if (yamlFindPair(map, "url") !== undefined) return true;
  const type = yamlScalarValue(map, "type");
  return (
    typeof type === "string" && REMOTE_TRANSPORT_TYPES.has(type.toLowerCase())
  );
}

function yamlChildMap(
  doc: Document,
  map: YAMLMap,
  key: string,
  label: string,
): YAMLMap {
  const node = yamlMapGetNode(map, key);
  if (node === undefined) {
    const created = newMapNode(doc);
    map.set(key, created);
    return created;
  }
  if (isMap(node)) return node;
  invalid("Configuration path '" + label + "' is not a mapping.");
}

function planYamlCollection(
  doc: Document,
  contents: YamlNode | null,
  target: ConfigTarget,
): ChangePlan {
  if (target.kind === "map") {
    if (!isMap(contents)) invalid("Configuration root must be a mapping.");
    let map: YAMLMap = contents;
    for (const segment of target.collection) {
      map = yamlChildMap(doc, map, segment, target.collection.join("."));
    }
    const pair = yamlFindPair(map, serverName);
    const existing = pair === undefined ? undefined : asYamlNode(pair.value);
    if (existing !== undefined && !isMap(existing)) {
      invalid("Existing '" + serverName + "' entry is not a mapping.");
    }
    if (existing === undefined) {
      map.set(serverName, doc.createNode(target.entry));
      return { changed: true };
    }
    const changed = applyYamlEntry(doc, existing, target.entry);
    return { changed };
  }

  let seq: YAMLSeq;
  if (target.collection.length === 0) {
    if (!isSeq(contents)) invalid("Configuration root must be a sequence.");
    seq = contents;
  } else {
    if (!isMap(contents)) invalid("Configuration root must be a mapping.");
    let map: YAMLMap = contents;
    const path = target.collection;
    for (let index = 0; index < path.length - 1; index += 1) {
      map = yamlChildMap(doc, map, path[index]!, path.join("."));
    }
    const last = path[path.length - 1]!;
    const node = yamlMapGetNode(map, last);
    if (node === undefined) {
      const created = newSeqNode(doc);
      map.set(last, created);
      seq = created;
    } else if (isSeq(node)) {
      seq = node;
    } else {
      invalid("Configuration path '" + path.join(".") + "' is not a sequence.");
      seq = newSeqNode(doc);
    }
  }

  const nameKey = nameKeyOf(target);
  const wanted = arrayEntryName(target);
  const matches: number[] = [];
  seq.items.forEach((item, index) => {
    const node = asYamlNode(item);
    if (
      node !== undefined &&
      isMap(node) &&
      yamlScalarValue(node, nameKey) === wanted
    ) {
      matches.push(index);
    }
  });
  if (matches.length > 1) {
    invalid(
      "Configuration already contains multiple '" +
        String(wanted) +
        "' entries.",
    );
  }
  const index = matches.length === 1 ? matches[0]! : -1;
  if (index === -1) {
    seq.add(doc.createNode(target.entry));
    return { changed: true };
  }
  const existing = asYamlNode(seq.items[index]);
  if (existing === undefined || !isMap(existing)) {
    invalid("Existing '" + String(wanted) + "' entry is not a mapping.");
  }
  const changed = applyYamlEntry(doc, existing, target.entry);
  return { changed };
}

function planYamlDsh(
  doc: Document,
  contents: YamlNode | null,
  target: ConfigTarget,
): ChangePlan {
  if (!isSeq(contents)) invalid("dsh configuration root must be a sequence.");
  const insertKey = target.collection[0] ?? "insert";
  const id = dshEntryId(target);

  const lists: YAMLSeq[] = [];
  for (const item of contents.items) {
    const node = asYamlNode(item);
    if (
      node === undefined ||
      !isMap(node) ||
      yamlFindPair(node, insertKey) === undefined
    ) {
      continue;
    }
    const value = yamlMapGetNode(node, insertKey);
    if (value === undefined || !isSeq(value)) {
      invalid("dsh '" + insertKey + "' entry must be a sequence.");
    }
    lists.push(value);
  }

  let matchedList: YAMLSeq | undefined;
  let matchedIndex = -1;
  let matches = 0;
  for (const list of lists) {
    list.items.forEach((item, index) => {
      const node = asYamlNode(item);
      if (
        node !== undefined &&
        isMap(node) &&
        yamlScalarValue(node, "id") === id
      ) {
        matches += 1;
        if (matches === 1) {
          matchedList = list;
          matchedIndex = index;
        }
      }
    });
  }
  if (matches > 1) {
    invalid(
      "dsh configuration has multiple plugins with id '" + String(id) + "'.",
    );
  }

  if (matchedList !== undefined) {
    const existing = asYamlNode(matchedList.items[matchedIndex]);
    if (existing === undefined || !isMap(existing)) {
      invalid("Existing dsh plugin '" + String(id) + "' is not a mapping.");
    }
    const changed = applyYamlEntry(doc, existing, target.entry);
    return { changed };
  }

  const pluginName = target.entry["name"];
  const destination =
    (pluginName === undefined
      ? undefined
      : lists.find((list) =>
          list.items.some((item) => {
            const node = asYamlNode(item);
            return isMap(node) && yamlScalarValue(node, "name") === pluginName;
          }),
        )) ?? lists[0];
  if (destination === undefined) {
    const created = newSeqNode(doc);
    const element = newMapNode(doc);
    element.set(insertKey, created);
    contents.add(element);
    created.add(doc.createNode(target.entry));
  } else {
    destination.add(doc.createNode(target.entry));
  }
  return { changed: true };
}

function applyYamlEntry(
  doc: Document,
  map: YAMLMap,
  desired: Record<string, unknown>,
): boolean {
  let changed = false;
  if (isProcessDescriptor(desired) && yamlMapIsRemote(map)) {
    for (const pair of [...map.items]) {
      const key = isScalar(pair.key) ? pair.key.value : undefined;
      if (
        typeof key === "string" &&
        !Object.prototype.hasOwnProperty.call(desired, key)
      ) {
        map.delete(key);
        changed = true;
      }
    }
  }
  for (const [key, value] of Object.entries(desired)) {
    const pair = yamlFindPair(map, key);
    const existing = pair === undefined ? undefined : asYamlNode(pair.value);
    if (existing !== undefined && isPlainObject(value) && isMap(existing)) {
      if (applyYamlEntry(doc, existing, value)) changed = true;
    } else if (yamlMatches(doc, existing, value)) {
      /* desired subset already present */
    } else if (
      existing !== undefined &&
      isScalar(existing) &&
      !isOpaqueScalar(existing) &&
      !isPlainObject(value) &&
      !Array.isArray(value)
    ) {
      // Update scalars in place so inline comments and anchors survive.
      existing.value = value;
      changed = true;
    } else {
      const created = doc.createNode(value);
      copyNodeMetadata(existing, created);
      map.set(key, created);
      changed = true;
    }
  }
  return changed;
}

/** Carry comments, blank-line spacing and anchors onto a replacement node. */
function copyNodeMetadata(from: YamlNode | undefined, to: YamlNode): void {
  if (from === undefined) return;
  if (from.comment != null) to.comment = from.comment;
  if (from.commentBefore != null) to.commentBefore = from.commentBefore;
  if (from.spaceBefore != null) to.spaceBefore = from.spaceBefore;
  if (from.anchor != null) to.anchor = from.anchor;
}

const CORE_SCALAR_TAGS = new Set([
  "tag:yaml.org,2002:str",
  "tag:yaml.org,2002:bool",
  "tag:yaml.org,2002:int",
  "tag:yaml.org,2002:float",
  "tag:yaml.org,2002:null",
]);

function isOpaqueScalar(node: YamlNode): boolean {
  return (
    isScalar(node) &&
    typeof node.tag === "string" &&
    !CORE_SCALAR_TAGS.has(node.tag)
  );
}

function yamlMatches(
  doc: Document,
  node: YamlNode | undefined,
  value: unknown,
): boolean {
  if (node === undefined) return false;
  if (isAlias(node)) {
    const resolved = node.resolve(doc);
    return resolved !== undefined && yamlMatches(doc, resolved, value);
  }
  if (isPlainObject(value)) {
    if (!isMap(node)) return false;
    return Object.entries(value).every(([key, child]) =>
      yamlMatches(doc, yamlMapGetNode(node, key), child),
    );
  }
  if (Array.isArray(value)) {
    if (!isSeq(node) || node.items.length !== value.length) return false;
    return value.every((child, index) =>
      yamlMatches(doc, asYamlNode(node.items[index]), child),
    );
  }
  if (isScalar(node)) {
    if (isOpaqueScalar(node)) return false;
    return isDeepStrictEqual(node.value, value);
  }
  return false;
}
