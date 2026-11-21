"use client";

import Link from "next/link";
import { MotionConfig, motion } from "motion/react";
import SiriGlow from "@/components/SiriGlow";
import styles from "./IntroWelcome.module.css";

const durationSlow = 0.6;
const easeOut = [0.22, 1, 0.36, 1];

const hidden = { opacity: 0, y: 24 };
const shown = { opacity: 1, y: 0 };

function revealAfter(delay) {
  return { duration: durationSlow, ease: easeOut, delay: delay };
}

export default function IntroWelcome() {
  return (
    <MotionConfig reducedMotion="user">
      <main className={styles.welcome}>
        <SiriGlow />

        <h1 className={`${styles.title} semibold`} aria-label="Apple Insights 2026">
          <motion.span className={styles.apple} initial={hidden} animate={shown} transition={revealAfter(0.3)}>
            Apple
          </motion.span>
          <motion.span
            className={`${styles.insights} text-gradient-rainbow`}
            initial={hidden}
            animate={shown}
            transition={revealAfter(0.45)}
          >
            Insights
          </motion.span>
          <motion.span initial={hidden} animate={shown} transition={revealAfter(0.6)}>
            <span className={`${styles.year} text-gradient-silver`}>
              20
              <br />
              26
            </span>
          </motion.span>
        </h1>

        <motion.div
          className={styles.next}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={revealAfter(1.2)}
        >
          <Link href="/insights/oversigt" className={styles.link}>
            Swipe for at fortsætte
            <motion.span
              aria-hidden="true"
              animate={{ x: [0, 10] }}
              transition={{ duration: 0.5, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </main>
    </MotionConfig>
  );
}
