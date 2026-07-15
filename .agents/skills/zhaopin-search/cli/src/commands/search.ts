import { fetchWithRetry, parseJobItems, writeError } from "../helpers";
import type { JobResult } from "../helpers";

interface SearchOptions {
  query: string;
  location?: string;
  page: number;
  limit: number;
  format: "json" | "table" | "plain";
}

function parseArgs(args: string[]): SearchOptions | null {
  const opts: SearchOptions = { query: "", page: 1, limit: 20, format: "json" };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--query": case "-q":
        opts.query = args[++i] || "";
        break;
      case "--location": case "-l":
        opts.location = args[++i];
        break;
      case "--page": case "-p":
        opts.page = parseInt(args[++i], 10) || 1;
        break;
      case "--limit":
        opts.limit = parseInt(args[++i], 10) || 20;
        break;
      case "--format": case "-f":
        opts.format = (args[++i] as "json" | "table" | "plain") || "json";
        break;
      case "--help": case "-h":
        console.log(`Search jobs on Zhaopin

Options:
  --query, -q       Search keywords (required)
  --location, -l    City or region
  --page, -p        Page number (default: 1)
  --limit          Max results (default: 20)
  --format, -f     Output format: json, table, plain (default: json)
  --help, -h       Show help
`);
        return null;
      default:
        if (!opts.query) opts.query = args[i];
    }
  }
  if (!opts.query) {
    writeError("Search query is required. Use --query or -q.", "MISSING_QUERY");
    return null;
  }
  return opts;
}

function formatTable(results: JobResult[]): string {
  const header = "TITLE | COMPANY | SALARY | LOCATION";
  const sep = "-----|---------|--------|----------";
  const rows = results.map((r) =>
    [r.title || "-", r.company || "-", r.salary || "-", r.location || "-"].join(" | ")
  );
   return [header, sep, ...rows].join("\n");
}

export async function searchCommand(args: string[]): Promise<void> {
  const opts = parseArgs(args);
  if (!opts) { process.exit(opts === null ? 0 : 1); return; }

  const queryEnc = encodeURIComponent(opts.query);
  let url = `https://www.zhaopin.com/sou/?kw=${queryEnc}`;
  if (opts.location) {
    url += `&city=${encodeURIComponent(opts.location)}`;
  }
  if (opts.page > 1) {
    url += `&p=${opts.page}`;
  }

  const html = await fetchWithRetry(url);
  if (!html) {
    writeError("Failed to fetch search results.", "FETCH_FAILED");
    process.exit(1);
    return;
  }

  const allResults = parseJobItems(html);
  const results = allResults.slice(0, opts.limit);
  const output = {
    meta: { count: allResults.length, page: opts.page },
    results,
  };

  switch (opts.format) {
    case "json":
      console.log(JSON.stringify(output, null, 2));
      break;
    case "table":
      console.log(formatTable(results));
      break;
    case "plain":
      for (const r of results) {
        console.log(`Title: ${r.title}`);
        console.log(`Company: ${r.company}`);
        console.log(`Salary: ${r.salary}`);
        console.log(`Location: ${r.location}`);
        console.log(`URL: ${r.url}`);
        if (r.experience) console.log(`Experience: ${r.experience}`);
        if (r.education) console.log(`Education: ${r.education}`);
        console.log();
      }
      break;
  }
}
