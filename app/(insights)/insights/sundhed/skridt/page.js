import Image from "next/image";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";
import styles from "./page.module.css";

export const metadata = { title: "Dit år i skridt" };

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
const designBarHeights = [130, 64, 191, 12, 144, 90, 68, 98, 44, 211, 179, 78];
const tallestBar = Math.max(...designBarHeights);
const numbers = new Intl.NumberFormat("da-DK");
const millions = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 });

export default async function StepsPage() {
  const profile = await getCurrentProfile();
  const insights = await getInsights(profile?.id ?? DEMO_USER_ID);
  const health = insights?.health;
  const stepsByMonth = new Map(insights?.months.map(({ month, steps }) => [month, steps]));

  return (
    <main className={styles.screen}>
      {health ? (
        <>
          <h1 className={styles.heading} aria-label={`I 2026 gik du ${numbers.format(health.steps)} skridt`}>
            I 2026 gik du
            <strong>{health.steps >= 1000000 ? `${millions.format(health.steps / 1000000)} mio.` : numbers.format(health.steps)}</strong>
            skridt
          </h1>
          <ul className={styles.chart} aria-label="Skridt pr. måned i 2026">
            {monthLabels.map((label, index) => {
              const steps = stepsByMonth.get(index + 1);
              return (
                <li key={label}>
                  <span className={styles.track} aria-hidden="true">
                    <span className={styles.bar} data-peak={steps > 0 && steps === health.topMonth.steps}
                      style={{ height: steps > 0 ? `${100 * designBarHeights[index] / tallestBar}%` : 0 }} />
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
      <Link href="/insights/sundhed/puls" className={styles.next}>Se din puls</Link>
    </main>
  );
}
