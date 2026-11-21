"use client";

import { useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-webgl2";
import styles from "./MonthWheel.module.css";

const stateMachine = "State Machine 1";

export default function MonthWheel({ progress, calm }) {
  const { rive, RiveComponent } = useRive({
    src: "/rive/introduction.riv",
    stateMachines: stateMachine,
    autoplay: true,
  });
  const progressInput = useStateMachineInput(rive, stateMachine, "progress");
  const calmInput = useStateMachineInput(rive, stateMachine, "calm");

  useEffect(() => {
    if (progressInput) {
      progressInput.value = calm ? 0 : progress;
    }
  }, [progressInput, progress, calm]);

  useEffect(() => {
    if (calmInput) {
      calmInput.value = calm;
    }
  }, [calmInput, calm]);

  return <RiveComponent className={styles.wheel} aria-hidden="true" />;
}
