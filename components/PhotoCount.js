"use client";

import Image from "next/image";
import { MotionConfig, motion } from "motion/react";
import Blitz from "@/components/Blitz";
import styles from "./PhotoCount.module.css";

const cards = [
  { x: -6, y: -10.7, rotate: -15 },
  { x: -5.8, y: -10.9, rotate: 30 },
  { x: -3.5, y: -10.9, rotate: -30 },
  { x: 0, y: -4, rotate: 8 },
  { x: -13, y: 3, rotate: -9 },
  { x: 2.6, y: 5.6, rotate: -30 },
  { x: -10, y: 10.9, rotate: 30 },
  { x: 8, y: 4, rotate: -12 },
  { x: 12.1, y: -5.8, rotate: -30 },
  { x: -4, y: 2, rotate: 22 },
  { x: 5.8, y: -0.2, rotate: 0 },
  { x: -11.9, y: 7.7, rotate: 18.5 },
];

const cardDelay = 0.08;

const textHidden = { opacity: 0, y: -40 };
const textShown = { opacity: 1, y: 0 };
const textTransition = {
  opacity: { duration: 0.4, ease: [0.5, 0, 0.5, 1] },
  y: { duration: 0.6, ease: [0.05, 0.4, 0.5, 1] },
};

export default function PhotoCount({ total, photos }) {
  return (
    <MotionConfig reducedMotion="user">
      <main className={styles.screen}>
        <Blitz />

        <div className={styles.stack} aria-hidden="true">
          {photos.map((photo, index) => {
            const card = cards[index % cards.length];

            return (
              <motion.div
                key={photo.position}
                className={styles.card}
                style={{ "--x": card.x, "--y": card.y }}
                initial={{ opacity: 0, scale: 1.4, y: -40, rotate: card.rotate - 25 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: card.rotate }}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                  duration: 0.6,
                  delay: index * cardDelay,
                  opacity: { duration: 0.15, delay: index * cardDelay },
                }}
              >
                <Image src={photo.src} alt="" fill sizes="190px" className={styles.image} />
              </motion.div>
            );
          })}
        </div>

        <motion.h1
          className={`${styles.text} semibold`}
          initial={textHidden}
          animate={textShown}
          transition={textTransition}
        >
          <span>Du har taget</span>
          <span className={`${styles.number} text-gradient-silver`}>
            {total.toLocaleString("da-DK")}
          </span>
          <span className={styles.year}>fotos i 2026</span>
        </motion.h1>
      </main>
    </MotionConfig>
  );
}
