"use client";

import Image from "next/image";
import { motion } from "motion/react";
import SlotNumber from "@/components/SlotNumber";
import { textRise } from "@/lib/motion";
import styles from "./ScreenTimeScreen.module.css";

const textHidden = { opacity: 0, y: -40 };
const textShown = { opacity: 1, y: 0 };

export default function ScreenTimeScreen({ hours }) {
  return (
    <main className={styles.screen}>
      <div className={`radial-indigo ${styles.glow} ${styles.top}`} />
      <div className={`radial-indigo ${styles.glow} ${styles.strong} ${styles.strongTop}`} />
      <div className={`radial-indigo ${styles.glow} ${styles.bottom}`} />
      <div className={`radial-indigo ${styles.glow} ${styles.strong} ${styles.strongBottom}`} />
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
        transition={textRise}
      >
        <span>Du har brugt</span>
        <span className={styles.number}>
          <SlotNumber value={hours} />
          <span>timer</span>
        </span>
        <span>på din telefon</span>
      </motion.h1>
    </main>
  );
}
