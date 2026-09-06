# terrasense.se

Webbplats för **Terra Sense Stöd & Behandling**, öppenvård som kompletterar
socialtjänsten, med barnets behov i centrum.

Statisk Jekyll-sajt på GitHub Pages med ett eget designsystem ("Stilla mark")
och ett canvas-baserat lövpartikelsystem (`assets/js/leaves.js`).

**Live:** https://terrasense.se

## Utveckling

```bash
bundle install
bundle exec jekyll serve --livereload   # http://127.0.0.1:4000/
JEKYLL_ENV=production bundle exec jekyll build
```

Design­spec: `docs/superpowers/specs/2026-07-11-terrasense-website-design.md`

## Nytt blogginlägg

Lägg en markdown-fil i `_posts/` med namnet `YYYY-MM-DD-titel.md`:

```markdown
---
title: Om något viktigt
---
Texten här…
```

Signaturen "Vid pennan, Annahita" läggs till automatiskt av post-layouten.

## Domän och hosting

Sajten hostas på GitHub Pages från `main` i `terrasen/terrasense-se.github.io`
med custom domain `terrasense.se` (filen `CNAME`) och **Enforce HTTPS**
påslaget. DNS-cutovern gjordes 2026-09-05.

DNS hos GoDaddy:

- `A`-poster för apex `terrasense.se`: 185.199.108.153, 185.199.109.153,
  185.199.110.153, 185.199.111.153
- `CNAME` för `www` → `terrasen.github.io` (redirectar till apex)

Certifikat utfärdas och förnyas automatiskt av GitHub (Let's Encrypt).
