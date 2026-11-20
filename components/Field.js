import styles from "./Field.module.css";

export default function Field({ name, label, type = "text", invalid = false, ...props }) {
  return (
    <div className={`${styles.field} ${invalid ? styles.invalid : ""}`}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={styles.input}
        aria-invalid={invalid}
        aria-describedby={invalid ? "form-error" : undefined}
        {...props}
      />
    </div>
  );
}
