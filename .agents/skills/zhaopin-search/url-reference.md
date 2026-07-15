# Zhaopin (????) URL Reference

## Base URL
- `https://www.zhaopin.com`

## Search Endpoint
- **URL:** `https://www.zhaopin.com/sou/?kw=<query>&city=<city>`
- **Method:** GET
- **Content-Type:** text/html; charset=utf-8 (server-rendered)

### Query Parameters
| Parameter | Description | Example |
|-----------|-------------|---------|
| `kw` | Search keywords (URL-encoded) | `Java%25E5%25BC%2580%25E5%258F%2591` (Java??) |
| `city` | City filter (Chinese characters, URL-encoded) | `%25E5%258C%2597%25E4%25BA%25AC` (??) |
| `p` | Page number (1-indexed) | `2` |

### Response Structure (HTML)
Each job listing is in a `<div class="joblist-box__item">` container:

| Field | HTML Selector | Notes |
|-------|--------------|-------|
| id | Extracted from URL in `a.jobinfo__name` href | e.g., CCL1509518450J40875640914 |
| title | `a.jobinfo__name` text content | Job title in Chinese |
| company | `a.companyinfo__name` text content | Company name |
| salary | `p.jobinfo__salary` text content | Monthly range like "1-1.3?" |
| location | `div.jobinfo__other-info-item span` text content (first item with location icon) | City/district |
| experience | `div.jobinfo__other-info-item` text (second item) | e.g., "5-10?" |
| education | `div.jobinfo__other-info-item` text (third item) | e.g., "??" |
| tags | `div.joblist-box__item-tag` text content | Multiple span items |
| url | `a.jobinfo__name` href attribute | Full job detail URL |
| date | N/A | Not available in search results |

## Detail Endpoint
- **URL:** `https://www.zhaopin.com/jobdetail/<jobId>.htm`
- **Method:** GET
- **Content-Type:** text/html; charset=utf-8

### Response Structure (HTML)
Job description is in:
```html
<div class="describtion-card seo-card seo-card--default">
  <div class="seo-card__header">????</div>
  <div class="seo-card__content">
    <!-- Description text with line breaks -->
  </div>
</div>
```

Tags (Spring, MySQL, etc.) appear as `<div class="joblist-box__item-tag">` before the description section.

## Known Issues
- Posting dates are not embedded in the search results HTML.
- The site may occasionally return a captcha challenge under automated access.
- Chinese characters in search queries must be URL-encoded.
