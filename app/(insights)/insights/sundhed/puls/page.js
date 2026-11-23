import Image from "next/image";
import StatusScreen from "@/components/StatusScreen";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";
import styles from "./page.module.css";

export const metadata = {
  title: "Din puls gennem 2026",
};

function monthDate(month) {
  return `2026-${String(month).padStart(2, "0")}`;
}

export default async function PulsePage() {
  const currentUser = await getCurrentProfile();
  const insights = await getInsights(currentUser?.id ?? DEMO_USER_ID);

  if (!insights) {
    return (
      <StatusScreen
        title="Ingen puls endnu"
        text="Vi har ikke nogen pulsdata fra dit 2026 endnu. Prøv igen senere."
      />
    );
  }

  const heartRate = insights.health.heartRate;
  const extremes = [
    { label: "Laveste", ...heartRate.lowest },
    { label: "Højeste", ...heartRate.highest },
  ];

  return (
    <main className={styles.screen}>
      <h1 className={styles.title}>
        Din puls
        <br />
        gennem 2026
      </h1>

      <div className={styles.pulse} style={{ "--beat": `${60 / heartRate.average}s` }}>
        <div className={`radial-pink ${styles.glow}`} />
        <Image className={styles.heart} src="/homescreen/widgets/heart.svg" alt="" width={304} height={275} />
      </div>

      <dl className={styles.stats}>
        <div className={styles.average}>
          <dt>Gennemsnit</dt>
          <dd>{heartRate.average} bpm</dd>
        </div>
        {extremes.map((extreme) => (
          <div key={extreme.label}>
            <dt>{extreme.label}</dt>
            <dd>
              {extreme.bpm} bpm
              <time dateTime={monthDate(extreme.month)}>{extreme.name}</time>
            </dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
