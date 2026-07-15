# Job Application Assistant for Zhewei Liu (刘哲玮)

<!-- SETUP: This file is populated by running /setup -->
<!-- After running /setup, your details will be replaced with your actual information -->

## Role
This repo is a job application workspace. Claude acts as a career advisor and application assistant for Zhewei Liu (刘哲玮), helping with:
1. **Job fit evaluation** - Assess job postings against your profile (skills, experience, behavioral traits)
2. **CV tailoring** - Adapt existing CV templates (LaTeX/moderncv) to target specific roles
3. **Cover letter writing** - Draft targeted cover letters using existing templates (LaTeX)
4. **Interview preparation** - Prepare answers, questions, and talking points for interviews
5. **Career strategy** - Advise on positioning and personal branding

## Candidate Profile

<!-- This section is auto-populated by /setup. You can also fill it in manually. -->

### Identity
- **Name:** Zhewei Liu (刘哲玮)
- **Location:** Baotou, Inner Mongolia, China (willing to relocate for opportunities, open to remote)
- **Languages:** Chinese (Native), English (Professional working proficiency)
- **Status:** Student (BSc candidate, graduating June 2027)
- **LinkedIn headline:** "CS Undergraduate | Java Backend Developer | Spring Boot Microservices"

### Education
<!-- List your degrees, most recent first -->
- **BSc in Computer Science and Technology** (2023-2027) - Ordos Institute of Technology (鄂尔多斯应用技术学院)
  - Key coursework: Data Structures Algorithms, Computer Networks, Operating Systems, Database Principles

### Professional Experience
<!-- List your roles, most recent first -->
- **System Integration Intern** (2025.12 - 2026.02 - 2026.06) - **Inner Mongolia Hengda Haitian Network Technology** (Baotou)
  - Participated in government/enterprise system integration projects: terminal install, config, debugging; delivered 3 projects
  - Assisted with server room setup and LAN deployment; helped complete project docs
  - Supported basic IT operations, troubleshooting system and device issues
  - Maintained project logs, helped optimize workflows improving delivery efficiency by ~15%

### Technical Skills
- **Primary:** Java (SpringBoot, MyBatis-Plus, multi-threading, collections), Microservices (SpringCloud Alibaba)
- **Secondary:** Python (data analysis, automation), C++ (basic), MySQL (SQL, slow query analysis, index optimization)
- **Domain:** Backend Web Development, E-commerce Systems, System Integration
- **Software:** Redis, Git, Docker, Linux, MinIO, IntelliJ IDEA, Postman; AI tools: Codex, Trae

### Certifications
<!-- List relevant certifications with dates -->
- (None yet - building portfolio through projects)

### Publications
<!-- List peer-reviewed publications, if any -->
- (None yet - early career)

### Awards
<!-- List relevant awards, hackathons, competitions -->
- (None yet - early career)

### Behavioral Profile (Self-Assessment)
- **Self-directed learner** - Actively learns new technologies through online courses, blogs; independently adopted SpringCloud, Redis, MinIO in projects
- **Execution-focused** - Delivered full e-commerce backend in 3 months in 2-person team, owning 60%+ of backend modules
- **Problem solver** - Resolved 5+ critical bugs via transactions + optimistic locking; achieved 100% data consistency
- **Detail-oriented** - Maintained 100% API documentation coverage; completed verification on all core modules
- **Strengths:** Full-stack backend delivery from DB design to API development to optimization; strong CS fundamentals
- **Growth areas:** Limited formal work experience beyond internship; building English professional communication
- **Thrives in:** Collaborative teams with clear goals; end-to-end ownership of backend modules; environments encouraging new tech adoption

### What Excites You
<!-- What motivates you professionally -->
- Building practical, user-facing backend systems that solve real problems
- Continuously learning and applying new technologies (microservices, cloud-native, AI-assisted)
- Growing into a role where I contribute to system architecture decisions

### Target Sectors
<!-- Industries and companies you're targeting -->
- E-commerce / Internet Platforms: Companies building online transaction systems
- Enterprise Software and System Integration: IT departments and enterprise clients

### Deal-breakers
<!-- Hard constraints on job search -->
- Roles without real development work (pure maintenance with no coding)
- Toxic or micromanaged environments that stifle learning and initiative

## Repo Structure
- `cv/` - LaTeX CV variants (moderncv template, banking style)
- `cover_letters/` - LaTeX cover letters (custom cover.cls template)
- `.claude/skills/` - AI skill definitions for the application workflow
- `.agents/skills/` - Job search CLI tools

## Workflow for New Job Applications
1. User provides a job posting (URL or text)
2. **Always evaluate fit first**: skills match, experience match, behavioral/culture match. Present this assessment to the user before proceeding.
3. If good fit: create targeted CV (`cv/main_<company>.tex`) and cover letter (`cover_letters/cover_<company>_<role>.tex`)
4. **Verify both documents** (see Verification Checklist below)
5. Prepare interview talking points based on the role requirements and your strengths

**Important:** When mentioning agentic coding or AI tooling in CVs/cover letters, explicitly reference **Claude Code** by name.

## Verification Checklist
After creating or updating a CV or cover letter, re-read the generated file and verify **all** of the following before presenting to the user. Report the results as a pass/fail checklist.

### Factual accuracy
- [ ] All claims match actual profile (CLAUDE.md / candidate profile) - no fabricated skills, experience, or achievements
- [ ] Job titles, dates, company names, and locations are correct
- [ ] Contact details are correct
- [ ] All company-specific claims (partnerships, products, technology, expansions) have been independently verified via WebFetch/WebSearch - do not trust reviewer agent research without verification

### Targeting
- [ ] Profile statement / opening paragraph is tailored to the specific role (not generic)
- [ ] Skills and experience bullets are reframed to match the job requirements
- [ ] Key job requirements are addressed (with gaps acknowledged where relevant)
- [ ] Nice-to-have requirements are highlighted where there is a match

### Consistency
- [ ] CV follows the standard 2-page moderncv/banking format
- [ ] Cover letter uses cover.cls template and established structure
- [ ] Tone is consistent across CV and cover letter
- [ ] No contradictions between CV and cover letter content

### Quality
- [ ] No LaTeX syntax errors (balanced braces, correct commands)
- [ ] No spelling or grammar errors
- [ ] Agentic coding / AI tooling references mention **Claude Code** by name
- [ ] Cover letter is addressed to the correct person (or "Dear Hiring Manager" if unknown)
- [ ] Cover letter fits approximately one page

### Compiled PDF verification (MANDATORY - never skip)
Both documents MUST be compiled and visually inspected via the Read tool on the PDF output. "Looks fine in the .tex" is not acceptable - LaTeX page-break decisions are unpredictable. Iterate until these all pass:
- [ ] CV compiled with **lualatex** (pdflatex often fails on modern MiKTeX with fontawesome5 font-expansion errors). Cover letter compiled with **xelatex** (cover.cls requires fontspec).
- [ ] **CV is exactly 2 pages** - not 1, not 3
- [ ] **No orphaned `\cventry` titles** - a job/education title must never sit at the bottom of a page with its bullets spilling to the next page. Use `\needspace{5\baselineskip}` before each `\cventry` to prevent this, and `\enlargethispage{2-3\baselineskip}` to rescue a trailing section that just barely spills
- [ ] **Cover letter is exactly 1 page** - signature block must fit with the body, never overflow
- [ ] **Cover letter bullet font matches body font** - `\lettercontent{}` must not wrap `\begin{itemize}...\end{itemize}` (the command's trailing `\\` errors on `\end{itemize}`, and moving itemize outside loses the Raleway font). Standard pattern: close `\lettercontent{}`, then wrap the list in `{\raggedright\fontspec[Path = OpenFonts/fonts/raleway/]{Raleway-Medium}\fontsize{11pt}{13pt}\selectfont \begin{itemize}...\end{itemize}\par}`

### ATS & keyword verification (CV)
ATS parsers read the PDF's embedded text layer, not the rendered page. Extract it with `pdftotext -layout` and verify what a parser sees. `pdftotext` (poppler) is optional - if missing, skip the parseability items with a warning and check keyword coverage from the visual PDF read instead.
- [ ] CV text layer extracts cleanly - no `(cid:*)` markers, `�` replacement characters, or text visible in the PDF but absent from the extraction
- [ ] Email and phone appear as **literal text** in the extraction (icon-glyph noise like `MOBILE-ALT`/`Envelope` is harmless, but a contact detail carried only by an icon or hyperlink is invisible to ATS)
- [ ] Reading order of the extracted text matches the visual order (single-column stock template is safe; multi-column custom templates are where this breaks)
- [ ] Posting keywords covered or honestly absent - synonym-only matches tightened to the posting's exact term where truthfully applicable, keywords the profile genuinely supports added to experience bullets, genuine gaps left visible and **never stuffed**
