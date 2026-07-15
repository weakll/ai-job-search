import { fetchWithRetry, parseJobDetail, writeError } from "../helpers";

function parseArgs(args: string[]): { id: string; format: string } | null {
  let id = "";
  let format = "plain";
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--id":
        id = args[++i] || "";
        break;
      case "--format": case "-f":
        format = args[++i] || "plain";
        break;
      case "--help": case "-h":
        console.log(`Get job detail from Zhaopin

Options:
  --id              Job ID (required)
  --format, -f      Output format: json, plain (default: plain)
  --help, -h        Show help
`);
        return null;
      default:
        if (!id) id = args[i];
    }
  }
  if (!id) {
    writeError("Job ID is required. Use --id.", "MISSING_ID");
    return null;
  }
  return { id, format };
}

export async function detailCommand(args: string[]): Promise<void> {
  const opts = parseArgs(args);
  if (!opts) { process.exit(opts === null ? 0 : 1); return; }

  const url = `https://www.zhaopin.com/jobdetail/${opts.id}.htm`;
  const html = await fetchWithRetry(url);
  if (!html) {
    writeError("Failed to fetch job detail.", "FETCH_FAILED");
    process.exit(1);
    return;
  }

  const description = parseJobDetail(html);

  if (opts.format === "json") {
    console.log(JSON.stringify({ id: opts.id, description }, null, 2));
  } else {
    console.log(description || "No description found.");
  }
}
