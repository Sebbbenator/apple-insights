"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Blitz from "@/components/Blitz";
import ShareButton from "@/components/ShareButton";
import SiriGlow from "@/components/SiriGlow";
import { textRise } from "@/lib/motion";
import styles from "./PhotoLens.module.css";

const photoDelay = 0.06;

const textHidden = { opacity: 0, y: -40 };
const textShown = { opacity: 1, y: 0 };

export default function PhotoLens({ lens, selfies, photos }) {
  return (
    <main className={styles.screen}>
      <Blitz />

      <div className={styles.content}>
        <h1 className={`${styles.heading} semibold`}>2026 gennem din linse</h1>

        <div className={styles.frame}>
          <ul className={styles.grid} aria-label={`${selfies.toLocaleString("da-DK")} selfies`}>
            {photos.map((photo, index) => (
              <motion.li
                key={photo.position}
                className={styles.photo}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  bounce: 0.35,
                  duration: 0.5,
                  delay: index * photoDelay,
                }}
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="120px" className={styles.image} />
              </motion.li>
            ))}
          </ul>
          <SiriGlow className={styles.glow} splash={false} />
        </div>

        <motion.div
          className={styles.text}
          initial={textHidden}
          animate={textShown}
          transition={{ ...textRise, delay: photos.length * photoDelay }}
        >
          <h2 className={`${styles.title} semibold text-gradient-silver`}>{lens.title}</h2>
          <p className={`${styles.description} regular`}>{lens.description}</p>
        </motion.div>

        <ShareButton text={`${lens.title}: mit 2026 gennem linsen, med ${selfies.toLocaleString("da-DK")} selfies.`} />
      </div>
    </main>
  );
}
