import SettingsRow from "@/components/SettingsRow";
import styles from "./SettingsCard.module.css";

export default function SettingsCard({ rows }) {
  return (
    <ul className={styles.card}>
      {rows.map((row) => (
        <li key={row.id} className={styles.item}>
          <SettingsRow row={row} />
        </li>
      ))}
    </ul>
  );
}
