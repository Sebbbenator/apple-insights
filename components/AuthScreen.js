import BackButton from "@/components/BackButton";
import styles from "./AuthScreen.module.css";

export default function AuthScreen({ title, description, error, children, footer }) {
  return (
    <main className={styles.screen}>
      <BackButton href="/indstillinger" label="Tilbage til Indstillinger" />

      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">
          <svg width="56" height="56" viewBox="0 0 40 40" fill="currentColor">
            <circle cx="20" cy="15" r="7" />
            <path d="M6 34c2.5-6 8-9 14-9s11.5 3 14 9" />
          </svg>
        </span>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        {error && (
          <p id="form-error" className={styles.error} role="alert">
            {error}
          </p>
        )}

        {children}

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>

      <p className={styles.privacy}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2.5l7.5 3v6c0 4.6-3.2 8.6-7.5 10-4.3-1.4-7.5-5.4-7.5-10v-6l7.5-3z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M8.5 12l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Studieprojekt. Dine oplysninger bruges kun til at vise dit eget 2026 og deles ikke med andre.
      </p>
    </main>
  );
}
