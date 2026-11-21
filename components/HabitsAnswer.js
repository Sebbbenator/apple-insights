"use client";

import { MotionConfig } from "motion/react";
import LetterTitle from "@/components/LetterTitle";
import styles from "./HabitsAnswer.module.css";

const labels = [
  { text: "00", className: "top" },
  { text: "06", className: "right" },
  { text: "12", className: "bottom" },
  { text: "18", className: "left" },
];

export default function HabitsAnswer({ title, peakHour, summary, bars }) {
  return (
    <MotionConfig reducedMotion="user">
      <main className={styles.screen}>
        <div className={`${styles.glow} ${styles.first}`} />
        <div className={`${styles.glow} ${styles.second}`} />

        <div className={styles.content}>
          <LetterTitle text={title} className={styles.title} />

          <div className={styles.dial}>
            <div aria-hidden="true">
              {bars.map((bar) => (
                <span
                  key={bar.hour}
                  className={`${styles.bar} ${bar.peak ? styles.peak : ""}`}
                  style={{ "--hour": bar.hour, "--size": bar.size }}
                />
              ))}
              {labels.map((label) => (
                <span key={label.text} className={`${styles.label} ${styles[label.className]} semibold`}>
                  {label.text}
                </span>
              ))}
            </div>

            <p className={`${styles.center} semibold`}>
              <span className={styles.caption}>Du er mest aktiv</span>
              <span className={styles.hour}>{peakHour}</span>
            </p>
          </div>

          <p className={`${styles.summary} regular`}>{summary}</p>
        </div>
      </main>
    </MotionConfig>
  );
}
