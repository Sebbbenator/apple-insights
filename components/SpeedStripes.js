"use client";

import { useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-webgl2";
import styles from "./SpeedStripes.module.css";

const stateMachine = "State Machine 1";

export default function SpeedStripes({ holding }) {
  const { rive, RiveComponent } = useRive({
    src: "/rive/stripes.riv",
    stateMachines: stateMachine,
    autoplay: true,
  });
  const holdingInput = useStateMachineInput(rive, stateMachine, "holding");

  useEffect(() => {
    if (holdingInput) {
      holdingInput.value = holding;
    }
  }, [holdingInput, holding]);

  return <RiveComponent className={styles.stripes} aria-hidden="true" />;
}
