"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import LetterTitle from "@/components/LetterTitle";
import styles from "./HabitsQuiz.module.css";

const choicesDelay = 3;
const waitTime = 750;

export default function HabitsQuiz({ periods }) {
  const [chosen, setChosen] = useState(null);
  const router = useRouter();
  const calm = useReducedMotion();
  const delay = calm ? 0 : choicesDelay;

  useEffect(() => {
    if (!chosen) {
      return;
    }
    const timer = setTimeout(() => router.push(`/insights/vaner/svar?gaet=${chosen}`), waitTime);
    return () => clearTimeout(timer);
  }, [chosen, router]);

  return (
    <MotionConfig reducedMotion="user">
      <main className={styles.screen}>
        <div className={`radial-indigo ${styles.glow} ${styles.top}`} />
        <div className={`radial-indigo ${styles.glow} ${styles.bottom}`} />

        <div className={styles.content}>
          <LetterTitle text="Hvor godt kender du dine skærmvaner" className={styles.title} />

          <motion.div
            className={styles.choices}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              opacity: { duration: 0.4, delay: delay, ease: [0.09, 0.55, 0.5, 1] },
              scale: { duration: 0.78, delay: delay, ease: [0.15, 0.52, 0.5, 1] },
              y: { duration: 1, delay: delay, ease: [0.3, -1.2, 0.45, 1] },
            }}
          >
            {periods.map((period) => (
              <button
                key={period.id}
                type="button"
                className={`${styles.choice} ${chosen === period.id ? styles.chosen : ""}`}
                aria-pressed={chosen === period.id}
                disabled={chosen !== null}
                onClick={() => setChosen(period.id)}
              >
                <span className="semibold text-gradient-silver">{period.name}</span>
              </button>
            ))}
          </motion.div>

          <p className={`${styles.hint} regular`}>
            Hvornår på dagen er du mest aktiv?
            <br />
            Tag et gæt
          </p>
        </div>
      </main>
    </MotionConfig>
  );
}
