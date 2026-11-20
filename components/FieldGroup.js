import styles from "./FieldGroup.module.css";

export default function FieldGroup({ children, title, footnote }) {
  return (
    <div className={styles.section}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.group}>{children}</div>
      {footnote && <p className={styles.footnote}>{footnote}</p>}
    </div>
  );
}
