import Image from "next/image";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";
import styles from "./page.module.css";

export const metadata = { title: "Din puls gennem 2026" };

function monthDate(month) {
  return `2026-${String(month).padStart(2, "0")}`;
}

export default async function PulsePage() {
  const profile = await getCurrentProfile();
  const insights = await getInsights(profile?.id ?? DEMO_USER_ID);
  const heartRate = insights?.health.heartRate;

  return (
    <main className={styles.screen}>
      <h1 className={styles.title}>Din puls<br />gennem 2026</h1>
      {heartRate ? (
        <>
          <Image
            className={styles.heart}
            src="/homescreen/widgets/heart.svg"
            alt=""
            width={304}
            height={275}
            style={{ "--beat": `${60 / heartRate.average}s` }}
          />
          <dl className={styles.stats}>
            <div className={styles.average}>
              <dt>Gennemsnit</dt>
              <dd>{heartRate.average} bpm</dd>
            </div>
            <div>
              <dt>Laveste</dt>
              <dd>
                {heartRate.lowest.bpm} bpm
                <time dateTime={monthDate(heartRate.lowest.month)}>{heartRate.lowest.name}</time>
              </dd>
            </div>
            <div>
              <dt>Højeste</dt>
              <dd>
                {heartRate.highest.bpm} bpm
                <time dateTime={monthDate(heartRate.highest.month)}>{heartRate.highest.name}</time>
              </dd>
            </div>
          </dl>
        </>
      ) : <p>Ingen pulsdata for 2026 endnu.</p>}
      <Link className={styles.next} href="/insights/sundhed/del">Se din aktivitet</Link>
    </main>
  );
}
