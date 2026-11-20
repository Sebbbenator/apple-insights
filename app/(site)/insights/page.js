import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth";
import styles from "./page.module.css";

export const metadata = {
  title: "Dit 2026",
};

export default async function InsightsPage() {
  const currentUser = await getCurrentProfile();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <main className={styles.insights}>
      <h1>Dit 2026, {currentUser.name}</h1>
      <p>Her kommer historien.</p>
    </main>
  );
}
