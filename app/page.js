import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main>
      <section className={styles.intro}>
        <h1>Apple Insights 2026</h1>
        <p>Dit år med skærmtid, fotos og sundhed.</p>
      </section>

      <Link href="/insights">Se dit 2026</Link>
    </main>
  );
}
