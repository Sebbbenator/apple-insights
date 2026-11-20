import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import styles from "./page.module.css";

export const metadata = {
  title: "Dit 2026",
};

export default async function InsightsPage() {
  const currentUser = await getCurrentProfile();

  if (!currentUser) {
    return (
      <main className={styles.insights}>
        <span className={styles.demo}>Demo</span>
        <h1>Et 2026 på en iPhone</h1>
        <p>Du ser en demo med eksempeldata.</p>
        <p>
          <Link href="/login">Log ind for at se dit eget 2026</Link>
        </p>
      </main>
    );
  }

  return (
    <main className={styles.insights}>
      <h1>Dit 2026, {currentUser.name}</h1>
      <p>Her kommer historien.</p>
    </main>
  );
}
