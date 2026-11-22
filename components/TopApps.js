import Image from "next/image";
import ShareButton from "@/components/ShareButton";
import styles from "./TopApps.module.css";

export default function TopApps({ title, persona, detail, rows, glow }) {
  return (
    <main className={styles.screen} style={{ "--app-glow": `var(--color-${glow})` }}>
      <div className={`${styles.glow} ${styles.top}`} />
      <div className={`${styles.glow} ${styles.strong} ${styles.strongTop}`} />
      <div className={`${styles.glow} ${styles.bottom}`} />
      <div className={`${styles.glow} ${styles.strong} ${styles.strongBottom}`} />

      <h1 className={`${styles.title} text-gradient-silver`}>{title}</h1>

      <ol className={styles.list}>
        {rows.map((row, index) => (
          <li
            key={row.name}
            className={styles.row}
            style={{ "--fill": `${row.fill}%`, "--tint": `var(--color-${row.color})`, "--rank": index }}
          >
            <span className={styles.rank}>{index + 1}</span>
            <Image src={row.icon} alt="" width={54} height={54} className={styles.icon} />
            <span className={`${styles.name} semibold text-gradient-silver`}>{row.name}</span>
            <span className={`${styles.hours} regular`}>{row.hours}</span>
          </li>
        ))}
      </ol>

      <div className={styles.footer}>
        <p className={`${styles.persona} semibold text-gradient-silver`}>{persona}</p>
        <p className={`${styles.detail} semibold`}>{detail}</p>
        <ShareButton text={`${title}. Jeg er ${persona.toLowerCase()} i Apple Insights 2026.`} />
      </div>
    </main>
  );
}
