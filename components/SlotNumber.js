"use client";

import { motion } from "motion/react";
import styles from "./SlotNumber.module.css";

const spinDelay = 0.6;
const spinStagger = 0.15;
const spinTime = 1.5;
const spinEase = [0.22, 1, 0.36, 1];

function Reel({ digit, index }) {
  const steps = 10 + digit;
  const cells = Array.from({ length: steps + 1 }, (_, cell) => cell % 10);

  return (
    <span className={styles.window}>
      <motion.span
        className={styles.reel}
        initial={{ y: 0 }}
        animate={{ y: `${(-100 * steps) / (steps + 1)}%` }}
        transition={{ duration: spinTime, delay: spinDelay + index * spinStagger, ease: spinEase }}
      >
        {cells.map((cell, position) => (
          <span key={position}>{cell}</span>
        ))}
      </motion.span>
    </span>
  );
}

export default function SlotNumber({ value }) {
  const text = value.toLocaleString("da-DK");

  return (
    <span className={styles.number}>
      <span className="sr-only">{text}</span>
      <span className={styles.reels} aria-hidden="true">
        {text.split("").map((char, index) =>
          char >= "0" && char <= "9" ? (
            <Reel key={index} digit={Number(char)} index={index} />
          ) : (
            <span key={index}>{char}</span>
          )
        )}
      </span>
    </span>
  );
}
