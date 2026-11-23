import Image from "next/image";
import StatusScreen from "@/components/StatusScreen";
import { getInsights } from "@/lib/insights";
import styles from "./page.module.css";

export const metadata = {
  title: "Dit år i skridt",
};

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

function formatNumber(number) {
  return number.toLocaleString("da-DK");
}

export default async function StepsPage() {
  const insights = await getInsights();

  if (!insights || insights.health.steps === 0) {
    return (
      <StatusScreen
        title="Ingen skridt endnu"
        text="Vi har ikke nogen skridt fra dit 2026 endnu. Prøv igen senere."
      />
    );
  }

  const health = insights.health;
  const topSteps = health.topMonth.steps;
  const stepsByMonth = new Map(insights.months.map((row) => [row.month, row.steps]));

  return (
    <main className={styles.screen}>
      <div className={`radial-pink ${styles.glow}`} />
      <h1 className={styles.heading}>
        I 2026 gik du
        <strong>{formatNumber(health.steps)}</strong>
        skridt
      </h1>

      <ul className={styles.chart} aria-label="Skridt pr. måned i 2026">
        {monthLabels.map((label, index) => {
          const steps = stepsByMonth.get(index + 1) ?? 0;

          return (
            <li key={label}>
              <span className={styles.track} aria-hidden="true">
                <span
                  className={styles.bar}
                  data-peak={steps === topSteps}
                  style={{ height: `${(100 * steps) / topSteps}%`, "--month": index }}
                />
              </span>
              {label}
              <span className="sr-only">, {formatNumber(steps)} skridt</span>
            </li>
          );
        })}
      </ul>

      <p className={styles.record}>
        <span className="sr-only">Måned med flest skridt: </span>
        <span className={styles.recordMonth}>
          <Image src="/homescreen/widgets/flame.svg" alt="" width={17} height={23} />
          {health.topMonth.name}
        </span>
        <strong>{formatNumber(topSteps)}</strong>
        <span>skridt</span>
      </p>
    </main>
  );
}
