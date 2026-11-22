import Image from "next/image";
import Link from "next/link";
import { getSettingsIcon } from "@/lib/settings";
import styles from "./SettingsRow.module.css";

export default function SettingsRow({ row }) {
  const content = (
    <>
      <Image src={getSettingsIcon(row)} alt="" width={29} height={29} className={styles.icon} />
      <span className={styles.name}>{row.name}</span>
      <svg className={styles.chevron} width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
        <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );

  if (!row.href) {
    return <div className={styles.row}>{content}</div>;
  }

  return (
    <Link href={row.href} className={styles.row}>
      {content}
    </Link>
  );
}
