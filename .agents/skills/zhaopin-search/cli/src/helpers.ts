export interface JobResult {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  date: string | null;
  url: string;
  experience?: string;
  education?: string;
}

export interface SearchMeta {
  count: number;
  page: number;
}

export interface SearchResponse {
  meta: SearchMeta;
  results: JobResult[];
}

const BASE_URL = "https://www.zhaopin.com";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function jitter(baseMs: number): number {
  return baseMs + Math.random() * baseMs * 0.3;
}

function writeError(msg: string, code: string): void {
  process.stderr.write(JSON.stringify({ error: msg, code }) + "\n");
}

export { writeError };

export async function fetchWithRetry(
  url: string,
  retries = 5
): Promise<string | null> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const resp = await fetch(url, {
        headers: { "User-Agent": USER_AGENT },
        redirect: "follow",
      });
      if (resp.status === 404) return null;
      if (resp.status === 429 || resp.status >= 500) {
        if (attempt < retries) {
          await sleep(jitter(1000 * Math.pow(2, attempt)));
          continue;
        }
        writeError("Server error: " + resp.status, "SERVER_ERROR");
        return null;
      }
      return await resp.text();
    } catch (e: unknown) {
      if (attempt < retries) {
        await sleep(jitter(1000 * Math.pow(2, attempt)));
        continue;
      }
      writeError("Fetch failed: " + (e as Error).message, "FETCH_ERROR");
      return null;
    }
  }
  return null;
}

export function parseJobItems(html: string): JobResult[] {
  const results: JobResult[] = [];
  // Split on the full opening div tag to distinguish from nested "iteminfo"
  const items = html.split('<div class="joblist-box__item ');
  for (let i = 1; i < items.length; i++) {
    const item = items[i];
    // Prepend the split portion back for proper matching
    const fullItem = '<div class="joblist-box__item ' + item;
    const titleMatch = /class="jobinfo__name"[^>]*>([^<]+)<\/a>/.exec(fullItem);
    const companyMatch = /class="companyinfo__name"[^>]*>([^<]+)<\/a>/.exec(fullItem);
    const salaryMatch = /class="jobinfo__salary">\s*([^<]+)\s*</.exec(fullItem);
    const hrefMatch = /href="(https?:\/\/[^"]+)"/.exec(fullItem);

    // Parse location, experience, education from other-info items
    const otherInfoMatches = [...fullItem.matchAll(/class="jobinfo__other-info-item"[^>]*>([\w\W]*?)<\/div>/g)];
    let location = "";
    let experience = "";
    let education = "";
    for (const om of otherInfoMatches) {
      const text = om[1].replace(/<[^>]+>/g, "").trim();
      if (text) {
        if (!location) location = text;
        else if (!experience && /[年]/.test(text)) experience = text;
        else if (!education && /[本硕博]/.test(text)) education = text;
        else if (!experience) experience = text;
        else if (!education) education = text;
      }
    }

    const idMatch = hrefMatch ? /jobdetail\/([^\.]+)/.exec(hrefMatch[1]) : null;
    const id = idMatch ? idMatch[1] : "zhaopin-" + i;
    const url = hrefMatch ? hrefMatch[1] : BASE_URL + "/jobdetail/" + id;

    if (titleMatch || companyMatch) {
      results.push({
        id,
        title: titleMatch ? titleMatch[1].trim() : "",
        company: companyMatch ? companyMatch[1].trim() : "",
        location,
        salary: salaryMatch ? salaryMatch[1].trim() : "",
        date: null,
        url,
        experience,
        education,
      });
    }
  }
  return results;
}

 export function parseJobDetail(html: string): string {
   // Find the describtion-card section and extract the content div
   const cardMatch = /class="describtion-card[^"]*"[\s\S]*?class="seo-card__content"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g.exec(html);
   if (!cardMatch) return "";
   const raw = cardMatch[1];
   return raw
     .replace(/<[^>]+>/g, "\n")
     .replace(/&nbsp;/g, " ")
     .split("\n")
     .map((l) => l.trim())
     .filter((l) => l.length > 0)
     .join("\n");
 }
