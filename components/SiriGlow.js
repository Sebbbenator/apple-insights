import styles from "./SiriGlow.module.css";

export default function SiriGlow() {
  return (
    <div className={styles.glow} aria-hidden="true">
      <span className={styles.splash} />
      <span className={styles.soft}>
        <span className={styles.ring} />
      </span>
      <span className={styles.ring} />
    </div>
  );
}
