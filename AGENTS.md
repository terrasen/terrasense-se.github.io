# AGENTS.md

Guidance for AI coding agents (ChatGPT/Codex, Claude Code, Copilot, etc.)
and humans working in this repository. Read this before making changes.

## Start Here: the `terrasense-website` skill

If a skill named **`terrasense-website`** is available in your environment,
**load it first** and follow it. It exists on the site owner's (Annahita's)
computer and guides non-technical updates — new Reflektioner posts, text
edits, publishing — without requiring local Jekyll tooling. Prefer its
workflow over anything below when they differ.

If the skill is *not* available, you are most likely working with a
technical maintainer on another machine. Proceed with this file as-is; no
special handling is needed.

## Project Overview

Website for Terra Sense Stöd & Behandling (öppenvård for children/families on
behalf of socialtjänsten, Stockholm). Jekyll static site on GitHub Pages, no
theme — custom design system ("Stilla mark") and a canvas leaf-particle engine.
Design spec with full rationale: `docs/superpowers/specs/2026-07-11-terrasense-website-design.md`
(including the addendum on depth/calm/interludes). Implementation plan:
`docs/superpowers/plans/2026-07-11-terrasense-website.md`.

## Commands

```bash
bundle install                                   # once (path: vendor/bundle)
bundle exec jekyll serve --livereload            # http://127.0.0.1:4000/
JEKYLL_ENV=production bundle exec jekyll build   # must pass with zero errors before push
```


## Deployment

- Push to `main` → GitHub Pages (legacy build) deploys automatically.
- Live: https://terrasense.se (custom domain via `CNAME`, HTTPS enforced,
  cutover done 2026-09-05). `baseurl` is empty; keep using `relative_url`
  anyway so the site survives a future subpath deploy.
- The repo must stay public (free-plan requirement for Pages).
- Repo: `terrasen/terrasense-se.github.io` (moved from the personal account
  `krist00fer` in Sept 2026; docs/ specs may still mention the old path).

## Architecture

- `index.html` — the whole homepage: chapters Hero → 01 Tjänster → 02
  Arbetssätt (inline BBiC-triangle SVG) → 03 Om → 04 Reflektioner (latest 3
  posts) → 05 Kontakt. Each section has `data-scene` (ambient | clusters |
  triangle | heart) consumed by the leaf engine. Three `.ts-interlude` divs
  (with `data-scene-mobile`) are leaf-only breathing bands shown ≤900px.
- `_posts/` — Annahita's "Reflektioner" (8 migrated). New post = one markdown
  file with only a `title:` in front matter; `_layouts/post.html` adds the
  "Vid pennan, Annahita" signature automatically.
- `_pages/` — reflektioner.html (blog index), sekretesspolicy.md, 404.md.
- `assets/css/site.css` — all CSS; design tokens in `:root` (palette, BBiC
  pastels, spacing). Class prefix `ts-`.
- `assets/js/main.js` — reveal animations (IO), footer year, mobile nav.
- `assets/js/leaves.js` — the leaf engine (see below).
- `_includes/logo.svg` — inline header logo; `assets/images/logo.svg` +
  `assets/favicon.svg` are copies. Edit all three together (and regenerate
  PNG rasters via `tmp/raster.html`: serve tmp/ with `python3 -m http.server`,
  screenshot tiles with Playwright, `sips -z` to exact sizes).

## The Leaf Engine (assets/js/leaves.js)

Core concept: leaves are alive but *polite* — they never compete with content.

- **Five species** (ek, björk, lönn, asp, sälg) with distinct outlines, veins,
  color pools; 3D tumble via pitch/roll/yaw (back face darker, edge-on thin).
- **Three depth planes.** Formation leaves (first `FORM_RATIO`=62% of COUNT)
  get mid/near planes; the rest are mostly far-plane bokeh (pre-rendered
  blurred sprites via `makeSprites`, cheap drawImage per frame).
- **Depth-dive:** mid/near leaves over any content rect (CONTENT_SELECTOR)
  sink to far look (shrink/fade/blur) and rise in open space. Never remove
  this — it's the accessibility/readability contract.
- **Reading calm:** ~1.6s after scrolling stops, `energy` eases to 0.45; free
  leaves slow/fade, settled formations stay full. Settling leaves are pulled
  face-up (`-sin(2*pitch)` term) — without this they freeze edge-on and vanish.
- **Scenes:** IntersectionObserver on `[data-scene]` (wide) or
  `[data-scene-mobile]` + ambient chapters (≤900px). Formations anchor at
  x≈0.72W in the right "leaf corridor" on wide screens, centered in the
  interludes on mobile. COUNT drops 90→60 below 700px.
- **Tinted bands:** `.ts-chapter--tinted` backgrounds are painted BY the canvas
  (behind leaves, behind nothing else). CSS fallback background applies until
  the engine adds `js-leaves` to `<html>`; `js` class (set inline in head)
  gates reveal animations. Don't reorder that plumbing.
- **Reduced motion:** single static frame, redrawn on scroll. No loop.

Tuning knobs live at the top of their sections: COUNT, FORM_RATIO, PLANES,
energy target (0.45), dive rate (0.045), gust thresholds.

## Content Rules

- Everything in Swedish. Annahita's original wording from the old site is
  preserved essentially verbatim — do not rewrite her voice. New content may
  be added but must be factual and neutral in tone.
- Her bio facts (Om section) are sourced from her public LinkedIn profile.
- Calm, serious, warm. No sales language, no forms, no cookies, no analytics.
  Contact is tel/mailto only — keep it that way.
- Audiences: (1) socialtjänst handläggare (operational facts, credibility),
  (2) families in crisis (warmth, safety). Content decisions should serve both.

## Verification Before Push

1. `JEKYLL_ENV=production bundle exec jekyll build` — zero errors/warnings.
2. Serve locally, check 1280px and 390px in a browser (Playwright or
   manually), console must be clean.
3. If leaves changed: check a formation settles visibly (scroll to
   #arbetssatt, wait ~6s, screenshot) and that leaves still dive under text.
4. Internal link check: every href/src in `_site` resolves (script pattern in
   plan Task 8 history).

## Commit Style

Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`), subject <72 chars.
