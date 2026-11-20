# Apple Insights 2026

Et årligt "Wrapped" for iPhone: dit år med skærmtid, fotos og sundhed, fortalt som en historie. Eksamensprojekt i Dynamic User Interface på Multimediedesign, Erhvervsakademi Aarhus.

> **Studieprojekt, Multimediedesign, Erhvervsakademi Aarhus. Ikke tilknyttet Apple.**
>
> Apple Insights 2026 er et eksamensprojekt lavet af studerende. Det er ikke et produkt fra Apple, og det er hverken godkendt, sponsoreret eller støttet af Apple Inc. Navne som iPhone, FaceTime og App Store samt app-ikonerne tilhører Apple og bruges kun for at gøre prototypen genkendelig. Alle data i appen er testdata og ikke rigtige data fra en iPhone.

Projektet er bygget op som [nextjs-supabase-posts](https://github.com/cederdorff/nextjs-supabase-posts): Next.js 16 med App Router, JavaScript, CSS Modules og login med Supabase Auth.

## Kom i gang

1. Kør `npm install` i terminalen.
2. Kopiér `.env.example` til `.env.local`, og indsæt URL og publishable key fra **Connect**-panelet i jeres Supabase-projekt.
3. Åbn **SQL Editor** i Supabase, indsæt hele [`supabase/setup.sql`](supabase/setup.sql), og klik på **Run**. Filen opretter `users` med Row Level Security og et demo-login: `demo@example.com` med adgangskoden `insights123`.
4. Kør `npm run dev`, og åbn [http://localhost:3000](http://localhost:3000).

## Designsystemet

Alle værdier ligger i [`app/styles/variables.css`](app/styles/variables.css), og navnene er de samme som i Figma, bare med `-` i stedet for `/`:

```text
Figma  color/neutral/dark-grey   ->  var(--color-neutral-dark-grey)
Figma  font-size/3xl             ->  var(--font-size-3xl)
Figma  border-radius/md          ->  var(--border-radius-md)
```

Filen er delt i fire sektioner:

| Sektion | Indhold |
| --- | --- |
| 1. Figma-variabler | Alle 48 variabler: `--color-*`, `--font-*`, `--gap-*`, `--padding-*`, `--border-radius-*`, `--btn-height-md` |
| 2. Figma-styles | `--gradient-rainbow`, `--gradient-silver`, `--radial-purple` osv., `--glass-blur`, `--glass-fill` |
| 3. Kun i kode | Motion: `--duration-fast` til `--duration-hero`, `--ease-out`, `--ease-in-out`, `--ease-spring` |
| 4. Roller | `--background`, `--surface`, `--foreground`, `--muted`, `--accent`, `--danger` |

I komponenter bruger I helst roller til farver og Figma-navnene til resten. Skriv aldrig en hex-værdi eller px direkte, brug `var(--navn)`. Ændres en værdi i Figma, ændrer I den samme linje i `variables.css`.

[`app/globals.css`](app/globals.css) importerer `variables.css` og har kun de styles, hele appen deler:

```jsx
<h2 className="text-3xl semibold">Din skærmtid</h2>     // Figma text styles
<span className="text-10xl thin rounded">365</span>      // + rounded til store tal
<span className="text-gradient-silver">2026</span>        // gradient-tekst
<div className="glass">...</div>                          // Glass Effect
<div className="radial-purple" />                         // glow (absolut positioneret)
```

## Struktur

```text
app/
  styles/variables.css   Designsystemet: alle værdier fra Figma
  globals.css            Base, text styles, effekter og forms
  layout.js              Root layout for hele appen
  page.js                Forsiden: iPhone Home screen
  not-found.js           404, som alle apps undtagen Indstillinger fører til
  indstillinger/page.js  Indstillinger · åbnes fra Home screen
  (site)/                Route group: sider med Header (påvirker ikke URL'en)
    layout.js            Viser Header
    insights/page.js     Historien · kun logget ind
    login/page.js        Log ind
    signup/page.js       Opret bruger
    profile/page.js      Din række i users og log ud · kun logget ind
components/              Genbrugelige komponenter, hver med sin .module.css
  HomeScreen.js          Samler statusbar, widgets, app-grid og dock
  AppIcon.js             Én app som link med ikon og navn
  Clock.js               Client Component med den rigtige tid
  ImageWidget.js         Widget med et billede, der kan skiftes via src
public/homescreen/       Wallpaper, app-ikoner (SVG), statusbar-ikoner og widgetbilleder
lib/
  apps.js                Listen over apps på Home screen og i docken
  supabase/server.js     Supabase-klienten til serveren
  auth.js                getCurrentUser() og getCurrentProfile()
  actions.js             signOut()
supabase/setup.sql       Tabeller, adgang og Row Level Security
proxy.js                 Fornyer login-sessionen før hver request
```

Hver side har sin egen `page.module.css` ved siden af `page.js`, og hver komponent har sin egen `.module.css`.

## Datamodellen

```text
Login                      users
(Authentication → Users)   id         uuid
id     uuid  ---------->   name       text
email  text   samme id     mail       text
                           image      text
                           createdAt  timestamptz
```

Jeres egne tabeller, fx brugerens insights, tilføjer I i `supabase/setup.sql` med en `"userId"`, der peger på `users.id`, og en RLS-politik, så brugeren kun kan læse sine egne rækker.

## Sikkerhed

- Row Level Security er slået til fra start: en bruger kan kun se og ændre sin egen række i `users`.
- Brugere kan kun ændre `name` og `image`, aldrig `id` eller `mail`.
- Kun den publishable key ligger i projektet. Den hemmelige nøgle må aldrig komme i koden.
- `.env.local` er i `.gitignore` og bliver aldrig committet.

## Git-flow

`main` er altid den version, der virker. Lav en branch for hver opgave (fx `feature/welcome-slide`), og merge den med en pull request, som en anden i gruppen har reviewet.
