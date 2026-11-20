import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import styles from "./SettingsBanner.module.css";

export default async function SettingsBanner({ widget }) {
  const user = await getCurrentUser();

  return (
    <Link href={widget.href} className={styles.banner}>
      <span className={`${styles.chip} liquid-glass`}>{user ? "Dit 2026" : "Demo"}</span>
      <Image src={widget.src} alt={widget.alt} width={226} height={76} className={styles.title} priority />
      <svg className={styles.chevron} width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
        <path d="M2 2l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
