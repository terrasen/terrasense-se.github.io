# Terra Sense Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the new Terra Sense website (terrasense-se.github.io) per the approved design spec.

**Architecture:** Jekyll static site (no theme) on GitHub Pages. Single chaptered
homepage + `/reflektioner/` blog collection, custom CSS with `:root` design
tokens, and a canvas leaf engine (`assets/js/leaves.js`) ported from the
approved prototype `.superpowers/brainstorm/29990-1783787550/content/leaves-alive-v3.html`.

**Tech Stack:** Jekyll (github-pages gem), vanilla JS (canvas 2D,
IntersectionObserver), Google Fonts (Fraunces + Source Sans 3), Playwright for
visual verification, `gh` CLI for deployment.

## Global Constraints

- All copy in Swedish, taken from the current terrasense.se (inventoried in the
  spec §3 and §7); Anna's wording preserved, obvious typos fixed.
- Palette/typography exactly per spec §4 (tokens table).
- Leaf engine behavior per spec §5 (five species, 3D tumble, scroll gusts,
  scenes: ambient/clusters/triangle/heart, formations in free space,
  canvas-painted `--paper-warm` bands, reduced-motion + no-JS fallbacks).
- Contact = tel/mailto links only. No forms, no analytics, no cookies.
- Site must build with `JEKYLL_ENV=production bundle exec jekyll build` with
  zero errors, and render without console errors.
- Verification of visual work: Playwright screenshots at 1280px and 390px.
- Commit after each task (conventional commits).

---

### Task 1: Jekyll scaffolding that builds

**Files:**
- Create: `Gemfile` (copy pattern from `../mklab-se/mklab-se.github.io/Gemfile`)
- Create: `_config.yml`
- Create: `_layouts/default.html` (minimal shell for now)
- Create: `index.html` (placeholder hero only)
- Modify: `.gitignore` (already has `_site/` etc. — verify)

**Interfaces:**
- Produces: `site.title` = "Terra Sense Stöd & Behandling", `site.email` =
  `info@terrasense.se`, `site.phone` = `076-215 99 19`, collections/defaults
  used by all later tasks; layout `default` with `{{ content }}`.

**Steps:**
- [ ] `_config.yml` with: title, description, url `https://terrasense.se`,
  email/phone, `permalink: /:title/`, collections `pages` (output true),
  defaults (layout default for pages/posts), plugins `jekyll-sitemap`,
  `jekyll-feed`, exclude docs/, .superpowers/, README.md, timezone
  `Europe/Stockholm`, `baseurl: ""` (custom domain from day one — CNAME added
  at deploy; until DNS cutover the site renders at the project URL where
  absolute paths through `relative_url` still work because assets use it).
- [ ] `bundle install` (local vendor path like MKLab repo)
- [ ] `bundle exec jekyll build` → succeeds, `_site/index.html` exists
- [ ] Commit `feat: scaffold jekyll site`

### Task 2: Design tokens + base CSS

**Files:**
- Create: `assets/css/site.css`

**Interfaces:**
- Produces CSS classes used by all later tasks:
  `.ts-shell` (max-width 1120px container), `.ts-chapter`,
  `.ts-chapter--tinted` (JS-managed band; CSS fallback background),
  `.ts-eyebrow`, `.ts-kicker`, `.ts-title` (h1/h2 chapter titles), `.ts-lead`,
  `.ts-btn`, `.ts-btn--primary`, `.ts-btn--ghost`, `.ts-card`, `.ts-grid`,
  `.ts-pill`, `.ts-statline`, `.reveal`/`.is-visible`, `.ts-about`,
  `.ts-footer`, header classes `.ts-header`, `.ts-nav`.
- Tokens in `:root`: `--paper #faf6ee`, `--paper-warm #f3ecdd`,
  `--ink #2f4f4f`, `--ink-soft #4a5d58`, `--apple #3e7a4e`, `--sage #9db98a`,
  `--amber #c9a24b`, `--earth #8a6d3b`, spacing scale, radius 14px.

**Steps:**
- [ ] Write tokens, reset, typography (Fraunces headings / Source Sans 3 body),
  buttons, cards, pills, chapter layout, reveal animation styles,
  `@media (prefers-reduced-motion: reduce)` disables reveal transitions,
  responsive breakpoints (<720px stacks grids).
- [ ] Build passes; commit `feat: add design system CSS`

### Task 3: Logo SVG + favicons + header/footer includes

**Files:**
- Create: `assets/images/logo.svg` (refined apple: green apple, heart core,
  two seed "eyes", leaf, swoosh completing under the apple — reference
  `terrasense-logo.webp`)
- Create: `assets/favicon.svg`, `assets/favicon-96x96.png`,
  `assets/apple-touch-icon.png`, `assets/web-app-manifest-192x192.png`,
  `assets/web-app-manifest-512x512.png`, `assets/site.webmanifest`,
  `assets/images/og-image.png` (1200×630, logo + wordmark on paper)
- Create: `_includes/site-header.html`, `_includes/site-footer.html`
- Modify: `_layouts/default.html` (full head: fonts preconnect+swap, meta
  description, og/twitter tags, favicons, css; body: skip-link, header,
  canvas `<canvas id="leaves" aria-hidden="true">`, content, footer, js)
- Move: `terrasense-logo.webp` → `assets/images/source/terrasense-logo.webp`

**Interfaces:**
- Consumes: CSS classes from Task 2.
- Produces: header nav anchors `#tjanster #arbetssatt #om #reflektioner
  #kontakt` (+ `/reflektioner/` page link), footer with org info +
  `/sekretesspolicy/` link; `logo.svg` used inline in header.
- PNG rasters generated by opening the SVG in Playwright and screenshotting at
  exact sizes (omit background), or via a small HTML raster page.

**Steps:**
- [ ] Draw SVG logo (viewBox 0 0 64 64): stem+leaf, apple body `--apple`,
  heart-shaped core `--paper`, two seed ellipses `--ink`, sage swoosh ellipse
  arc completing bottom-left → verify by Playwright screenshot vs. webp
  reference side-by-side.
- [ ] Generate favicon/OG rasters; wire everything in layout; nav works.
- [ ] Build + screenshot; commit `feat: add logo, favicons, header and footer`

### Task 4: Homepage content (all chapters)

**Files:**
- Create: full `index.html` (front matter: layout default, title, description,
  `data-scene` sections)

**Interfaces:**
- Consumes: Task 2 classes, Task 3 includes.
- Produces: sections with ids/anchors and `data-scene` values consumed by
  leaves.js: hero(`ambient`), `#tjanster`(`clusters`),
  `#arbetssatt`(`triangle`), `#om`(`ambient`), `#reflektioner`(`ambient`),
  `#kontakt`(`heart`). Reflektioner chapter lists latest 3 posts via
  `{% for post in site.posts limit:3 %}`.
- Content: exactly per spec §3 (hero copy, three service cards, arbetssätt
  text + 7 problem pills + methods line, om text + photo placeholder card
  with Annahita Holmberg / Verksamhetschef, contact with tel/mail buttons +
  fakturaadress, BBiC inline SVG variant A per spec §4 colors).

**Steps:**
- [ ] Write all sections; BBiC triangle as inline SVG (full triangle: apex
  wedge + two base wedges, channels, center circle, labels).
- [ ] Build; Playwright screenshots 1280/390; check hierarchy + wrapping.
- [ ] Commit `feat: homepage content`

### Task 5: Leaf engine (`assets/js/leaves.js`) + reveal JS (`assets/js/main.js`)

**Files:**
- Create: `assets/js/leaves.js` — port from
  `.superpowers/brainstorm/29990-1783787550/content/leaves-alive-v3.html`
  (the approved v3 prototype is the reference implementation)
- Create: `assets/js/main.js` — IntersectionObserver reveal (`.reveal` →
  `.is-visible`), current-year injection, mobile nav toggle
- Modify: `_layouts/default.html` (script tags, `defer`)

**Interfaces:**
- Consumes: `<canvas id="leaves">`, `[data-scene]` sections,
  `.ts-chapter--tinted` elements.
- Produces: window-level engine that (a) removes CSS fallback band class
  effect by adding `js-leaves` class on `<html>`, (b) paints bands, then
  leaves.

**Port changes from prototype (everything else stays as approved):**
- [ ] Refine Lönn: replace straight `lineTo` lobes with quadratic curves
  (soft notches), keep 5 lobes + radiating veins.
- [ ] Bands: paint for elements with `.ts-chapter--tinted`; on JS init add
  `js-leaves` to `<html>`; CSS: `.ts-chapter--tinted { background: var(--paper-warm) }`
  but `.js-leaves .ts-chapter--tinted { background: transparent }`.
- [ ] Formation anchor: wide >900px → cx=0.72W (text column is left-aligned
  max-width 520 on formation chapters), narrow → below text (cy 0.62H).
- [ ] Reduced motion → single static frame; no canvas loop.
- [ ] Verify: no console errors; scenes switch on scroll; gust on fast
  scroll; leaves visible over tinted bands; 60fps (frame time < 4ms).
- [ ] Commit `feat: living leaves canvas engine`

### Task 6: Blog — posts, layout, index

**Files:**
- Create: `_layouts/post.html` (narrow column, Fraunces title, "Vid pennan,
  Annahita" byline styling, back-link to `/reflektioner/`)
- Create: `_pages/reflektioner.html` (permalink `/reflektioner/`, lists all
  posts as cards)
- Create: 8 posts in `_posts/` (dates spread 2025-11 → 2026-06, oldest first
  as numbered on old site):
  `2025-11-10-om-instabilitet.md`, `2025-12-08-om-foraldraformaga-under-press.md`,
  `2026-01-12-om-att-arbeta-i-hemmiljo.md`, `2026-02-09-om-barns-beteende.md`,
  `2026-03-09-om-samarbete-mellan-vuxna.md`, `2026-04-13-om-sma-forandringar.md`,
  `2026-05-11-om-hopp.md`, `2026-06-15-att-fa-familjebehandling-ur-en-ungdoms-perspektiv.md`
  — body text verbatim from spec §3 inventory (extracted from live site).

**Interfaces:**
- Consumes: Task 2 CSS; homepage teasers (Task 4) automatically show latest 3.
- Produces: `site.posts` used by homepage; `/reflektioner/` linked from nav.

**Steps:**
- [ ] Layout, index, posts; build; click-through via Playwright.
- [ ] Commit `feat: reflektioner blog with migrated posts`

### Task 7: Sekretesspolicy + 404

**Files:**
- Create: `_pages/sekretesspolicy.md` (permalink `/sekretesspolicy/`) — source
  text from scratchpad `sekretess.html`
  (re-fetch `curl -sL https://terrasense.se/sekretesspolicy` if needed),
  strip GoDaddy/reCAPTCHA/Google clauses, adapt cookie wording to "no cookies,
  no tracking".
- Create: `_pages/404.md` (permalink `/404.html`, friendly Swedish text, link
  home)

**Steps:**
- [ ] Extract text, write pages, build, verify pages render.
- [ ] Commit `feat: sekretesspolicy and 404`

### Task 8: Full verification pass

**Steps:**
- [ ] `JEKYLL_ENV=production bundle exec jekyll build` → zero warnings/errors
- [ ] Playwright: desktop 1280 + mobile 390 screenshots of every chapter,
  `/reflektioner/`, one post, `/sekretesspolicy/`, 404; zero console errors
- [ ] Reduced-motion emulation → static leaves, page fine
- [ ] JS disabled → content readable, tinted bands visible (CSS fallback)
- [ ] All nav/footer links resolve (no 404s in page requests)
- [ ] Fix anything found; commit `fix:` as needed

### Task 9: Deploy to GitHub Pages

**Steps:**
- [ ] Push `main` to origin (`git push -u origin main`)
- [ ] Enable Pages: `gh api repos/krist00fer/terrasense-se.github.io/pages
  -X POST -f "source[branch]=main" -f "source[path]=/"` (or confirm already
  enabled); NO custom domain yet (DNS cutover is a separate step after the
  reveal, per spec §9)
- [ ] Wait for Pages build; fetch the live URL
  `https://krist00fer.github.io/terrasense-se.github.io/` → 200, spot-check
  rendering + assets load (relative_url must handle the subpath)
- [ ] **Subpath caveat:** project-site serves under `/terrasense-se.github.io/`
  — `_config.yml` must set `baseurl: /terrasense-se.github.io` for the interim
  URL to work, and be flipped to `""` + CNAME at DNS cutover. To avoid the
  flip-flop: set `url` to the project URL for now and use `relative_url`
  everywhere; revisit at cutover. Decision: use
  `baseurl: /terrasense-se.github.io` now; cutover checklist documented in
  README.
- [ ] Verify live site with Playwright against the public URL
- [ ] Commit any final fixes; report live URL

## Self-Review

- Spec coverage: §1 goals (Task 4 copy), §2 architecture (Task 1, 9),
  §3 structure (Tasks 4, 6, 7), §4 design system (Task 2), §5 leaves (Task 5),
  §6 assets (Task 3), §7 content (Tasks 4, 6, 7), §8 verification (Task 8,
  plus per-task checks), §9 out-of-scope respected (no form, no EN, DNS last).
- No placeholder steps; the leaf engine's "code" is the approved v3 prototype
  file in-repo, which is concrete source, plus enumerated port changes.
- Naming consistent: `.ts-*` classes, `data-scene` values, file paths match
  across tasks.
