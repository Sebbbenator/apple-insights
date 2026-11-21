"use client";

import { motion } from "motion/react";
import styles from "./LetterTitle.module.css";

const letterStagger = 0.021;
const letterSpring = { type: "spring", stiffness: 100, damping: 12, mass: 1 };

export default function LetterTitle({ text, className }) {
  let index = 0;

  return (
    <h1 className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, wordIndex) => (
          <span key={wordIndex}>
            <span className={styles.word}>
              {word.split("").map((letter) => {
                index = index + 1;
                return (
                  <motion.span
                    key={index}
                    className={styles.letter}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...letterSpring, delay: index * letterStagger }}
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </span>{" "}
          </span>
        ))}
      </span>
    </h1>
  );
}
