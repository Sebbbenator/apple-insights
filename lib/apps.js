export const homeApps = [
  { id: "facetime", name: "FaceTime" },
  { id: "calendar", name: "Kalender" },
  { id: "photos", name: "Fotos" },
  { id: "shortcuts", name: "Genveje" },
  { id: "health", name: "Sundhed" },
  { id: "wallet", name: "Wallet" },
  { id: "reminders", name: "Påmindelser" },
  { id: "mail", name: "Mail" },
  { id: "podcasts", name: "Podcasts" },
  { id: "news", name: "News" },
  { id: "weather", name: "Vejr" },
  { id: "notes", name: "Noter" },
  { id: "translate", name: "Oversæt" },
  { id: "app-store", name: "App Store" },
  { id: "settings", name: "Indstillinger", href: "/indstillinger" },
];

export const dockApps = [
  { id: "messages", name: "Beskeder" },
  { id: "safari", name: "Safari" },
  { id: "music", name: "Musik" },
  { id: "camera", name: "Kamera" },
];

export function getAppHref(app) {
  return app.href ?? `/${app.id}`;
}

export function getAppIcon(app) {
  return `/homescreen/icons/${app.id}.svg`;
}
