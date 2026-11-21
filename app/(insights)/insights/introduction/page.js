import IntroductionScreen from "@/components/IntroductionScreen";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";
import styles from "./page.module.css";

export const metadata = {
  title: "Dit år i tal",
};

export default async function IntroductionPage() {
  const currentUser = await getCurrentProfile();
  const insights = await getInsights(currentUser?.id ?? DEMO_USER_ID);

  if (!insights) {
    return (
      <main className={styles.state}>
        <h1>Ingen data endnu</h1>
        <p>Vi har ikke nogen data om dit 2026 endnu. Prøv igen senere.</p>
      </main>
    );
  }

  const stats = [
    { label: "dage", value: 365, color: "white" },
    { label: "timer", value: Math.round(insights.screenTime.totalMinutes / 60), color: "purple" },
    { label: "fotos", value: insights.photos.total, color: "orange" },
    { label: "skridt", value: insights.health.steps, color: "pink" },
  ];

  return <IntroductionScreen stats={stats} />;
}
