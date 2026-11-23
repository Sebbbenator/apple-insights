import Image from "next/image";
import ShareButton from "@/components/ShareButton";
import StatusScreen from "@/components/StatusScreen";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";
import styles from "./page.module.css";

export const metadata = {
  title: "Din aktivitet i 2026",
};

function formatNumber(number, decimals = 0) {
  return number.toLocaleString("da-DK", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default async function ActivityPage() {
  const currentUser = await getCurrentProfile();
  const insights = await getInsights(currentUser?.id ?? DEMO_USER_ID);

  if (!insights) {
    return (
      <StatusScreen
        title="Ingen aktivitet endnu"
        text="Vi har ikke nogen aktivitetsdata fra dit 2026 endnu. Prøv igen senere."
      />
    );
  }

  const health = insights.health;
  const cards = [
    { label: "Skridt", value: formatNumber(health.steps), unit: "skridt" },
    { label: "Aktiv energi", value: formatNumber(health.activeCalories), unit: "kcal" },
    { label: "Gå- og løbedistance", value: formatNumber(health.distanceKm, 1), unit: "km" },
  ];
  const summary = cards.map((card) => `${card.value} ${card.unit}`).join(", ");

  return (
    <main className={styles.screen}>
      <div className={`radial-pink ${styles.glow}`} />
      <h1>
        Din aktivitet i
        <br />
        2026
      </h1>

      <dl className={styles.cards}>
        {cards.map((card) => (
          <div key={card.label} className={styles.card}>
            <dt>
              <Image src="/homescreen/widgets/flame.svg" alt="" width={17} height={23} />
              {card.label}
              <span aria-hidden="true">›</span>
            </dt>
            <dd>
              {card.value} <small>{card.unit}</small>
            </dd>
          </div>
        ))}
      </dl>

      <h2>{health.title}</h2>
      <p className={styles.caption}>{health.description}</p>
      <ShareButton text={`${health.title}. Min aktivitet i 2026: ${summary}.`} />
    </main>
  );
}
