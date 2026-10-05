// Adapted from OpenSpec 1.5.0 (MIT), src/prompts/searchable-multi-select.ts.
// The ResearchSpec searchable-multi-select adaptation (MIT) informs the layout
// and interaction model. Third-party notice boundaries are recorded in NOTICE.
import {
  AbortPromptError,
  ExitPromptError,
  createPrompt,
  isBackspaceKey,
  isDownKey,
  isEnterKey,
  isSpaceKey,
  isUpKey,
  useKeypress,
  useMemo,
  usePrefix,
  useState,
  type KeypressEvent,
} from "@inquirer/core";
import confirm from "@inquirer/confirm";
import select from "@inquirer/select";
import { styleText, type StyleTextOptions } from "node:util";
import {
  InitError,
  type InitChoice,
  type InitPromptPort,
  type InitScope,
} from "./types.js";

type MultiSelectConfig = Parameters<InitPromptPort["multiSelect"]>[0];
type ScopeConfig = Parameters<InitPromptPort["selectScope"]>[0];
type ConfirmConfig = Parameters<InitPromptPort["confirm"]>[0];

/** Keyboard event as emitted by Inquirer; "sequence" carries pasted text. */
export interface KeyInput {
  name?: string | undefined;
  ctrl?: boolean | undefined;
  shift?: boolean | undefined;
  meta?: boolean | undefined;
  sequence?: string | undefined;
}

export interface MultiSelectState {
  search: string;
  selected: string[];
  cursor: number;
}

export function createMultiSelectState(): MultiSelectState {
  return { search: "", selected: [], cursor: 0 };
}

/** Escape sequences (arrows, function keys, paste markers) and C0/DEL controls. */
function isControlInput(value: string): boolean {
  if (value.startsWith("\x1b")) return true;
  const code = value.codePointAt(0) ?? 0;
  return code < 0x20 || code === 0x7f;
}

/** Printable text for a keypress, or undefined for navigation or control keys. */
export function printableInput(key: KeyInput): string | undefined {
  if (key.ctrl || key.meta) return undefined;
  const sequence = key.sequence ?? "";
  if (sequence && !isControlInput(sequence)) return sequence;
  const name = key.name ?? "";
  return [...name].length === 1 && !isControlInput(name) ? name : undefined;
}

function filterChoices(
  choices: readonly InitChoice[],
  search: string,
): InitChoice[] {
  const term = search.toLowerCase();
  if (!term) return [...choices];
  return choices.filter(
    (choice) =>
      choice.name.toLowerCase().includes(term) ||
      choice.value.toLowerCase().includes(term) ||
      (choice.description?.toLowerCase().includes(term) ?? false),
  );
}

function moveCursor(cursor: number, offset: number, count: number): number {
  if (count <= 0) return 0;
  return Math.min(count - 1, Math.max(0, cursor + offset));
}

/** "  " before the cursor. */
const LABEL_INDENT = 2;
/** cursor + space + selection marker + space. */
const LABEL_GUTTER = 4;
/** Spaces between the label column and the description column. */
const LABEL_GAP = 2;
/** Widest name column worth reserving before descriptions get squeezed. */
const MAX_LABEL_WIDTH = 28;
/** Below this the description is unreadable, so the two-row layout is better. */
const MIN_DESCRIPTION_WIDTH = 12;
/** Assumed width when stderr is not a TTY. */
const DEFAULT_COLUMNS = 80;

/** East Asian Wide and Fullwidth ranges, which occupy two terminal cells. */
const WIDE_CHAR =
  /[\u1100-\u115F\u2E80-\u303E\u3041-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uA000-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE30-\uFE6F\uFF00-\uFF60\uFFE0-\uFFE6]/;

/** Terminal cell width of text, counting a fullwidth character as two. */
export function displayWidth(text: string): number {
  let width = 0;
  for (const character of text) width += WIDE_CHAR.test(character) ? 2 : 1;
  return width;
}

/** Cut text to at most `width` cells, marking a cut with an ellipsis. */
export function truncateToWidth(text: string, width: number): string {
  if (displayWidth(text) <= width) return text;
  if (width <= 1) return "…".slice(0, Math.max(0, width));
  let result = "";
  let used = 0;
  for (const character of text) {
    const step = WIDE_CHAR.test(character) ? 2 : 1;
    if (used + step > width - 1) break;
    result += character;
    used += step;
  }
  return `${result}…`;
}

export interface ChoiceLayout {
  rowsPerChoice: 1 | 2;
  labelWidth: number;
  descriptionWidth: number;
}

/**
 * Column plan for the choice list. The label column is sized from every choice
 * rather than the filtered ones, so typing a search term never shifts the
 * description column sideways.
 */
export function choiceLayout(
  choices: readonly InitChoice[],
  columns: number | undefined,
): ChoiceLayout {
  const labelWidth = Math.min(
    MAX_LABEL_WIDTH,
    Math.max(0, ...choices.map((choice) => displayWidth(choice.name))),
  );
  const descriptionWidth =
    (columns ?? DEFAULT_COLUMNS) -
    LABEL_INDENT -
    LABEL_GUTTER -
    labelWidth -
    LABEL_GAP;
  return descriptionWidth >= MIN_DESCRIPTION_WIDTH
    ? { rowsPerChoice: 1, labelWidth, descriptionWidth }
    : { rowsPerChoice: 2, labelWidth, descriptionWidth: 0 };
}

/**
 * Visible list window for the terminal height. A choice can take a second row
 * for its description, so the row budget covers the layout's lines per entry.
 */
export function viewport(
  cursor: number,
  total: number,
  rows: number | undefined,
  pageSize = 15,
  rowsPerChoice: 1 | 2 = 2,
): { start: number; count: number } {
  const budget =
    rows === undefined ? pageSize : Math.floor((rows - 5) / rowsPerChoice);
  const count = Math.min(Math.max(1, Math.min(pageSize, budget)), total);
  const start = Math.max(
    0,
    Math.min(cursor - Math.floor(count / 2), total - count),
  );
  return { start, count };
}

function toggle(selected: readonly string[], value: string): string[] {
  return selected.includes(value)
    ? selected.filter((item) => item !== value)
    : [...selected, value];
}

export function hasSelection(state: MultiSelectState): boolean {
  return state.selected.length > 0;
}

export function applyMultiSelectKey(
  state: MultiSelectState,
  key: KeyInput,
  choices: readonly InitChoice[],
): MultiSelectState {
  const event = key as KeypressEvent;
  if (isEnterKey(event)) return state;
  const filtered = filterChoices(choices, state.search);
  if (isSpaceKey(event)) {
    const choice = filtered[state.cursor];
    if (!choice || choice.disabled) return state;
    return { ...state, selected: toggle(state.selected, choice.value) };
  }
  if (isBackspaceKey(event)) {
    if (!state.search) return state;
    return { ...state, search: state.search.slice(0, -1), cursor: 0 };
  }
  if (isUpKey(event)) {
    return { ...state, cursor: moveCursor(state.cursor, -1, filtered.length) };
  }
  if (isDownKey(event)) {
    return { ...state, cursor: moveCursor(state.cursor, 1, filtered.length) };
  }
  const text = printableInput(key);
  if (text !== undefined) {
    return { ...state, search: state.search + text, cursor: 0 };
  }
  return state;
}

const stderrStyle: StyleTextOptions = { stream: process.stderr };

function styled(format: Parameters<typeof styleText>[0], text: string): string {
  return styleText(format, text, stderrStyle);
}

const multiSelectPrompt = createPrompt<string[], MultiSelectConfig>(
  (config, done) => {
    const [state, setState] = useState<MultiSelectState>(
      createMultiSelectState,
    );
    const [status, setStatus] = useState<"idle" | "done">("idle");
    const [notice, setNotice] = useState<string | null>(null);
    const prefix = usePrefix({ status });
    const pageSize = config.pageSize ?? 15;
    const filtered = useMemo(
      () => filterChoices(config.choices, state.search),
      [config.choices, state.search],
    );

    useKeypress((key) => {
      if (status === "done") return;
      if (isEnterKey(key)) {
        if (!hasSelection(state)) {
          setNotice("Select at least one item.");
          return;
        }
        setStatus("done");
        done([...state.selected]);
        return;
      }
      setState((current) => applyMultiSelectKey(current, key, config.choices));
      if (notice !== null) setNotice(null);
    });

    if (status === "done") {
      const names = state.selected.map(
        (value) =>
          config.choices.find((choice) => choice.value === value)?.name ??
          value,
      );
      const answer = names.join(", ") || "(none)";
      return (
        prefix +
        " " +
        styled("bold", config.message) +
        " " +
        styled("cyan", answer)
      );
    }

    const layout = choiceLayout(config.choices, process.stderr.columns);
    const { start, count } = viewport(
      state.cursor,
      filtered.length,
      process.stderr.rows,
      pageSize,
      layout.rowsPerChoice,
    );
    const lines = [
      prefix + " " + styled("bold", config.message),
      "  Search: " +
        styled("yellow", "[") +
        (state.search || styled("dim", "type to filter")) +
        styled("yellow", "]"),
    ];
    for (const [index, choice] of filtered
      .slice(start, start + count)
      .entries()) {
      const active = start + index === state.cursor;
      const chosen = state.selected.includes(choice.value);
      const marker = chosen ? styled("green", "◉") : styled("dim", "○");
      const label = choice.disabled
        ? styled("dim", choice.name)
        : active
          ? styled("cyan", choice.name)
          : choice.name;
      const cursor = active ? styled("cyan", "›") : " ";
      if (layout.rowsPerChoice === 1) {
        // The marker already carries selection and the description already
        // carries an unavailable reason, so one row holds name and detail.
        const padding = " ".repeat(
          Math.max(0, layout.labelWidth - displayWidth(choice.name)),
        );
        const description = choice.description
          ? truncateToWidth(choice.description, layout.descriptionWidth)
          : "";
        lines.push(
          "  " +
            cursor +
            " " +
            marker +
            " " +
            label +
            padding +
            "  " +
            styled("dim", description),
        );
        continue;
      }
      const suffix = chosen
        ? styled("dim", " (selected)")
        : choice.disabled
          ? styled("dim", " (unavailable)")
          : "";
      lines.push("  " + cursor + " " + marker + " " + label + suffix);
      if (choice.description) {
        lines.push(styled("dim", "      " + choice.description));
      }
    }
    if (!filtered.length) lines.push(styled("yellow", "  No matches"));
    if (notice !== null) lines.push(styled("red", "  " + notice));
    const footer =
      "  " +
      styled("cyan", "↑↓") +
      " navigate • " +
      styled("cyan", "Space") +
      " toggle • " +
      styled("cyan", "Enter") +
      " confirm • " +
      styled("cyan", "Ctrl+C") +
      " cancel";
    return [lines.join("\n"), footer];
  },
);

async function runPrompt<T>(action: () => Promise<T>): Promise<T> {
  try {
    return await action();
  } catch (error) {
    if (error instanceof ExitPromptError || error instanceof AbortPromptError) {
      throw new InitError("cancelled", "Initialization cancelled.");
    }
    throw error;
  }
}

const stderrContext = (signal?: AbortSignal) => ({
  output: process.stderr,
  ...(signal ? { signal } : {}),
});

export const defaultInitPrompts: InitPromptPort = {
  multiSelect: (config: MultiSelectConfig) =>
    runPrompt(() => multiSelectPrompt(config, stderrContext(config.signal))),
  selectScope: (config: ScopeConfig) =>
    runPrompt(async () => {
      const scope: InitScope = await select<InitScope>(
        {
          message: config.message,
          default: config.projectDisabled ? "global" : "project",
          choices: [
            {
              name: "Project",
              value: "project",
              description: config.projectDescription,
              disabled: config.projectDisabled
                ? config.projectDescription || true
                : false,
            },
            { name: "Global", value: "global" },
          ],
        },
        stderrContext(config.signal),
      );
      return scope;
    }),
  confirm: (config: ConfirmConfig) =>
    runPrompt(() =>
      confirm(
        { message: config.message, default: config.default },
        stderrContext(config.signal),
      ),
    ),
};
