"use client";

import { useEffect } from "react";
import { useRive } from "@rive-app/react-webgl2";
import { setRiveInput } from "@/lib/rive";
import styles from "./SpeedStripes.module.css";

const stateMachine = "State Machine 1";

export default function SpeedStripes({ holding, progress }) {
  const { rive, RiveComponent } = useRive({
    src: "/rive/stripes.riv",
    stateMachines: stateMachine,
    autoplay: true,
  });

  useEffect(() => {
    setRiveInput(rive, stateMachine, "holding", holding);
    setRiveInput(rive, stateMachine, "progress", progress);
  }, [rive, holding, progress]);

  return (
    <RiveComponent
      className={`${styles.stripes} ${holding ? styles.visible : ""}`}
      aria-hidden="true"
    />
  );
}
