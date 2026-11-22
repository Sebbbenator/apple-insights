import Image from "next/image";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";
import ShareActivity from "./ShareActivity";
import styles from "./page.module.css";

export const metadata = { title: "Din aktivitet i 2026" };

const numbers = new Intl.NumberFormat("da-DK");
const kilometers = new Intl.NumberFormat("da-DK", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default async function ActivityPage() {
  const profile = await getCurrentProfile();
  const insights = await getInsights(profile?.id ?? DEMO_USER_ID);
  const health = insights?.health;
  const cards = health ? [
    { label: "Skridt", value: numbers.format(health.steps), unit: "skridt", time: "12:15" },
    { label: "Aktiv energi", value: numbers.format(health.activeCalories), unit: "kcal", time: "14:28" },
    { label: "Gå- og løbedistance", value: kilometers.format(health.distanceKm), unit: "km", time: "09:06" },
  ] : [];

  return (
    <main className={styles.screen}>
      <h1>Din aktivitet i<br />2026</h1>
      {health ? (
        <>
          <dl className={styles.cards}>
            {cards.map(({ label, value, unit, time }) => (
              <div key={label} className={styles.card}>
                <dt><Image src="/homescreen/widgets/flame.svg" alt="" width={17} height={23} />{label}
                  <span aria-hidden="true">{time} ›</span>
                </dt>
                <dd>{value} <small>{unit}</small></dd>
              </div>
            ))}
          </dl>
          <h2>{health.title}</h2>
          <p className={styles.caption}>{health.description}</p>
          <ShareActivity text={`${health.title} · Min aktivitet i 2026: ${cards.map(card => card.value + " " + card.unit).join(", ")}.`} />
        </>
      ) : <p>Ingen aktivitetsdata for 2026 endnu.</p>}
      <Link className={styles.next} href="/insights/oversigt">Fortsæt til oversigten</Link>
    </main>
  );
}
