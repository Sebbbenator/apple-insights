import Link from "next/link";
import styles from "./BackButton.module.css";

export default function BackButton({ href, label }) {
  return (
    <nav className={styles.bar}>
      <Link href={href} className={`${styles.back} liquid-glass`} aria-label={label}>
        <svg width="11" height="19" viewBox="0 0 11 19" fill="none" aria-hidden="true">
          <path d="M9.5 1.5l-8 8 8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </nav>
  );
}
