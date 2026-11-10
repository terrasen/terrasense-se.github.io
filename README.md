# terrasense.se

Webbplats för **Terra Sense Stöd & Behandling**, öppenvård som kompletterar
socialtjänsten, med barnets behov i centrum, och **Sense Terapi**.

Statisk sajt byggd med [Zola](https://www.getzola.org/) och publicerad på
GitHub Pages, med ett eget designsystem ("Stilla mark") och ett
canvas-baserat lövpartikelsystem (`static/assets/js/leaves.js`).

**Live:** https://terrasense.se

## Utveckling

```bash
scripts/zola serve    # förhandsvisning på http://127.0.0.1:1111/
scripts/zola build    # bygg till public/
```

`scripts/zola` laddar ner rätt version av Zola till `.tools/` första gången,
inget annat behöver installeras. Varje push till `main` byggs och publiceras
automatiskt av GitHub Actions.

Designspec: `docs/superpowers/specs/2026-07-11-terrasense-website-design.md`.
Instruktioner för AI-agenter: `AGENTS.md` och
`.agents/skills/terrasense-website/SKILL.md`.

## Nytt blogginlägg

Lägg en markdown-fil i `content/reflektioner/` med namnet
`YYYY-MM-DD-titel.md`:

```markdown
---
title: Om något viktigt
---
Texten här…
```

Inlägget hamnar på `/reflektioner/titel/`. Signaturen "Vid pennan, Annahita"
läggs till automatiskt.

## Domän och hosting

Sajten hostas på GitHub Pages från `main` i `terrasen/terrasense-se.github.io`
med custom domain `terrasense.se` (filen `static/CNAME`) och **Enforce
HTTPS** påslaget. DNS-cutovern gjordes 2026-09-05.

DNS hos GoDaddy:

- `A`-poster för apex `terrasense.se`: 185.199.108.153, 185.199.109.153,
  185.199.110.153, 185.199.111.153
- `CNAME` för `www` → `terrasen.github.io` (redirectar till apex)

Certifikat utfärdas och förnyas automatiskt av GitHub (Let's Encrypt).
