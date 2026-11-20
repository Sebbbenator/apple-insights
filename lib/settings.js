export const settingsWidget = {
  src: "/settings/insights-banner.svg",
  alt: "Apple Insights 2026",
  href: "/insights",
};

export const settingsSections = [
  {
    id: "screen-time",
    rows: [{ id: "screen-time", name: "Skærmtid" }],
  },
  {
    id: "system",
    rows: [
      { id: "general", name: "Generelt" },
      { id: "accessibility", name: "Tilgængelighed" },
      { id: "privacy", name: "Anonymitet & sikkerhed" },
    ],
  },
  {
    id: "passwords",
    rows: [{ id: "passwords", name: "Adgangskoder" }],
  },
  {
    id: "apps",
    rows: [
      { id: "safari", name: "Safari", icon: "/homescreen/icons/safari.svg" },
      { id: "news", name: "News", icon: "/homescreen/icons/news.svg" },
      { id: "translate", name: "Oversæt", icon: "/homescreen/icons/translate.svg" },
      { id: "maps", name: "Kort" },
      { id: "shortcuts", name: "Genveje", icon: "/homescreen/icons/shortcuts.svg" },
      { id: "health", name: "Sundhed", icon: "/homescreen/icons/health.svg" },
      { id: "siri", name: "Siri & søgning" },
      { id: "photos", name: "Fotos", icon: "/homescreen/icons/photos.svg" },
      { id: "game-center", name: "Game Center" },
    ],
  },
];

export function getSettingsHref(row) {
  return row.href ?? `/indstillinger/${row.id}`;
}

export function getSettingsIcon(row) {
  return row.icon ?? `/settings/icons/${row.id}.png`;
}
