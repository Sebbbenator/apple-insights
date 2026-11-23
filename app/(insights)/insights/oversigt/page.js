import Link from "next/link";
import StatusScreen from "@/components/StatusScreen";
import { getCurrentProfile } from "@/lib/auth";
import { getInsights } from "@/lib/insights";
import styles from "./page.module.css";

export const metadata = {
  title: "Dit 2026",
};

function formatNumber(number) {
  return number.toLocaleString("da-DK");
}

function formatMinutes(minutes) {
  return `${Math.floor(minutes / 60)} t ${minutes % 60} min`;
}

export default async function InsightsPage() {
  const [currentUser, insights] = await Promise.all([getCurrentProfile(), getInsights()]);

  if (!insights) {
    return (
      <StatusScreen
        title="Ingen data endnu"
        text="Vi har ikke nogen data om dit 2026 endnu. Prøv igen senere."
      />
    );
  }

  const stats = [
    { label: "Skærmtid om dagen", value: formatMinutes(insights.screenTime.dailyMinutes) },
    { label: "Fotos i 2026", value: formatNumber(insights.photos.total) },
    { label: "Skridt i 2026", value: formatNumber(insights.health.steps) },
    { label: "Gennemsnitlig hvilepuls", value: `${insights.health.restingHeartRate} bpm` },
  ];

  return (
    <main className={styles.insights}>
      {!currentUser && <span className={styles.demo}>Demo</span>}
      <h1>{currentUser ? `Dit 2026, ${currentUser.name}` : "Et 2026 på en iPhone"}</h1>

      <dl className={styles.stats}>
        {stats.map((stat, index) => (
          <div key={stat.label} className={styles.stat} style={{ "--index": index }}>
            <dt>{stat.label}</dt>
            <dd className="text-3xl semibold rounded">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <h2>Awards</h2>
      <ul className={styles.stats}>
        {insights.awards.map((award, index) => (
          <li key={award.title} className={styles.stat} style={{ "--index": stats.length + index }}>
            <span>{award.title}</span>
            <strong className="text-xl semibold">{award.value}</strong>
            <span>{award.detail}</span>
          </li>
        ))}
      </ul>

      {!currentUser && (
        <p>
          <Link href="/login">Log ind for at se dit eget 2026</Link>
        </p>
      )}
    </main>
  );
}
