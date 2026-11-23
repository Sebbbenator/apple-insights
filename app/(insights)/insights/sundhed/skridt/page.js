import Image from "next/image";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";
import styles from "./page.module.css";

export const metadata = { title: "Dit år i skridt" };

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
const numbers = new Intl.NumberFormat("da-DK");

export default async function StepsPage() {
  const profile = await getCurrentProfile();
  const insights = await getInsights(profile?.id ?? DEMO_USER_ID);
  const health = insights?.health;
  const stepsByMonth = new Map(insights?.months.map(({ month, steps }) => [month, steps]));

  return (
    <main className={styles.screen}>
      <div className={`radial-pink ${styles.glow}`} />
      {health ? (
        <>
          <h1 className={styles.heading}>
            I 2026 gik du
            <strong>{numbers.format(health.steps)}</strong>
            skridt
          </h1>
          <ul className={styles.chart} aria-label="Skridt pr. måned i 2026">
            {monthLabels.map((label, index) => {
              const steps = stepsByMonth.get(index + 1);
              return (
                <li key={label}>
                  <span className={styles.track} aria-hidden="true">
                    <span className={styles.bar} data-peak={steps > 0 && steps === health.topMonth.steps}
                      style={{ height: steps > 0 ? `${100 * steps / health.topMonth.steps}%` : 0, "--month": index }} />
                  </span>
                  {label}<span className="sr-only">{steps == null ? ", ingen data" : `, ${numbers.format(steps)} skridt`}</span>
                </li>
              );
            })}
          </ul>
          {health.steps > 0 && (
            <p className={styles.record}>
              <span className="sr-only">Måned med flest skridt: </span>
              <span className={styles.recordMonth}>
                <Image src="/homescreen/widgets/flame.svg" alt="" width={17} height={23} />
                {health.topMonth.name}
              </span>
              <strong>{numbers.format(health.topMonth.steps)}</strong>
              <span>skridt</span>
            </p>
          )}
        </>
      ) : <h1>Ingen skridtdata for 2026 endnu</h1>}
    </main>
  );
}
