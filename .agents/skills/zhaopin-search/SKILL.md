---
name: zhaopin-search
version: 1.0.0
description: >
  Search jobs on Zhaopin (zhaopin.com, ????) - China integrated recruitment platform.
  Trigger phrases: "zhaopin", "????", "zhaopin.com", "zhaopin-search", "??"
context: fork
allowed-tools:
  - Bash(bun run .agents/skills/zhaopin-search/cli/src/cli.ts *)
---

# zhaopin-search: Search jobs on Zhaopin (????)

Searches [Zhaopin (????)](https://www.zhaopin.com), one of China's largest general recruitment platforms. Covers job listings across all industries in China, with roles posted in Chinese.

> ? **Personal use only.** Zhaopin's robots.txt restricts automated access. Keep volume low (infrequent searches, no bulk crawling). This skill is for individual job search use only. The user takes full responsibility for compliance with Zhaopin's Terms of Service.

## Usage

```bash
bun run .agents/skills/zhaopin-search/cli/src/cli.ts <command> [options]
```

## Commands

### search

Search for jobs on Zhaopin.

| Flag | Alias | Description | Default |
|------|-------|-------------|---------|
| `--query` | `-q` | Search keywords (job title, skill, etc.) | *required* |
| `--location` | `-l` | City or region to search in (e.g., "??", "??") | (all locations) |
| `--page` | `-p` | Page number (1-indexed) | 1 |
| `--limit` | | Max results to return (client-side cap) | 20 |
| `--format` | `-f` | Output format: `json`, `table`, `plain` | `json` |

### detail

Get full job description for a specific posting.

| Flag | Alias | Description | Default |
|------|-------|-------------|---------|
| `--id` | | Job ID (from search results) | *required* |
| `--format` | `-f` | Output format: `json`, `plain` | `plain` |

## Examples

```bash
# Search for Java developer jobs in Beijing
bun run src/cli.ts search -q "Java??" -l "??" --limit 5 --format table

# Search for backend roles in Shanghai
bun run src/cli.ts search -q "????" -l "??" --limit 10 --format json

# Get job details
bun run src/cli.ts detail CCL1509518450J40875640914 --format plain
```

## Output format

### search --format json
```json
{
  "meta": { "count": 42, "page": 1 },
  "results": [
    {
      "id": "CCL1509518450J40875640914",
      "title": "JAVA?????",
      "company": "??????????",
      "location": "????????",
      "salary": "1-1.3?",
      "date": null,
      "url": "http://www.zhaopin.com/jobdetail/CCL1509518450J40875640914.htm"
    }
  ]
}
```

### detail --format plain
Returns the full job description as plain text with the company name, job title, and description body.

## Notes

- Zhaopin uses server-rendered HTML; the CLI parses HTML directly.
- Search results are paginated; the `--page` flag controls which page (1-indexed).
- Posting dates are not visible in the HTML structure; the `date` field returns `null`.
- The `--location` filter narrows results by adding `&city=` to the search URL. Use Chinese city names.
- Salaries are displayed as monthly ranges (e.g., "1-1.3?" = 10,000-13,000 CNY/month).
- Rate limit: keep searches infrequent; the site may return captcha challenges under heavy load.
