import styles from "../page.module.css";

export default function Loading() {
  return (
    <main className={styles.state}>
      <p role="status">Henter dit svar…</p>
    </main>
  );
}
