import { Command } from "commander";
import { verifyOnlineDeployment } from "../src/compiler/online-site.js";

try {
  const command = new Command()
    .argument("<directory>", "Complete deployment directory")
    .parse();
  const directory = command.args[0]!;
  process.stdout.write(
    `${JSON.stringify(await verifyOnlineDeployment(directory))}\n`,
  );
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
}
