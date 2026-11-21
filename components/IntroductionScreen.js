import SiriGlow from "@/components/SiriGlow";
import styles from "./IntroductionScreen.module.css";

export default function IntroductionScreen({ stats }) {
  return (
    <main className={styles.screen}>
      <div className={`radial-white ${styles.glow}`} />

      <h1 className="sr-only">Dit 2026 i tal</h1>
      <ul className={styles.stats}>
        {stats.map((stat) => (
          <li key={stat.label} className={`${styles.stat} ${styles[stat.color]}`}>
            <span className={styles.number}>{stat.value.toLocaleString("da-DK")}</span>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>

      <div className={styles.hold}>
        <button type="button" className={styles.button}>
          <SiriGlow progress={65} className={styles.ring} />
          <span className={`${styles.label} regular text-gradient-silver`}>Hold nede</span>
        </button>
      </div>
    </main>
  );
}
