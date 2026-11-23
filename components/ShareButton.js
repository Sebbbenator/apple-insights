"use client";

import { useState } from "react";
import styles from "./ShareButton.module.css";

export default function ShareButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: "Apple Insights 2026", text: text }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return (
    <button type="button" className={`${styles.button} semibold`} onClick={share}>
      {copied ? "Kopieret" : "Del"}
    </button>
  );
}
