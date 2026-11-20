import Link from "next/link";
import AuthStatus from "@/components/AuthStatus";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Apple Insights
        </Link>
        <ul className={styles.links}>
          <li>
            <Link href="/">Forside</Link>
          </li>
          <li>
            <Link href="/insights">Dit 2026</Link>
          </li>
          <li>
            <Link href="/profile">Profil</Link>
          </li>
        </ul>
        <AuthStatus />
      </nav>
    </header>
  );
}
