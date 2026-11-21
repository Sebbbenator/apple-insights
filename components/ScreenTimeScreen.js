"use client";

import Image from "next/image";
import { MotionConfig, motion } from "motion/react";
import styles from "./ScreenTimeScreen.module.css";

const textHidden = { opacity: 0, y: -40 };
const textShown = { opacity: 1, y: 0 };
const textTransition = {
  opacity: { duration: 0.4, ease: [0.5, 0, 0.5, 1] },
  y: { duration: 0.6, ease: [0.05, 0.4, 0.5, 1] },
};

export default function ScreenTimeScreen({ hours }) {
  return (
    <MotionConfig reducedMotion="user">
      <main className={styles.screen}>
        <div className={`radial-indigo ${styles.glow} ${styles.top}`} />
        <div className={`radial-indigo ${styles.glow} ${styles.bottom}`} />
        <Image
          src="/screentime/wheel.svg"
          alt=""
          width={683}
          height={683}
          className={styles.wheel}
          priority
        />

        <motion.h1
          className={`${styles.text} semibold`}
          initial={textHidden}
          animate={textShown}
          transition={textTransition}
        >
          <span>Du har brugt</span>
          <span className={styles.number}>
            {hours.toLocaleString("da-DK")}
            <br />
            timer
          </span>
          <span>på din telefon</span>
        </motion.h1>
      </main>
    </MotionConfig>
  );
}
