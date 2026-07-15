# Search Queries for Job Scraper

<!-- SETUP: Customize these queries based on your skills, target roles, and location -->

## Installed portal CLIs (primary for `/scrape`)

A zhaopin-search CLI was generated for this workspace. It can search Zhaopin (????) for Chinese job listings. Use it via:

```bash
cd .agents/skills/zhaopin-search/cli && bun run src/cli.ts search -q "Java" -l "??" --limit 5 --format table
```

`/scrape` discovers every portal skill under `.agents/skills/*/SKILL.md` and runs its CLI first. Shipped country-agnostic CLIs include `linkedin-search` and `freehire-search`; Danish demos and any skill you add with `/add-portal` are included the same way. You do **not** need a matching `site:` line below for those CLIs to run.

The `site:` query templates in this file are the **WebSearch fallback** — for portals without a CLI, company career pages, or when a CLI fails.

## Search Sites

Primary (your market's job boards):

- **zhaopin.com** - Zhaopin (????), China general recruitment; CLI installed at `.agents/skills/zhaopin-search/`
- **zhipin.com** - your market's largest general job board
- **linkedin.com/jobs** - LinkedIn job listings (filter: China / Baotou); also covered by `linkedin-search` CLI
- **liepin.com** - a niche/industry board for your field (optional)
- **zhaopin.com** - another major board for your market (optional)

Secondary (company career pages via Google):
- Direct Google searches with `site:` filters for known target companies

## Query Categories

Queries are grouped by priority. Each query should be combined with your location terms (e.g. your city, region, or metro area) where the site supports it.

### Priority 1: Java Backend Developer

These match your strongest and most desired career direction.

```
site:zhipin.com "Javaå¼å" Baotou
site:zhipin.com SpringBoot 北京 上海 杭州
site:linkedin.com/jobs "Java Developer" China
```

### Priority 2: E-commerce / Backend Systems

These match your domain expertise.

```
site:zhipin.com åç«¯å¼å Baotou OR åèå¤
site:zhipin.com å¾®æå¡ China
site:linkedin.com/jobs åç«¯å¼å Baotou China
```

### Priority 3: System Integration Engineer

Adjacent roles you could pivot into.

```
site:zhipin.com SpringBoot 北京 上海 杭州
site:zhipin.com SpringBoot 北京 上海 杭州
```

### Priority 4: Broader Technical / Consulting

Wider net for general technical roles.

```
site:zhipin.com SpringBoot developer 北京 上海 杭州
site:linkedin.com/jobs "SpringBoot developer" China
site:zhipin.com "technical consultant" çµå Baotou
```

## Location Filter

When evaluating results, verify the job location is within reasonable commute distance from your home. Define acceptable areas:
- Baotou and surrounding areas
- Hohhot - ~2h by transit
- Ordos - ~1h by transit
- [BORDERLINE_AREA] (borderline - ~X min by transit)
- Other provinces without relocation

## Date Filter

Only include jobs posted within the last 14 days, or with an application deadline that has not yet passed. If a posting date cannot be determined, include it but flag as "date unknown".

## Adapting Queries

If the user specifies a focus area, select queries from the matching category and also generate 2-3 custom queries for that focus. For example:
- "/scrape [focus_area]" -> relevant category queries + custom focus-specific queries
