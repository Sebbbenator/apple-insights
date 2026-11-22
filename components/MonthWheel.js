"use client";

import { useEffect } from "react";
import { useRive } from "@rive-app/react-webgl2";
import { setRiveInput } from "@/lib/rive";
import styles from "./MonthWheel.module.css";

const stateMachine = "State Machine 1";

export default function MonthWheel({ progress, calm }) {
  const { rive, RiveComponent } = useRive({
    src: "/rive/introduction.riv",
    stateMachines: stateMachine,
    autoplay: true,
  });

  useEffect(() => {
    setRiveInput(rive, stateMachine, "progress", calm ? 0 : progress);
    setRiveInput(rive, stateMachine, "calm", calm);
  }, [rive, progress, calm]);

  return <RiveComponent className={styles.wheel} aria-hidden="true" />;
}
