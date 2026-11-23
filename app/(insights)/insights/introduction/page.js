import IntroductionScreen from "@/components/IntroductionScreen";
import StatusScreen from "@/components/StatusScreen";
import { getInsights } from "@/lib/insights";

export const metadata = {
  title: "Dit år i tal",
};

export default async function IntroductionPage() {
  const insights = await getInsights();

  if (!insights) {
    return (
      <StatusScreen
        title="Ingen data endnu"
        text="Vi har ikke nogen data om dit 2026 endnu. Prøv igen senere."
      />
    );
  }

  const stats = [
    { label: "dage", value: 365, color: "white" },
    { label: "timer", value: Math.round(insights.screenTime.totalMinutes / 60), color: "indigo" },
    { label: "fotos", value: insights.photos.total, color: "orange" },
    { label: "skridt", value: insights.health.steps, color: "pink" },
  ];

  return <IntroductionScreen stats={stats} />;
}
