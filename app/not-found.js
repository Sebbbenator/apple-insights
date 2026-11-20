import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Siden findes ikke</h1>
      <p>Vi kunne ikke finde det, du ledte efter.</p>
      <p>
        <Link href="/">Til hjemmeskærmen</Link>
      </p>
    </main>
  );
}
