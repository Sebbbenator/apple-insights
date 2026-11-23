import Image from "next/image";
import AppIcon from "@/components/AppIcon";
import CalendarWidget from "@/components/CalendarWidget";
import Dock from "@/components/Dock";
import ImageWidget from "@/components/ImageWidget";
import StatusBar from "@/components/StatusBar";
import { homeApps } from "@/lib/apps";
import styles from "./HomeScreen.module.css";

export default function HomeScreen() {
  return (
    <main className={styles.home}>
      <Image
        src="/homescreen/wallpaper.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 430px) 100vw, 430px"
        className={styles.wallpaper}
      />

      <StatusBar />
      <h1 className="sr-only">Hjemmeskærm</h1>

      <div className={styles.widgets}>
        <ImageWidget src="/homescreen/widgets/widget-front-page.svg" alt="Apple Insights 2026" name="Indstillinger" href="/indstillinger" />
        <CalendarWidget />
      </div>

      <ul className={styles.apps}>
        {homeApps.map((app) => (
          <li key={app.id}>
            <AppIcon app={app} />
          </li>
        ))}
      </ul>

      <div className={styles.bottom}>
        <p className={`${styles.search} liquid-glass`} aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <circle cx="4.5" cy="4.5" r="3.75" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7.5 7.5L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Søg
        </p>
        <Dock />
      </div>
    </main>
  );
}
