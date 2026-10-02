import { spawn } from "node:child_process";
import { realpath } from "node:fs/promises";
import path from "node:path";

export async function npmCli(): Promise<string> {
  for (const directory of (process.env.PATH ?? "").split(path.delimiter)) {
    try {
      const executable = await realpath(
        path.join(directory, process.platform === "win32" ? "npm.cmd" : "npm"),
      );
      return process.platform === "win32"
        ? path.join(path.dirname(executable), "node_modules/npm/bin/npm-cli.js")
        : executable;
    } catch {
      /* Search the next PATH entry. */
    }
  }
  throw new Error("npm is required for consumer artifact verification.");
}

export function runNode(
  args: string[],
  cwd: string,
  env: NodeJS.ProcessEnv = process.env,
  expected = 0,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd,
      env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "",
      stderr = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error("Consumer check timed out."));
    }, 60_000);
    child.stdout.on("data", (data) => {
      stdout += String(data);
    });
    child.stderr.on("data", (data) => {
      stderr += String(data);
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code !== expected)
        reject(new Error(`Consumer check exited ${code}: ${stderr}`));
      else resolve(stdout);
    });
  });
}
