import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = { title: "Din puls gennem 2026" };

export default function PulsePage() {
  return (
    <main className={styles.screen}>
      <h1 className={styles.title}>Din puls<br />gennem 2026</h1>
      <Image className={styles.heart} src="/homescreen/widgets/heart.svg" alt="" width={304} height={275} />
      <dl className={styles.stats}>
        <div className={styles.average}>
          <dt>Gennemsnit</dt>
          <dd>72 bpm</dd>
        </div>
        <div>
          <dt>Laveste</dt>
          <dd>58 bpm<time dateTime="2026-05-12">12. maj</time></dd>
        </div>
        <div>
          <dt>Højeste</dt>
          <dd>115 bpm<time dateTime="2026-12-24">24. dec.</time></dd>
        </div>
      </dl>
      <Link className={styles.next} href="/insights/oversigt">Fortsæt til oversigten</Link>
    </main>
  );
}
