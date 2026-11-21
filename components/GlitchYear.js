"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { dockApps, getAppIcon, homeApps } from "@/lib/apps";
import TimeDust from "@/components/TimeDust";
import styles from "./GlitchYear.module.css";

const icons = [...homeApps, ...dockApps].map(getAppIcon);
const digits = ["2", "0", "2", "6"];
const startDelay = 600;
const landAt = [14, 16, 18, 20];
const lastStep = 20;
const spring = { type: "spring", stiffness: 300, damping: 14 };

function stepTime(step) {
  return 50 + step * 7;
}

export default function GlitchYear({ leaving, onDone }) {
  const reduceMotion = useReducedMotion();
  const digitsRef = useRef(null);
  const [step, setStep] = useState(-1);
  const done = step >= lastStep;

  useEffect(() => {
    if (done) {
      onDone();
    }
  }, [done, onDone]);

  useEffect(() => {
    if (done) {
      return;
    }

    if (reduceMotion) {
      const timer = setTimeout(() => setStep(lastStep), 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setStep(step + 1), step < 0 ? startDelay : stepTime(step));
    return () => clearTimeout(timer);
  }, [step, done, reduceMotion]);

  return (
    <span className={styles.year}>
      <span ref={digitsRef} className={styles.digits}>
        {digits.map((digit, index) => {
          const landed = step >= landAt[index];
          const icon = icons[(step + index * 5) % icons.length];
          const jitter = ((step + index) % 3) - 1;

          return (
            <span key={index} className={styles.cell}>
              <motion.span
                initial={false}
                animate={leaving ? { opacity: 0 } : landed ? { opacity: 1, scale: 1, x: 0, y: 0, filter: "blur(0px)" } : { opacity: 0, scale: 1.3, y: 24, filter: "blur(12px)" }}
                transition={leaving ? { duration: reduceMotion ? 0.6 : 0 } : spring}
              >
                <span data-digit className={`${styles.digit} ${styles[`digit${index}`]} ${done ? styles.shine : ""}`}>
                  {digit}
                </span>
              </motion.span>

              <AnimatePresence>
                {step >= 0 && !landed && !leaving && (
                  <motion.img
                    src={icon}
                    alt=""
                    className={`${styles.icon} ${step % 5 === 0 ? styles.flash : ""}`}
                    style={{ x: jitter * 4 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 1.6, opacity: 0, filter: "blur(12px)" }}
                    transition={{ ...spring, delay: step === 0 ? index * 0.08 : 0 }}
                  />
                )}
              </AnimatePresence>

            </span>
          );
        })}
      </span>

      <TimeDust target={digitsRef} active={leaving} />

      <span hidden>
        {icons.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </span>
    </span>
  );
}
