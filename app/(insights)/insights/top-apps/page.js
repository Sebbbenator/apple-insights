import TopApps from "@/components/TopApps";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";
import { appGlows, rankColors, screenApps } from "@/lib/screenApps";
import styles from "./page.module.css";

export const metadata = {
  title: "Dine top 5 apps",
};

export default async function TopAppsPage() {
  const currentUser = await getCurrentProfile();
  const insights = await getInsights(currentUser?.id ?? DEMO_USER_ID);
  const apps = insights?.screenTime.apps.slice(0, 5) ?? [];

  if (apps.length < 5) {
    return (
      <main className={styles.state}>
        <h1>Ingen data endnu</h1>
        <p>Vi har ikke nogen apps for dit 2026 endnu. Prøv igen senere.</p>
      </main>
    );
  }

  const favorite = screenApps[apps[0].app];
  const rows = apps.map((row, index) => ({
    name: row.app,
    icon: screenApps[row.app]?.icon ?? null,
    hours: `${Math.round(row.minutes / 60)} t`,
    fill: Math.round((row.minutes / apps[0].minutes) * 100),
    color: rankColors[index],
  }));

  return (
    <TopApps
      title={`${apps[0].app} er din favorit`}
      persona={favorite?.persona ?? "Appeksperten"}
      detail={favorite?.detail ?? "Du ved, hvad du kan lide"}
      rows={rows}
      glow={appGlows[apps[0].app] ?? "indigo"}
    />
  );
}
