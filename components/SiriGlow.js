import styles from "./SiriGlow.module.css";

export default function SiriGlow({ progress, className = "" }) {
  const hasProgress = progress !== undefined;

  return (
    <div
      className={`${styles.glow} ${hasProgress ? styles.progress : ""} ${className}`}
      style={hasProgress ? { "--siri-progress": progress } : undefined}
      aria-hidden="true"
    >
      {!hasProgress && <span className={styles.splash} />}
      <span className={styles.soft}>
        <span className={styles.ring} />
      </span>
      <span className={styles.ring} />
    </div>
  );
}
