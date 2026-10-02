function ordered(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(ordered);
  if (value !== null && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b, "en"))
        .map(([key, item]) => [key, ordered(item)]),
    );
  return value;
}

export const canonical = (value: unknown): string =>
  `${JSON.stringify(ordered(value), null, 2)}\n`;
