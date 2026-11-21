import styles from "./page.module.css";

export default function Loading() {
  return (
    <main className={styles.state}>
      <p role="status">Henter din skærmtid…</p>
    </main>
  );
}
