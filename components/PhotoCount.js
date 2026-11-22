import Image from "next/image";
import Blitz from "@/components/Blitz";
import styles from "./PhotoCount.module.css";

const cards = [
  { x: -6, y: -10.7, rotate: -15 },
  { x: -5.8, y: -10.9, rotate: 30 },
  { x: -3.5, y: -10.9, rotate: -30 },
  { x: 0, y: -4, rotate: 8 },
  { x: -13, y: 3, rotate: -9 },
  { x: 2.6, y: 5.6, rotate: -30 },
  { x: -10, y: 10.9, rotate: 30 },
  { x: 8, y: 4, rotate: -12 },
  { x: 12.1, y: -5.8, rotate: -30 },
  { x: -4, y: 2, rotate: 22 },
  { x: 5.8, y: -0.2, rotate: 0 },
  { x: -11.9, y: 7.7, rotate: 18.5 },
];

export default function PhotoCount({ total, photos }) {
  return (
    <main className={styles.screen}>
      <Blitz />

      <div className={styles.stack} aria-hidden="true">
        {photos.map((photo, index) => {
          const card = cards[index % cards.length];

          return (
            <div
              key={photo.position}
              className={styles.card}
              style={{ "--x": card.x, "--y": card.y, "--rotate": `${card.rotate}deg` }}
            >
              <Image src={photo.src} alt="" fill sizes="190px" className={styles.image} />
            </div>
          );
        })}
      </div>

      <h1 className={`${styles.text} semibold`}>
        <span>Du har taget</span>
        <span className={`${styles.number} text-gradient-silver`}>
          {total.toLocaleString("da-DK")}
        </span>
        <span className={styles.year}>fotos i 2026</span>
      </h1>
    </main>
  );
}
