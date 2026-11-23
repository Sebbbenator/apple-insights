"use client";

import { useState } from "react";
import styles from "./ShareButton.module.css";

export default function ShareButton({ text }) {
  const [status, setStatus] = useState("");

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Apple Insights 2026", text: text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setStatus("Kopieret");
    } catch (error) {
      if (error.name !== "AbortError") {
        setStatus("Kunne ikke dele");
      }
    }
  }

  return (
    <>
      <button type="button" className={`${styles.button} semibold`} onClick={share}>
        {status === "Kopieret" ? status : "Del"}
      </button>
      <span className="sr-only" role="status">
        {status}
      </span>
    </>
  );
}
