"use client";

import { motion } from "motion/react";
import { textRise } from "@/lib/motion";
import styles from "./PhotoMap.module.css";

const textHidden = { opacity: 0, y: -40 };
const textShown = { opacity: 1, y: 0 };

export default function PhotoMap({ places, topPlace }) {
  return (
    <main className={styles.screen}>
      <div className={styles.content}>
        <h1 className={`${styles.heading} semibold`}>Her blev de fleste af dine minder skabt:</h1>

        <div className={styles.map} />

        <motion.p
          className={`${styles.text} regular`}
          initial={textHidden}
          animate={textShown}
          transition={textRise}
        >
          Du tog {topPlace.photos.toLocaleString("da-DK")} billeder i {topPlace.place}
        </motion.p>
      </div>
    </main>
  );
}
