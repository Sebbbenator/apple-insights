"use client";

import { useFormStatus } from "react-dom";
import styles from "./SubmitButton.module.css";

export default function SubmitButton({ children, pendingText, variant = "primary" }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={`${styles.button} ${styles[variant]}`} disabled={pending}>
      {pending ? pendingText : children}
    </button>
  );
}
