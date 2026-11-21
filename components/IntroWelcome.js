import Link from "next/link";
import styles from "./IntroWelcome.module.css";

export default function IntroWelcome() {
  return (
    <main className={styles.welcome}>
      <h1 className={`${styles.title} semibold`} aria-label="Apple Insights 2026">
        <span className={styles.apple}>Apple</span>
        <span className={`${styles.insights} text-gradient-rainbow`}>Insights</span>
        <span className={`${styles.year} text-gradient-silver`}>
          20
          <br />
          26
        </span>
      </h1>

      <Link href="/insights/oversigt" className={styles.next}>
        Swipe for at fortsætte <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
