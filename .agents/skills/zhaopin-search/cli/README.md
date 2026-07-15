# Zhaopin (????) Search CLI

A zero-dependency CLI tool for searching jobs on Zhaopin (zhaopin.com), one of China's largest recruitment platforms.

## Commands

- `search`: Search for jobs by keyword and location
- `detail`: Get full job description for a specific posting

## Usage

```bash
bun run src/cli.ts search -q "Java" -l "??" --limit 5 --format table
bun run src/cli.ts detail CCL1509518450J40875640914 --format plain
```
