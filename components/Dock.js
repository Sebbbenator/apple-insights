import AppIcon from "@/components/AppIcon";
import { dockApps } from "@/lib/apps";
import styles from "./Dock.module.css";

export default function Dock() {
  return (
    <div className={styles.container}>
      <ul className={styles.dock} aria-label="Dock">
        {dockApps.map((app) => (
          <li key={app.id}>
            <AppIcon app={app} showName={false} />
          </li>
        ))}
      </ul>
    </div>
  );
}
