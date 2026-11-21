"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function ShareActivity({ text }) {
  const [status, setStatus] = useState("");

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Din aktivitet i 2026", text });
      } else {
        await navigator.clipboard.writeText(text);
        setStatus("Din aktivitet er kopieret.");
      }
    } catch (error) {
      if (error.name !== "AbortError") setStatus(text);
    }
  }

  return (
    <>
      <button className={styles.share} type="button" onClick={share}>Del</button>
      <span role="status">{status}</span>
    </>
  );
}
