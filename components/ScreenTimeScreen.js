import Image from "next/image";
import styles from "./ScreenTimeScreen.module.css";

export default function ScreenTimeScreen({ hours }) {
  return (
    <main className={styles.screen}>
      <div className={`radial-indigo ${styles.glow} ${styles.top}`} />
      <div className={`radial-indigo ${styles.glow} ${styles.bottom}`} />
      <Image
        src="/screentime/wheel.svg"
        alt=""
        width={683}
        height={683}
        className={styles.wheel}
        priority
      />

      <h1 className={`${styles.text} semibold`}>
        <span>Du har brugt</span>
        <span className={styles.number}>
          {hours.toLocaleString("da-DK")}
          <br />
          timer
        </span>
        <span>på din telefon</span>
      </h1>
    </main>
  );
}
