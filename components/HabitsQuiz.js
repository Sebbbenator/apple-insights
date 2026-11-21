import styles from "./HabitsQuiz.module.css";

export default function HabitsQuiz({ periods }) {
  return (
    <main className={styles.screen}>
      <div className={`radial-indigo ${styles.glow} ${styles.top}`} />
      <div className={`radial-indigo ${styles.glow} ${styles.bottom}`} />

      <div className={styles.content}>
        <h1 className={styles.title}>Hvor godt kender du dine skærmvaner</h1>

        <div className={styles.choices}>
          {periods.map((period) => (
            <button key={period.id} type="button" className={styles.choice}>
              <span className="semibold text-gradient-silver">{period.name}</span>
            </button>
          ))}
        </div>

        <p className={`${styles.hint} regular`}>
          Hvornår på dagen er du mest aktiv?
          <br />
          Tag et gæt
        </p>
      </div>
    </main>
  );
}
