"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MonthWheel from "@/components/MonthWheel";
import SiriGlow from "@/components/SiriGlow";
import SpeedStripes from "@/components/SpeedStripes";
import styles from "./IntroductionScreen.module.css";

const holdTime = 2500;
const returnTime = 1000;
const holdKeys = [" ", "Enter"];

function formatNumber(number) {
  return number.toLocaleString("da-DK");
}

export default function IntroductionScreen({ stats }) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(100);
  const [bursting, setBursting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (holding && progress >= 100) {
      setBursting(true);
    }
  }, [holding, progress]);

  useEffect(() => {
    if (bursting) {
      return;
    }

    let frame;
    let lastTime = performance.now();

    function tick(time) {
      const step = time - lastTime;
      lastTime = time;
      setProgress((current) => {
        const next = holding
          ? current + (step / holdTime) * 100
          : current - (step / returnTime) * 100;
        return Math.min(100, Math.max(0, next));
      });
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [holding, bursting]);

  function startHold() {
    if (!bursting) {
      setHolding(true);
    }
  }

  function stopHold() {
    setHolding(false);
  }

  function handleKeyDown(event) {
    if (holdKeys.includes(event.key)) {
      event.preventDefault();
      startHold();
    }
  }

  function handleKeyUp(event) {
    if (holdKeys.includes(event.key)) {
      stopHold();
    }
  }

  const summary = stats.map((stat) => `${formatNumber(stat.value)} ${stat.label}`).join(", ");

  return (
    <main className={`${styles.screen} ${bursting ? styles.bursting : ""}`}>
      <div className={`radial-white ${styles.glow}`} />
      <SpeedStripes holding={holding} progress={progress} />

      <h1 className="sr-only">Dit 2026 i tal</h1>
      <p className="sr-only">{summary}</p>
      <ul className={styles.stats} aria-hidden="true">
        {stats.map((stat) => (
          <li key={stat.label} className={`${styles.stat} ${styles[stat.color]}`}>
            <span className={styles.number}>
              {formatNumber(Math.round(stat.value * (1 - progress / 100)))}
            </span>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>

      <div className={styles.wave} onAnimationEnd={() => router.push("/insights/oversigt")} />

      <div className={styles.hold}>
        <MonthWheel progress={progress} />
        <button
          type="button"
          className={styles.button}
          aria-label="Hold nede for at spole året tilbage"
          onPointerDown={startHold}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
          onPointerCancel={stopHold}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={stopHold}
          onContextMenu={(event) => event.preventDefault()}
        >
          <SiriGlow progress={progress} className={styles.ring} />
          <span className={`${styles.label} regular text-gradient-silver`}>Hold nede</span>
        </button>
      </div>
    </main>
  );
}
