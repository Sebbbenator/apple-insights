import ScreenTimeScreen from "@/components/ScreenTimeScreen";
import StatusScreen from "@/components/StatusScreen";
import { getInsights } from "@/lib/insights";

export const metadata = {
  title: "Skærmtid",
};

export default async function ScreenTimePage() {
  const insights = await getInsights();

  if (!insights) {
    return (
      <StatusScreen
        title="Ingen data endnu"
        text="Vi har ikke nogen skærmtid for dit 2026 endnu. Prøv igen senere."
      />
    );
  }

  const hours = Math.round(insights.screenTime.totalMinutes / 60);

  return <ScreenTimeScreen hours={hours} />;
}
