"use client";

import { motion } from "motion/react";
import styles from "./LetterTitle.module.css";

const letterStagger = 0.021;
const letterSpring = { type: "spring", stiffness: 100, damping: 12, mass: 1 };

export default function LetterTitle({ text, className }) {
  const words = text.split(" ");
  const wordStarts = words.map((word, wordIndex) => words.slice(0, wordIndex).join("").length);

  return (
    <h1 className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span key={wordIndex}>
            <span className={styles.word}>
              {word.split("").map((letter, letterIndex) => {
                const index = wordStarts[wordIndex] + letterIndex + 1;
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
