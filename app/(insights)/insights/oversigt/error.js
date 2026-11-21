"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

export default function Error({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.insights}>
      <h1>Noget gik galt</h1>
      <p>Vi kunne ikke hente dit 2026. Tjek din forbindelse, og prøv igen.</p>
      <button type="button" className={styles.retry} onClick={() => retry()}>
        Prøv igen
      </button>
    </main>
  );
}
