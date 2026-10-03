import { Command } from "commander";
import {
  finishMonitorSession,
  startMonitorSession,
} from "../src/sources/monitor-session.js";

try {
  const command = new Command();
  command
    .command("start")
    .requiredOption("--owner-pid <pid>")
    .action(async (options: { ownerPid: string }) => {
      process.stdout.write(
        `${JSON.stringify(await startMonitorSession(process.cwd(), Number(options.ownerPid)))}\n`,
      );
    });
  command
    .command("finish")
    .argument("<id>")
    .action(async (id: string) => {
      await finishMonitorSession(process.cwd(), id);
      process.stdout.write(`${JSON.stringify({ finished: id })}\n`);
    });
  await command.parseAsync();
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
}
