import Image from "next/image";
import Link from "next/link";
import { getAppHref, getAppIcon } from "@/lib/apps";
import styles from "./AppIcon.module.css";

export default function AppIcon({ app, showName = true }) {
  return (
    <Link href={getAppHref(app)} className={styles.app}>
      <Image src={getAppIcon(app)} alt="" width={64} height={64} className={styles.icon} />
      <span className={showName ? styles.name : "sr-only"}>{app.name}</span>
    </Link>
  );
}
