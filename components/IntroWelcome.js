"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import GlitchYear from "@/components/GlitchYear";
import SiriGlow from "@/components/SiriGlow";
import styles from "./IntroWelcome.module.css";

const popEase = [0.4, 1.75, 0.3, 1];
const hidden = { opacity: 0, scale: 0 };
const shown = { opacity: 1, scale: 1 };
const holdTime = 1000;
const waitTime = 3000;
const exitTime = 700;
const exit = { scale: 2.5, opacity: 0, filter: "blur(8px)" };
const exitEase = [0.15, 0.85, 0.3, 1];

function popAfter(delay) {
  return { duration: 0.9, ease: popEase, delay: delay, opacity: { duration: 0.2, delay: delay } };
}

export default function IntroWelcome() {
  const router = useRouter();
  const holdTimer = useRef(null);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!ready || leaving) {
      return;
    }
    const timer = setTimeout(() => setLeaving(true), waitTime);
    return () => clearTimeout(timer);
  }, [ready, leaving]);

  useEffect(() => {
    if (!leaving) {
      return;
    }
    const timer = setTimeout(() => router.push("/insights/introduction"), exitTime);
    return () => clearTimeout(timer);
  }, [leaving, router]);

  function startHold() {
    holdTimer.current = setTimeout(() => setLeaving(true), holdTime);
  }

  function stopHold() {
    clearTimeout(holdTimer.current);
  }

  return (
    <main className={styles.welcome}>
      <SiriGlow />
      <motion.h1
        className={`${styles.title} semibold`}
        aria-label="Apple Insights 2026"
        animate={leaving ? exit : { scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: exitTime / 1000, ease: exitEase }}
      >
        <motion.span
          className={styles.apple}
          initial={hidden}
          animate={shown}
          transition={popAfter(0.3)}
        >
          Apple
        </motion.span>
        <motion.span
          className={`${styles.insights} text-gradient-apple`}
          initial={hidden}
          animate={shown}
          transition={popAfter(0.45)}
        >
          Insights
        </motion.span>
        <span
          className={styles.hold}
          onPointerDown={startHold}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
          onPointerCancel={stopHold}
        >
          <GlitchYear onDone={() => setReady(true)} />
        </span>
      </motion.h1>
    </main>
  );
}
