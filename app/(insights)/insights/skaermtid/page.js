import ScreenTimeScreen from "@/components/ScreenTimeScreen";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";
import styles from "./page.module.css";

export const metadata = {
  title: "Skærmtid",
};

export default async function ScreenTimePage() {
  const currentUser = await getCurrentProfile();
  const insights = await getInsights(currentUser?.id ?? DEMO_USER_ID);

  if (!insights) {
    return (
      <main className={styles.state}>
        <h1>Ingen data endnu</h1>
        <p>Vi har ikke nogen skærmtid for dit 2026 endnu. Prøv igen senere.</p>
      </main>
    );
  }

  const hours = Math.round(insights.screenTime.totalMinutes / 60);

  return <ScreenTimeScreen hours={hours} />;
}
