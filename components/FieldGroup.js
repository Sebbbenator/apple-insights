import styles from "./FieldGroup.module.css";

export default function FieldGroup({ children, footnote }) {
  return (
    <div className={styles.section}>
      <div className={styles.group}>{children}</div>
      {footnote && <p className={styles.footnote}>{footnote}</p>}
    </div>
  );
}
