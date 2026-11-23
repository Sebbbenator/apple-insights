"use client";

import { useEffect } from "react";
import StatusScreen from "@/components/StatusScreen";
import styles from "./ErrorState.module.css";

export default function ErrorState({ error, retry, text }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusScreen title="Noget gik galt" text={`${text} Tjek din forbindelse, og prøv igen.`}>
      <button type="button" className={styles.retry} onClick={() => retry()}>
        Prøv igen
      </button>
    </StatusScreen>
  );
}
