# terrasense.se

Webbplats för **Terra Sense Stöd & Behandling** — öppenvård som kompletterar
socialtjänsten, med barnets behov i centrum.

Statisk Jekyll-sajt på GitHub Pages med ett eget designsystem ("Stilla mark")
och ett canvas-baserat lövpartikelsystem (`assets/js/leaves.js`).

**Live (interim):** https://terrasen.github.io/terrasense-se.github.io/

## Utveckling

```bash
bundle install
bundle exec jekyll serve --livereload   # http://127.0.0.1:4000/terrasense-se.github.io/
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

## DNS-cutover till terrasense.se (görs sist, efter avslöjandet)

1. Hos GoDaddy (där terrasense.se ligger): peka domänen på GitHub Pages
   - `A`-poster för apex `terrasense.se`: 185.199.108.153, 185.199.109.153,
     185.199.110.153, 185.199.111.153
   - `CNAME` för `www` → `terrasen.github.io`
2. I det här repot:
   - `_config.yml`: sätt `url: https://terrasense.se` och `baseurl: ""`
   - lägg till filen `CNAME` i repo-roten med innehållet `terrasense.se`
3. I repo-inställningarna (Pages): sätt custom domain `terrasense.se` och
   slå på **Enforce HTTPS** när certifikatet är utfärdat.
4. Verifiera att gamla GoDaddy-sajten är avstängd/frånkopplad.
