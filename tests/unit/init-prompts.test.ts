import { ExitPromptError } from "@inquirer/core";
import { afterEach, describe, expect, test, vi } from "vitest";
import {
  applyMultiSelectKey,
  choiceLayout,
  createMultiSelectState,
  defaultInitPrompts,
  displayWidth,
  hasSelection,
  printableInput,
  truncateToWidth,
  viewport,
  type KeyInput,
  type MultiSelectState,
} from "../../src/consumer/init/prompts.js";
import { InitError, type InitChoice } from "../../src/consumer/init/types.js";

const mocks = vi.hoisted(() => ({
  select: vi.fn(),
  confirm: vi.fn(),
  prompt: vi.fn(),
}));

vi.mock("@inquirer/select", () => ({ default: mocks.select }));
vi.mock("@inquirer/confirm", () => ({ default: mocks.confirm }));
vi.mock("@inquirer/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@inquirer/core")>();
  return {
    ...actual,
    createPrompt:
      () =>
      (config: unknown, context: unknown): unknown =>
        mocks.prompt(config, context),
  };
});

interface SelectChoice {
  name: string;
  value: string;
  description?: string;
  disabled?: boolean | string;
}

interface SelectCall {
  config: {
    message: string;
    default?: string;
    choices: SelectChoice[];
  };
  context: { output?: unknown };
}

function lastSelectCall(): SelectCall {
  const call = mocks.select.mock.calls.at(-1);
  if (!call) throw new Error("select was not called");
  return {
    config: call[0] as SelectCall["config"],
    context: call[1] as SelectCall["context"],
  };
}

const harnesses: InitChoice[] = [
  {
    name: "Claude Code",
    value: "claude-code",
    description: "Anthropic terminal",
  },
  {
    name: "Gemini CLI",
    value: "gemini-cli",
    description: "Google terminal",
  },
  {
    name: "GitHub Copilot",
    value: "github-copilot",
    description: "GitHub assistant",
  },
  { name: "Cursor", value: "cursor", disabled: "no verified entry" },
];

function press(
  state: MultiSelectState,
  key: KeyInput,
  choices: readonly InitChoice[] = harnesses,
): MultiSelectState {
  return applyMultiSelectKey(state, key, choices);
}

function type(state: MultiSelectState, text: string): MultiSelectState {
  let next = state;
  for (const character of text) next = press(next, { name: character });
  return next;
}

describe("searchable multi-select state", () => {
  test("starts with no selection and cannot complete", () => {
    const state = createMultiSelectState();
    expect(state).toEqual({ search: "", selected: [], cursor: 0 });
    expect(hasSelection(state)).toBe(false);
  });

  test("space toggles the highlighted choice", () => {
    let state = press(createMultiSelectState(), { name: "space" });
    expect(state.selected).toEqual(["claude-code"]);
    state = press(state, { name: "space" });
    expect(state.selected).toEqual([]);
  });

  test("keeps selection when the chosen item leaves the filtered set", () => {
    let state = press(createMultiSelectState(), { name: "space" });
    state = type(state, "gem");
    expect(state.search).toBe("gem");
    expect(state.selected).toEqual(["claude-code"]);
    state = press(state, { name: "space" });
    expect(state.selected).toEqual(["claude-code", "gemini-cli"]);
  });

  test("matches name, id and description ignoring case", () => {
    const selectFirst = (term: string) =>
      press(type(createMultiSelectState(), term), { name: "space" }).selected;
    expect(selectFirst("gemini")).toEqual(["gemini-cli"]);
    expect(selectFirst("github-copilot")).toEqual(["github-copilot"]);
    expect(selectFirst("ANTHROPIC")).toEqual(["claude-code"]);
  });

  test("shows disabled choices but cannot select them", () => {
    let state = createMultiSelectState();
    for (let index = 0; index < 3; index++) {
      state = press(state, { name: "down" });
    }
    expect(state.cursor).toBe(3);
    expect(press(state, { name: "space" }).selected).toEqual([]);
  });

  test("keeps the cursor bounded when nothing matches", () => {
    let state = type(createMultiSelectState(), "zzz");
    expect(state.cursor).toBe(0);
    state = press(state, { name: "down" });
    expect(state.cursor).toBe(0);
    state = press(state, { name: "up" });
    expect(state.cursor).toBe(0);
    expect(press(state, { name: "space" }).selected).toEqual([]);
  });

  test("clamps the cursor to the filtered rows", () => {
    const state = type(createMultiSelectState(), "gemini");
    expect(press(state, { name: "down" }).cursor).toBe(0);
  });

  test("backspace shortens the search and is a no-op when empty", () => {
    const narrowed = press(
      press(type(createMultiSelectState(), "cli"), { name: "backspace" }),
      { name: "space" },
    );
    expect(narrowed.selected).toEqual(["claude-code"]);
    const direct = press(type(createMultiSelectState(), "cli"), {
      name: "space",
    });
    expect(direct.selected).toEqual(["gemini-cli"]);
    const empty = createMultiSelectState();
    expect(press(empty, { name: "backspace" })).toBe(empty);
  });

  test("accepts printable unicode and pasted text but not control keys", () => {
    expect(printableInput({ sequence: "A" })).toBe("A");
    expect(printableInput({ name: "a" })).toBe("a");
    expect(printableInput({ name: "中" })).toBe("中");
    expect(printableInput({ name: "😀" })).toBe("😀");
    expect(printableInput({ sequence: "pasted text" })).toBe("pasted text");
    expect(printableInput({ sequence: "\x1b[A", name: "up" })).toBeUndefined();
    expect(printableInput({ name: "up" })).toBeUndefined();
    expect(printableInput({ name: "a", ctrl: true })).toBeUndefined();
    expect(printableInput({ name: "x", meta: true })).toBeUndefined();
    expect(press(createMultiSelectState(), { name: "中" }).search).toBe("中");
  });

  test("ignores enter so completion stays with the prompt", () => {
    const state = createMultiSelectState();
    expect(press(state, { name: "enter" })).toBe(state);
  });
});

describe("viewport", () => {
  test("uses up to the page size when the terminal is tall", () => {
    expect(viewport(0, 40, 60, 15)).toEqual({ start: 0, count: 15 });
  });

  test("lowers the window to the terminal height", () => {
    expect(viewport(0, 40, 24, 15)).toEqual({ start: 0, count: 9 });
  });

  test("scrolls the window to keep the cursor centered", () => {
    expect(viewport(0, 40, 24, 15)).toEqual({ start: 0, count: 9 });
    expect(viewport(20, 40, 24, 15)).toEqual({ start: 16, count: 9 });
    expect(viewport(39, 40, 24, 15)).toEqual({ start: 31, count: 9 });
  });

  test("always keeps at least one row and handles empty lists", () => {
    expect(viewport(0, 40, 6, 15)).toEqual({ start: 0, count: 1 });
    expect(viewport(0, 0, 24, 15)).toEqual({ start: 0, count: 0 });
    expect(viewport(0, 40, undefined, 15)).toEqual({ start: 0, count: 15 });
  });

  test("budgets one row per choice in the single-row layout", () => {
    expect(viewport(0, 40, 24, 15, 1)).toEqual({ start: 0, count: 15 });
    expect(viewport(0, 40, 24, 15, 2)).toEqual({ start: 0, count: 9 });
  });
});

describe("displayWidth", () => {
  test("counts a fullwidth character as two cells", () => {
    expect(displayWidth("codex")).toBe(5);
    expect(displayWidth("中文")).toBe(4);
  });
});

describe("truncateToWidth", () => {
  test("keeps text that already fits and marks a cut with an ellipsis", () => {
    expect(truncateToWidth("codex", 10)).toBe("codex");
    expect(truncateToWidth("codex", 5)).toBe("codex");
    expect(truncateToWidth("codex", 4)).toBe("cod…");
    expect(truncateToWidth("codex", 3)).toBe("co…");
  });

  test("never exceeds the requested width for fullwidth text", () => {
    const result = truncateToWidth("中文字元", 5);
    expect(displayWidth(result)).toBeLessThanOrEqual(5);
    expect(result.endsWith("…")).toBe(true);
  });
});

describe("choiceLayout", () => {
  const long = (name: string): InitChoice => ({
    name,
    value: name,
    description: "detail",
  });

  test("puts the description beside the name on a normal terminal", () => {
    expect(choiceLayout(harnesses, 100)).toEqual({
      rowsPerChoice: 1,
      labelWidth: 14,
      descriptionWidth: 78,
    });
  });

  test("sizes the label column from the widest name, capped for the column", () => {
    expect(choiceLayout(harnesses, 100).labelWidth).toBe(
      Math.max(...harnesses.map((choice) => displayWidth(choice.name))),
    );
    expect(choiceLayout([long("SourceCraft Code Assistant")], 200)).toEqual({
      rowsPerChoice: 1,
      labelWidth: 26,
      descriptionWidth: 166,
    });
    expect(choiceLayout([long("A".repeat(60))], 200).labelWidth).toBe(28);
  });

  test("falls back to the two-row layout when the description would be too narrow", () => {
    // 2 indent + 4 gutter + 14 label + 2 gap leaves 18 cells at 40, so the
    // layout only has to drop below that budget.
    expect(choiceLayout(harnesses, 40).rowsPerChoice).toBe(1);
    const narrow = choiceLayout(harnesses, 33);
    expect(narrow.rowsPerChoice).toBe(2);
    expect(narrow.descriptionWidth).toBe(0);
  });

  test("assumes a default width when stderr reports none", () => {
    expect(choiceLayout(harnesses, undefined)).toEqual(
      choiceLayout(harnesses, 80),
    );
  });
});

describe("defaultInitPrompts", () => {
  afterEach(() => {
    mocks.select.mockReset();
    mocks.confirm.mockReset();
    mocks.prompt.mockReset();
  });

  test("disables project scope and defaults to global without project support", async () => {
    mocks.select.mockResolvedValue("global");
    const scope = await defaultInitPrompts.selectScope({
      message: "Choose configuration scope",
      projectDisabled: true,
      projectDescription: "Skipped in project scope: Cursor",
    });
    expect(scope).toBe("global");
    const { config, context } = lastSelectCall();
    expect(context.output).toBe(process.stderr);
    expect(config.default).toBe("global");
    expect(config.choices.find((c) => c.value === "project")).toMatchObject({
      disabled: "Skipped in project scope: Cursor",
    });
    expect(
      config.choices.find((c) => c.value === "global")?.disabled,
    ).toBeFalsy();
  });

  test("keeps project scope selectable and default when supported", async () => {
    mocks.select.mockResolvedValue("project");
    await defaultInitPrompts.selectScope({
      message: "Choose configuration scope",
      projectDisabled: false,
      projectDescription: "Current directory: /tmp/work",
    });
    const { config } = lastSelectCall();
    expect(config.default).toBe("project");
    expect(config.choices.find((c) => c.value === "project")).toMatchObject({
      disabled: false,
      description: "Current directory: /tmp/work",
    });
  });

  test("confirmation forwards the default and writes to stderr", async () => {
    mocks.confirm.mockResolvedValue(false);
    const answer = await defaultInitPrompts.confirm({
      message: "Apply this MCP configuration?",
      default: false,
    });
    expect(answer).toBe(false);
    const call = mocks.confirm.mock.calls.at(-1);
    expect(call?.[0]).toMatchObject({ default: false });
    expect(call?.[1]).toMatchObject({ output: process.stderr });
  });

  test("passes choices and stderr context through multi-select", async () => {
    mocks.prompt.mockResolvedValue(["claude-code"]);
    const selected = await defaultInitPrompts.multiSelect({
      message: "Select harnesses to configure",
      choices: harnesses,
    });
    expect(selected).toEqual(["claude-code"]);
    const call = mocks.prompt.mock.calls.at(-1);
    expect(call?.[0]).toMatchObject({
      message: "Select harnesses to configure",
    });
    expect((call?.[0] as { choices: InitChoice[] }).choices).toHaveLength(4);
    expect(call?.[1]).toMatchObject({ output: process.stderr });
  });

  test("turns cancellation into an InitError", async () => {
    mocks.select.mockRejectedValue(new ExitPromptError("SIGINT"));
    await expect(
      defaultInitPrompts.selectScope({
        message: "scope",
        projectDisabled: false,
        projectDescription: "here",
      }),
    ).rejects.toMatchObject({ name: "InitError", code: "cancelled" });

    mocks.confirm.mockRejectedValue(new ExitPromptError("SIGINT"));
    await expect(
      defaultInitPrompts.confirm({ message: "apply", default: false }),
    ).rejects.toBeInstanceOf(InitError);

    mocks.prompt.mockRejectedValue(new ExitPromptError("SIGINT"));
    await expect(
      defaultInitPrompts.multiSelect({ message: "select", choices: [] }),
    ).rejects.toBeInstanceOf(InitError);
  });
});
