import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import styles from "./AccountCard.module.css";

function Chevron() {
  return (
    <svg className={styles.chevron} width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
      <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function AccountCard() {
  const currentUser = await getCurrentProfile();

  if (!currentUser) {
    return (
      <Link href="/login" className={`${styles.card} ${styles.login}`}>
        <span className={styles.avatar} aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
            <circle cx="20" cy="15" r="7" />
            <path d="M6 34c2.5-6 8-9 14-9s11.5 3 14 9" />
          </svg>
        </span>
        <span className={styles.text}>
          <span className={styles.loginTitle}>Log ind og se dit eget 2026</span>
          <span className={styles.caption}>Eller prøv demoen herunder</span>
        </span>
        <Chevron />
      </Link>
    );
  }

  return (
    <Link href="/profile" className={styles.card}>
      {currentUser.image ? (
        <img src={currentUser.image} alt="" className={styles.avatar} />
      ) : (
        <span className={styles.avatar} aria-hidden="true">
          {currentUser.name.charAt(0)}
        </span>
      )}
      <span className={styles.text}>
        <span className={styles.name}>{currentUser.name}</span>
        <span className={styles.caption}>Apple-konto, iCloud+ m.m.</span>
      </span>
      <Chevron />
    </Link>
  );
}
