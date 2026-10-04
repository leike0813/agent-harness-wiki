import { Command } from "commander";
import {
  prepareMaintenanceCandidates,
  checkMaintenanceCandidate,
  planMaintenanceCandidates,
} from "../src/sources/maintenance-candidates.js";

const command = new Command("maintenance:candidates").description(
  "Create isolated product candidates and a reviewable temporary merge; never edit the project dataset.",
);
const output = (result: unknown): void => {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
};
command
  .command("prepare")
  .description(
    "Create a new batch with one independent dataset per registered product.",
  )
  .requiredOption("--root <root>")
  .requiredOption("--out <out>")
  .argument("<products...>")
  .action(
    async (products: string[], options: { root: string; out: string }) => {
      output(await prepareMaintenanceCandidates({ ...options, products }));
    },
  );
command
  .command("check")
  .description(
    "Validate one candidate's ownership, chapter references and audit ledger.",
  )
  .requiredOption("--candidate <root>")
  .action(async (options: { candidate: string }) => {
    output(await checkMaintenanceCandidate(options.candidate));
  });
command
  .command("plan")
  .description(
    "Build a new validated temporary merge and return accepted, rejected and before/after changes.",
  )
  .requiredOption("--batch <batch>")
  .requiredOption("--out <out>")
  .argument("[products...]")
  .action(
    async (products: string[], options: { batch: string; out: string }) => {
      output(
        await planMaintenanceCandidates({
          ...options,
          ...(products.length ? { products } : {}),
        }),
      );
    },
  );
try {
  await command.parseAsync(process.argv);
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
}
