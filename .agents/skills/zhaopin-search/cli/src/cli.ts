import { searchCommand } from "./commands/search";
import { detailCommand } from "./commands/detail";
import { writeError } from "./helpers";

function printHelp(): void {
  console.log(`Zhaopin (????) Search CLI

Usage:
  bun run cli.ts <command> [options]

Commands:
  search     Search for jobs on Zhaopin
  detail     Get full job description

Options:
  --help, -h  Show help

Run "bun run cli.ts <command> --help" for command-specific help.
`);
}

function main(): void {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    printHelp();
    process.exit(0);
  }

  const command = args[0];
  const commandArgs = args.slice(1);

  switch (command) {
    case "search":
      searchCommand(commandArgs);
      break;
    case "detail":
      detailCommand(commandArgs);
      break;
    default:
      writeError(`Unknown command: ${command}`, "UNKNOWN_COMMAND");
      process.exit(1);
  }
}

main();
