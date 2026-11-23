import styles from "./StatusScreen.module.css";

export default function StatusScreen({ title, text, loading = false, children }) {
  return (
    <main className={styles.state}>
      {title && <h1>{title}</h1>}
      <p role={loading ? "status" : undefined}>{text}</p>
      {children}
    </main>
  );
}
