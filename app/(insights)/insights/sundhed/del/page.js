import Image from "next/image";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";
import ShareActivity from "./ShareActivity";
import styles from "./page.module.css";

export const metadata = { title: "Din aktivitet i 2026" };

export default async function ActivityPage() {
  const profile = await getCurrentProfile();
  const insights = await getInsights(profile?.id ?? DEMO_USER_ID);
  const steps = insights?.health.steps.toLocaleString("da-DK");
  const cards = [
    { label: "Skridt", value: steps, unit: "skridt", time: "12:15" },
    { label: "Aktiv energi", value: "80.561", unit: "kcal", time: "14:28" },
    { label: "Gå- og løbedistance", value: "83,97", unit: "km", time: "09:06" },
  ];

  return (
    <main className={styles.screen}>
      <h1>Din aktivitet i<br />2026</h1>
      {insights ? (
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
          <h2>Sprinteren</h2>
          <p className={styles.caption}>Dit år i bevægelse.</p>
          <ShareActivity text={`Sprinteren · Min aktivitet i 2026: ${cards.map(card => card.value + " " + card.unit).join(", ")}.`} />
        </>
      ) : <p>Ingen aktivitetsdata for 2026 endnu.</p>}
      <Link className={styles.next} href="/insights/oversigt">Fortsæt til oversigten</Link>
    </main>
  );
}
