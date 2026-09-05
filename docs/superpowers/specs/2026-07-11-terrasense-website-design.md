# Terra Sense — ny webbplats, designdokument

**Datum:** 2026-07-11
**Status:** Godkänd design, väntar på implementationsplan
**Bakgrund:** Överraskningspresent från Kristofer till Anna (Annahita Holmberg,
verksamhetschef). Ersätter nuvarande GoDaddy Website Builder-sajt på
https://terrasense.se med en modern, egenbyggd statisk webbplats i samma anda
som mklab.se — men med ett helt eget, lugnt och jordnära formspråk.

## 1. Mål och publik

- **Behåll Annas innehåll och röst** — texterna från nuvarande sajt återanvänds
  i princip ordagrant (lätt korrigering av uppenbara stavfel är ok, t.ex.
  "SpecialiRedigerastutredningar").
- **Två publiker:** socialtjänst/kommunala uppdragsgivare (sajten måste kännas
  ren, professionell och pålitlig) och privatpersoner/familjer i utsatta lägen
  (sajten måste kännas varm, lugn och trygg).
- **Känslan:** "här möter vi någon som förstår att detta är allvar — vi arbetar
  med människor och deras liv."
- Sajten är på **svenska enbart** (ingen engelsk variant).

## 2. Teknisk arkitektur

Samma grundarkitektur som mklab.se:

- **Jekyll** statisk sajt, **GitHub Pages**-hosting från `main`-branchen.
- Repo: `krist00fer/terrasense-se.github.io` (projekt­sajt under personligt
  konto; fungerar med custom domain).
- **Custom domain:** `terrasense.se` via `CNAME`-fil + DNS-omläggning hos
  GoDaddy. DNS-bytet görs **sist**, när Anna sett och godkänt sajten;
  fram till dess nås sajten på `krist00fer.github.io/terrasense-se.github.io`.
- `github-pages`-gem för kompatibilitet, `jekyll-sitemap` + `jekyll-feed`.
- Ingen tema-dependency — all CSS är egen, med design-tokens.
- Struktur:
  - `_layouts/default.html` — bas-layout (meta, fonts, canvas, reveal-JS)
  - `_layouts/post.html` — layout för reflektioner
  - `_includes/site-header.html`, `_includes/site-footer.html`
  - `index.html` — hela startsidan (kapitelstruktur)
  - `_posts/` — reflektionerna
  - `_pages/reflektioner.html` — bloggindex på `/reflektioner/`
  - `_pages/sekretesspolicy.md` — `/sekretesspolicy/`
  - `_pages/404.md`
  - `assets/css/site.css` — all CSS i en fil, med tokens i ett `:root`-block
  - `assets/js/leaves.js` — lövmotorn
  - `assets/images/` — logotyp-SVG, favicons, foton

## 3. Sidstruktur

### Startsidan (en sida, kapitel med nummer, MKLab-stil)

1. **Hero** — centrerad. Eyebrow "Terra Sense Stöd & Behandling · Stockholm ·
   Sedan 2014", H1 **"Med barnets behov i centrum."**, lead om öppenvård som
   kompletterar socialtjänsten, knappar "Kontakta oss" + "Våra tjänster",
   statline (Grundat 2014 · På uppdrag av socialtjänsten · Socionomer med
   KBT-vidareutbildning). Lövscen: fritt drivande (ambient).
2. **01 · Tjänster** — "Tre insatser, ett mål." Tre kort:
   *Intensiv hemutredning enligt BBiC* (Utredning), *Hemmabaserad
   familjebehandling* (Behandling), *Handledning till familjehem*
   (Handledning) — med befintliga beskrivningstexter. Lövscen: tre kluster.
3. **02 · Arbetssätt** — "Förändring sker i vardagen." Text om öppenvård och
   arbetssätt, problemområden som pill-taggar (skolgång, konflikter, NPF,
   missbruk, psykisk ohälsa, kriminalitet/våld, psykosociala svårigheter),
   kompetens/metoder (MI, TMO, Signs of Safety, BBiC, nätverksarbete, SAVRY,
   EARL) samt **BBiC-triangeln som egen SVG-illustration**. Lövscen: triangel
   med cirkel i mitten.
4. **03 · Om Terra Sense** — "En tydlig drivkraft sedan 2014." Befintlig
   om-text (kondenserad till 3–4 stycken), kort med **fotoplats** för Annas
   eget foto (grå/grön platshållare tills hon lägger in ett), namn + titel,
   teamtext (socionomer med KBT-vidareutbildning, familjebehandlare).
   Lövscen: ambient.
5. **04 · Reflektioner** — "Tankar från behandlingsarbetet." Tre teaser-kort
   (senaste inläggen) + länk "Alla reflektioner →" till `/reflektioner/`.
   Lövscen: ambient.
6. **05 · Kontakt** — "Välkommen att höra av dig." Text om upplägg,
   tillgänglighet och kostnad + sekretess. **Endast tel- och mailto-länkar**
   (076-215 99 19, info@terrasense.se) — inget formulär, ingen tredjepart.
   Lövscen: hjärta (samma hjärta som i äpplets kärna).
7. **Footer** — mörk skifferteal. © Terra Sense Stöd & Behandling AB,
   org.nr 559047-6130, Järfälla/Stockholm, länk till sekretesspolicy.
   Fakturaadressen (Flygarvägen 29, 175 69 Järfälla) placeras i
   kontaktsektionen, under tel/mail.

### Bloggen `/reflektioner/`

- Indexsida som listar alla inlägg som kort (titel, ingress, ev. datum nedtonat
  — inläggen på gamla sajten är odaterade; sätts till rimliga datum och kan
  justeras av Anna senare).
- **8 inlägg migreras:** de sju "Reflektioner från behandlingsarbetet"
  (Om instabilitet, Om föräldraförmåga under press, Om att arbeta i hemmiljö,
  Om barns beteende, Om samarbete mellan vuxna, Om små förändringar, Om hopp)
  + "Att få familjebehandling – ur en ungdoms perspektiv". Signatur
  "Vid pennan, Annahita" bevaras.
- Nya inlägg = ny markdown-fil i `_posts/` (Anna kan lära sig detta, eller få
  hjälp av Kristofer).
- Post-layout: lugn, smal textkolumn, samma tokens; ambient lövscen, glesare.

### Övriga sidor

- `/sekretesspolicy/` — texten hämtas från nuvarande sajt (utan
  Google/reCAPTCHA-styckena som inte längre gäller; cookie-skrivningar anpassas
  till att sajten inte längre använder cookies eller spårning).
- `404` — vänlig, med löv och länk hem.

## 4. Designsystem — "Stilla mark"

### Färgtokens

| Token | Värde | Användning |
|---|---|---|
| `--paper` | `#faf6ee` | Grundbakgrund |
| `--paper-warm` | `#f3ecdd` | Tonade sektionsband (målas av canvas) |
| `--ink` | `#2f4f4f` | Rubriker, brödtext, primärknapp, footer |
| `--ink-soft` | `#4a5d58` | Sekundär text |
| `--apple` | `#3e7a4e` | Logotyp, länkar, betoningar |
| `--sage` | `#9db98a` | Löv, dekor |
| `--amber` | `#c9a24b` | Accent, ramar, löv |
| `--earth` | `#8a6d3b` | Eyebrows, kickers, metadata |
| Kort | `#ffffff` med `1px rgba(47,79,79,.10)`-ram, radius 14px | Tjänste-/teaser-kort |

BBiC-triangelns pasteller (variant A, godkänd): ros `#e5aca6` (text `#6b3a34`),
gul `#e0c87e` (text `#5f5026`), grön `#aecba0` (text `#3d5233`), cirkel
`#faf6ee` med `#c9a24b`-ring och mörk `--ink`-text.

### Typografi

- **Rubriker:** Fraunces (400/500/600), serif — värme + seriositet.
- **Brödtext/UI:** Source Sans 3 (400/600/700).
- Google Fonts med `display=swap`. Eyebrows/kickers: uppercase, letter-spacing
  `.16–.18em`, `--earth`.

### Komponentmönster

- Kapitel med nummer (`01 · Tjänster`), pill-knappar (primär `--ink`, ghost
  med hairline-ram), pill-taggar för problemområden, mjuka kort,
  reveal-animationer (IntersectionObserver, translateY + opacity, som MKLab).
- Mobilanpassning: kort staplas, nav kollapsar till enkel meny (eller
  ankarlänkar), formationer centreras under texten.

## 5. Lövmotorn (`leaves.js`) — godkänd prototyp v3

Canvas-baserat partikelsystem, `position:fixed` bakom innehållet
(`z-index:0`, `pointer-events:none`). Prototypkod finns i
`.superpowers/brainstorm/29990-1783787550/content/leaves-alive-v3.html` och
porteras/förfinas till `assets/js/leaves.js`.

- **~90 löv** i **fem trädslag** med egna silhuetter, ådring och färgpooler:
  Ek (lobad, moss/brun), Björk (triangulär-oval, blekt guld), Lönn (femuddig,
  bärnsten/mjuk rost — lobkurvorna förfinas från prototypens raka linjer),
  Asp (rund, salvia), Sälg (smal, salvia/moss). Storleksmix 60 % små (7–11 px),
  30 % medel, 10 % större (≤ 22 px).
- **Detaljer per löv:** skaft, mittnerv, sidonerver (Lönn: strålande nerver),
  skuggad halva, 3D-tumling (pitch/roll/yaw — baksidan mörkare, kantläge
  smalnar till en strimma).
- **Vind:** bas-sväng + slumpvisa svaga vindbyar vid stillhet; **snabb scroll
  utlöser vindby** vars styrka skalar med scrollhastigheten (cooldown ~1 s).
- **Scener per kapitel** (`data-scene` + IntersectionObserver, threshold 0.5):
  `ambient` (hero, om, reflektioner), `clusters` (tjänster, 3 grupper),
  `triangle` (arbetssätt, BBiC-triangel + cirkel), `heart` (kontakt).
  ~78 % av löven deltar i formationer, resten driver alltid fritt. Landade löv
  lugnar tumlingen och "andas" kring sin punkt.
- **Formationer i fritt utrymme:** på breda skärmar (>900 px) ankras formationer
  vid ~72 % av viewport-bredden med vänsterställd text; på smala skärmar under
  texten. Formationer får aldrig ligga över text eller illustrationer.
- **Tonade sektionsband** (`--paper-warm`) målas **av canvasen** (fillRect per
  band och frame, via `getBoundingClientRect`) så att löven alltid är synliga
  framför banden men bakom texten.
- **Tillgänglighet/robusthet:** `prefers-reduced-motion: reduce` → statisk
  enframes-rendering (inga rörelser). Utan JS: sajten fullt läsbar och
  navigerbar, tonade band får CSS-fallback-bakgrund (klass som canvas-JS:t tar
  bort/ersätter), inga löv.
- **Prestanda:** vektorritning per frame är tillräcklig (<1 ms); DPR-tak 2;
  `passive` scroll-lyssnare.

### Tillägg (godkänt 2026-07-11): djup, hänsyn och andrum

- **Tre djupplan:** ~50 % av löven ligger i ett avlägset plan (55 % storlek,
  dämpad opacitet, förrenderade oskarpa sprites — bokeh), ~38 % i mellanplanet
  och ~12 % nära (större, skarpast). Formationer använder endast mellan- och
  närplanen; det avlägsna planet är alltid ambient textur.
- **Djup-dyk under innehåll:** mellan-/närplansløv som driver in över text,
  kort eller andra innehållsblock (spårade rektanglar) sjunker mjukt till det
  avlägsna planet — blir mindre, oskarpa och halvt genomskinliga — och stiger
  igen i fri yta. Skarpa löv existerar aldrig ovanpå text.
- **Lugn vid läsning:** när användaren slutat scrolla (~1,6 s) sjunker
  energinivån till ~45 %: fritt drivande löv saktar in, tumlar mindre och
  tonar ner. Formerade löv och det avlägsna planet påverkas inte. Scroll
  väcker systemet; snabb scroll ger fortsatt vindby.
- **Lövstråket (desktop >900 px):** text konsekvent till vänster (max-width
  560), formationer ankras alltid i ett dedikerat stråk kring 72 % av
  viewport-bredden. Ingen alternering — konsekvens = trygghet.
- **Andrum (mobil ≤900 px):** formationerna flyttar ut ur kapitlen till egna
  textfria mellansektioner (`.ts-interlude`, 52 vh, `data-scene-mobile`) mellan
  kapitlen: läs → lövmellanspel → läs. Interludes visas bara när lövmotorn kör
  (`html.js-leaves`) så att sidan inte får tomma hål utan JS. Antal löv sänks
  till 60 på skärmar <700 px.

## 6. Grafiska tillgångar

- **Logotyp:** äpplet (grönt äpple, hjärtformat kärnhus med två kärnor som
  "ögon", blad, omslutande swoosh) ritas om som **ren SVG** utifrån
  `terrasense-logo.webp` (originalet är beskuret nertill — swooshens underkant
  rekonstrueras). Header-utkastet från mockupen är godkänd startpunkt och
  förfinas. Används i header (med ordbild "TERRA SENSE"), footer, favicon-set
  (SVG + PNG-fallbacks, apple-touch-icon, webmanifest) och som
  social-share-bild (og:image).
- **BBiC-triangeln:** inline-SVG enligt variant A (fullständig triangel­siluett:
  topp-kil + två baskilar med smala kanaler, central cirkel), med etiketter
  Barnets utveckling / Familj och miljö / Föräldrarnas förmåga / Barnets behov.
- **Foton:** en fotoplats i Om-sektionen (platshållare). Anna är fotograf och
  kan lägga in egna bilder senare; designen är inte beroende av foton.
  Eventuella AI-genererade stämningsbilder kan läggas till senare (Kristofer
  genererar på prompt från Claude) men ingår inte i grundleveransen.
- `terrasense-logo.webp` flyttas till `assets/images/source/` som referens.

## 7. Innehållskällor

All befintlig text är extraherad från terrasense.se (GoDaddy-sajten) och finns
kartlagd i detta dokument + i scratchpad-filen `home-text.txt` (extraheras om
vid behov med `curl https://terrasense.se`). Kontaktuppgifter:
tel 076-215 99 19, info@terrasense.se, verksamhetschef Annahita Holmberg,
org.nr 559047-6130, fakturaadress Flygarvägen 29, 175 69 Järfälla.

## 8. Kvalitet och verifiering

- Lokal utveckling: `bundle exec jekyll serve --livereload`.
- Verifiering före leverans: rendering utan Liquid-fel, inga konsolfel,
  alla länkar klickade, mobil (390 px) + desktop (1280 px) skärmdumpar via
  Playwright, `prefers-reduced-motion`-läge kontrollerat, no-JS-läge
  kontrollerat, `JEKYLL_ENV=production bundle exec jekyll build` grönt.
- Lighthouse-mål: bra kontrast (WCAG AA för all text), snabb LCP (statisk
  sajt + system-nära fontladdning).

## 9. Utanför scope (medvetet)

- Kontaktformulär (endast tel/mail-länkar).
- Engelsk språkversion.
- CMS/admingränssnitt — innehåll redigeras som markdown/HTML i repot.
- DNS-omläggningen genomförs som separat, sista steg tillsammans med
  Kristofer (och Anna, när överraskningen är avslöjad).
