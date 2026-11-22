import Image from "next/image";
import Link from "next/link";
import styles from "./SettingsBanner.module.css";

export default function SettingsBanner({ widget }) {
  return (
    <Link href={widget.href} className={styles.banner}>
      <Image src={widget.src} alt={widget.alt} width={330} height={100} className={styles.image} priority />
    </Link>
  );
}
