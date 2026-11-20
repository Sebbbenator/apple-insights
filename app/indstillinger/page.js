import AccountCard from "@/components/AccountCard";
import SettingsBanner from "@/components/SettingsBanner";
import SettingsCard from "@/components/SettingsCard";
import StatusBar from "@/components/StatusBar";
import { settingsSections, settingsWidget } from "@/lib/settings";
import styles from "./page.module.css";

export const metadata = {
  title: "Indstillinger",
};

export default function SettingsPage() {
  return (
    <main className={styles.settings}>
      <StatusBar />
      <h1 className={styles.title}>Indstillinger</h1>

      <div className={styles.sections}>
        <AccountCard />
        <SettingsBanner widget={settingsWidget} />

        <nav aria-label="Indstillinger" className={styles.cards}>
          {settingsSections.map((section) => (
            <SettingsCard key={section.id} rows={section.rows} />
          ))}
        </nav>
      </div>

      <p className={`${styles.search} liquid-glass`} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 11 11" fill="none">
          <circle cx="4.5" cy="4.5" r="3.75" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7.5 7.5L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Søg
      </p>
    </main>
  );
}
