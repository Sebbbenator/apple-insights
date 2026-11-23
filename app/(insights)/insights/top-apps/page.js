import TopApps from "@/components/TopApps";
import StatusScreen from "@/components/StatusScreen";
import { getInsights } from "@/lib/insights";
import { appGlows, rankColors, screenApps } from "@/lib/screenApps";

export const metadata = {
  title: "Dine top 5 apps",
};

export default async function TopAppsPage() {
  const insights = await getInsights();
  const apps = insights?.screenTime.apps.slice(0, 5) ?? [];

  if (apps.length < 5) {
    return (
      <StatusScreen
        title="Ingen data endnu"
        text="Vi har ikke nogen apps for dit 2026 endnu. Prøv igen senere."
      />
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
