import styles from "./SiriGlow.module.css";

export default function SiriGlow({ progress, splash = true, className = "" }) {
  const hasProgress = progress !== undefined;

  return (
    <div
      className={`${styles.glow} ${hasProgress ? styles.progress : ""} ${className}`}
      style={hasProgress ? { "--siri-progress": progress } : undefined}
      aria-hidden="true"
    >
      {!hasProgress && splash && <span className={styles.splash} />}
      <span className={styles.soft}>
        <span className={styles.ring} />
      </span>
      <span className={styles.ring} />
    </div>
  );
}
