import { describe, expect, test } from "vitest";
import {
  defaultCacheRoot,
  parseRetryAfterHeader,
} from "../../src/query/online-client.js";

describe("defaultCacheRoot", () => {
  test("uses an absolute XDG_CACHE_HOME on Linux", () => {
    expect(
      defaultCacheRoot({
        platform: "linux",
        env: { XDG_CACHE_HOME: "/var/cache/user" },
        homedir: "/home/user",
      }),
    ).toBe("/var/cache/user/agent-harness-wiki");
  });

  test("falls back to ~/.cache when XDG_CACHE_HOME is missing or relative", () => {
    for (const env of [{}, { XDG_CACHE_HOME: "" }, { XDG_CACHE_HOME: "cache" }])
      expect(
        defaultCacheRoot({ platform: "linux", env, homedir: "/home/user" }),
      ).toBe("/home/user/.cache/agent-harness-wiki");
  });

  test("uses Library/Caches on macOS", () => {
    expect(
      defaultCacheRoot({
        platform: "darwin",
        env: { XDG_CACHE_HOME: "/ignored" },
        homedir: "/Users/user",
      }),
    ).toBe("/Users/user/Library/Caches/agent-harness-wiki");
  });

  test("uses an absolute LOCALAPPDATA on Windows and keeps spaces", () => {
    expect(
      defaultCacheRoot({
        platform: "win32",
        env: { LOCALAPPDATA: "C:\\Users\\Some User\\AppData\\Local" },
        homedir: "C:\\Users\\Some User",
      }),
    ).toBe("C:\\Users\\Some User\\AppData\\Local\\agent-harness-wiki\\Cache");
  });

  test("falls back to AppData/Local when LOCALAPPDATA is unusable", () => {
    for (const env of [
      {},
      { LOCALAPPDATA: "" },
      { LOCALAPPDATA: "relative\\path" },
    ]) {
      expect(
        defaultCacheRoot({
          platform: "win32",
          env,
          homedir: "C:\\Users\\user",
        }),
      ).toBe("C:\\Users\\user\\AppData\\Local\\agent-harness-wiki\\Cache");
    }
  });
});

describe("parseRetryAfterHeader", () => {
  const now = Date.parse("2026-10-02T00:00:00Z");

  test("reads delta seconds and HTTP dates", () => {
    expect(parseRetryAfterHeader("120", now)).toBe(120_000);
    expect(parseRetryAfterHeader("Fri, 02 Oct 2026 00:01:00 GMT", now)).toBe(
      60_000,
    );
  });

  test("clamps past dates and rejects nonsense", () => {
    expect(parseRetryAfterHeader("Fri, 01 Oct 2026 00:00:00 GMT", now)).toBe(0);
    expect(parseRetryAfterHeader("soon", now)).toBeUndefined();
    expect(parseRetryAfterHeader(null, now)).toBeUndefined();
  });
});
