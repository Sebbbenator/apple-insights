import Image from "next/image";
import Clock from "@/components/Clock";
import styles from "./StatusBar.module.css";

export default function StatusBar() {
  return (
    <div className={styles.statusBar} aria-hidden="true">
      <Clock className={styles.time} />
      <span className={styles.island} />
      <span className={styles.icons}>
        <Image src="/homescreen/status/cellular.svg" alt="" width={18} height={12} />
        <Image src="/homescreen/status/wifi.svg" alt="" width={19} height={14} />
        <Image src="/homescreen/status/battery.svg" alt="" width={31} height={14} />
      </span>
    </div>
  );
}
