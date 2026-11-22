"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import Avatar from "@/components/Avatar";
import Blitz from "@/components/Blitz";
import styles from "./PhotoWheel.module.css";

const step = 30;

function shortestSteps(from, to, count) {
  const steps = (((to - from) % count) + count) % count;
  return steps > count / 2 ? steps - count : steps;
}

export default function PhotoWheel({ months, startMonth, name, image }) {
  const startIndex = months.findIndex((item) => item.month === startMonth);
  const [selectedIndex, setSelectedIndex] = useState(startIndex);
  const [turn, setTurn] = useState(startIndex * -step);
  const selected = months[selectedIndex];

  function select(index) {
    setTurn(turn - shortestSteps(selectedIndex, index, months.length) * step);
    setSelectedIndex(index);
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className={styles.screen}>
        <Blitz />

        <div className={styles.selected} aria-live="polite">
          <AnimatePresence initial={false}>
            <motion.figure
              key={selected.month}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={selected.photo.src}
                alt={selected.photo.alt}
                fill
                sizes="380px"
                className={styles.image}
              />
              <figcaption className={styles.label}>
                <span className={`${styles.month} regular`}>{selected.name}</span>
                <span className={`${styles.count} semibold`}>
                  {selected.photos.toLocaleString("da-DK")} billeder
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <motion.div
          className={styles.wheel}
          role="group"
          aria-label="Vælg en måned"
          initial={false}
          animate={{ rotate: turn }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        >
          {months.map((item, index) => (
            <button
              key={item.month}
              type="button"
              className={styles.thumb}
              style={{ "--angle": `${index * step}deg` }}
              aria-label={`${item.name}, ${item.photos.toLocaleString("da-DK")} billeder`}
              aria-pressed={index === selectedIndex}
              onClick={() => select(index)}
            >
              <Image src={item.photo.src} alt="" fill sizes="80px" className={styles.image} />
            </button>
          ))}
        </motion.div>

        <div className={styles.avatar}>
          <Avatar name={name} image={image} size="xl" />
        </div>
      </main>
    </MotionConfig>
  );
}
