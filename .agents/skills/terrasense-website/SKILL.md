---
name: terrasense-website
description: Use whenever Annahita wants to change terrasense.se, her Terra Sense / Sense Terapi website - write or edit a Reflektion (blog post), change text, prices, contact details or images, preview the site, or publish ("lägg upp", "publicera", "ändra på hemsidan", "nytt inlägg"). Covers the whole flow from her words to the live site, without technical questions to her.
---

# terrasense-website

You are helping Annahita, who owns terrasense.se and is not technical. She
tells you what she wants in plain words; you make the change, check it,
publish it and confirm that it is live. The repository's `AGENTS.md` has the
full technical background, the design rules and the content rules. Read it
once per session; this skill is the workflow.

This file is maintained in the repository at
`.agents/skills/terrasense-website/SKILL.md`. If you were loaded from an
installed copy elsewhere and the repository copy differs, the repository
copy wins: update the installed copy as `AGENTS.md` describes, then follow
the repository copy.

## How to work with Annahita

- Talk to her in Swedish unless she writes in another language. Plain
  words, no technical terms: say "hemsidan", "inlägget", "publicerat", not
  "commit", "build" or "deploy".
- Never ask her about tools, installations, permissions or which program to
  use. Everything you need is described below and is already approved:
  `git`, `curl`, `tar` and `scripts/zola` inside this repository. Do not
  install anything else (no Homebrew, Ruby, Jekyll, Node or Python
  packages).
- Do ask her about content when something is unclear: the exact wording,
  which page, a date, a price. Never invent facts, prices or quotes.
- Keep her voice. Use her text as written; fix only obvious typos, and
  mention which ones. Never add em-dashes (the long dash): use a comma,
  colon, full stop or parentheses. See "Content Rules" in `AGENTS.md`.
- When something goes wrong that you cannot fix, tell her calmly what
  happened, that the live site is unaffected, and that Kristofer can help.

## 1. Start of every session

Run in the repository root:

```bash
git status --short
git pull --rebase
```

If `git status` shows changes nobody has published, ask her whether they
are hers and should be kept (describe them in plain words). If `git pull`
fails because of a conflict, stop and tell her Kristofer needs to look at
it; do not force anything.

## 2. Make the change

### A new Reflektion (blog post)

1. Get from her: the title and the text. Use today's date unless she gives
   another.
2. Create `content/reflektioner/YYYY-MM-DD-slug.md`, where the slug is the
   title in lowercase with spaces as hyphens and å/ä → a, ö → o, other
   punctuation removed. Example: "Om små förändringar" on 2026-04-13 becomes
   `content/reflektioner/2026-04-13-om-sma-forandringar.md`.
3. File content: only the title in the front matter, then her text with a
   blank line between paragraphs:

   ```markdown
   ---
   title: Om små förändringar
   ---
   Första stycket.

   Andra stycket.
   ```

4. Do not add a signature, date line or heading: the page adds "Vid pennan,
   Annahita" itself. The first paragraph becomes the preview on the cards,
   so it should stand on its own.
5. The post will be at `https://terrasense.se/reflektioner/<slug>/`, and it
   appears first on `/reflektioner/` and among the three latest posts on
   `/terra-sense/`.

To change or remove a post, edit or delete its file in
`content/reflektioner/`. Never change the date prefix or the slug of a
published post (that changes its address); never touch the `aliases:` line
in older posts (it keeps old links working).

### Text on the pages

| What she calls it | File |
|---|---|
| Startsidan | `templates/home.html` |
| Stöd & Behandling / Terra Sense (socialtjänst side) | `templates/pages/terra-sense.html` |
| Sense Terapi (private side), including Priser | `templates/pages/sense-terapi.html` |
| Sekretesspolicy | `content/pages/sekretesspolicy.md` |
| Introduction on the Reflektioner page | `templates/reflektioner.html` |
| Menu / footer | `templates/partials/site-header.html`, `site-footer.html` |
| Page title and description shown in Google | the matching file in `content/` |
| Phone, e-mail, org.nr, invoice address, manager | `config.toml` under `[extra]` |

Find the sentence with a search (`grep -rn "a few words" templates content`)
and change only the text between the HTML tags; leave tags, classes and
attributes alone. Phone and e-mail live once in `config.toml`; a change
there updates every page. The phone link `tel:+46762159919` in the
templates must be updated by hand if the number changes.

Prices on Sense Terapi come only from Annahita: change exactly what she
says.

### Images

Put new images in `static/assets/images/` with a lowercase name without
spaces or å/ä/ö, and reference them as `/assets/images/name.jpg`. Keep them
under about 400 KB; if one is much larger, tell her and ask whether a
smaller version is fine, or ask Kristofer.

### Anything bigger

New pages, design or layout changes, or changes to the leaves animation:
tell her it is a job for Kristofer, and stop.

## 3. Check before publishing

```bash
scripts/zola build
grep -rnP '\x{2014}' content templates config.toml
```

- `scripts/zola build` must end with `Done`. The first run downloads the
  site tool (a few seconds, needs internet); that is expected. If it
  reports an error, read the message: it names the file and line. Fix your
  change and build again.
- The `grep` must print nothing. If it prints a line, replace the
  em-dash there.
- If the download in `scripts/zola` fails (no network in your sandbox),
  skip the build and continue: GitHub builds the site again and keeps the
  old version online if anything is wrong.

If she wants to see the change before it goes live, start the preview in
the background with `scripts/zola serve` and give her the address it
prints (normally http://127.0.0.1:1111). Stop it when she is done.

## 4. Publish

```bash
git add -A
git commit -m "<type>: <what changed, in English, under 72 characters>"
git push
```

Use `feat:` for new content (for example `feat: new reflektion Om hopp`)
and `fix:` for corrections. If `git push` is rejected because the site
changed elsewhere, run `git pull --rebase` and `git push` again.

## 5. Confirm it is live

GitHub builds and publishes the site after the push, usually within one or
two minutes. Wait about a minute, then check the page you changed:

```bash
curl -s "https://terrasense.se/<path>/?v=$(date +%s)" | grep -c "a few words from the change"
```

A count of 1 or more means it is live; if it is 0, wait another minute and
try again (up to about five minutes). If the GitHub CLI `gh` happens to be
installed and logged in, `gh run list --limit 1` shows whether the latest
publish succeeded; it is optional.

When it is live, tell her in one or two sentences, with the address. If it
is still not live after five minutes, tell her the change is saved but not
yet visible, and that Kristofer can check why.
