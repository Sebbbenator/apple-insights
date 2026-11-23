import ScreenTimeScreen from "@/components/ScreenTimeScreen";
import StatusScreen from "@/components/StatusScreen";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";

export const metadata = {
  title: "Skærmtid",
};

export default async function ScreenTimePage() {
  const currentUser = await getCurrentProfile();
  const insights = await getInsights(currentUser?.id ?? DEMO_USER_ID);

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
