import Image from "next/image";
import styles from "./ChapterStart.module.css";

export const chapterStarts = {
  screenTime: {
    eyebrow: "Første stop",
    title: "Skærmtid",
    image: "/homescreen/icons/screentime.svg",
    description: "Du er ikke alene om din skærmtid.",
    glow: "indigo",
  },
  photos: {
    eyebrow: "Næste stop",
    title: "Fotos",
    image: "/homescreen/icons/photos.svg",
    description: "Tag en tur tilbage i minderne.",
    glow: "white",
  },
  health: {
    eyebrow: "Sidste stop",
    title: "Sundhed",
    image: "/homescreen/icons/health.svg",
    description: "Dit år i skridt og hjerteslag.",
    glow: "pink",
  },
};

const glowSpots = {
  indigo: ["indigoTop", "indigoTopSoft", "indigoBottom", "indigoBottomSoft"],
  white: ["whiteFirst", "whiteSecond", "whiteThird"],
  pink: ["pinkCenter"],
};

export default function ChapterStart({
  eyebrow,
  title,
  image,
  description,
  glow,
}) {
  return (
    <main aria-label={title} className={styles.screen}>
      {glowSpots[glow].map((spot) => (
        <div key={spot} className={`radial-${glow} ${styles.glow} ${styles[spot]}`} />
      ))}
      <div className={styles.content}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <Image src={image} alt="" width={208} height={208} className={styles.icon} />
        <p className={styles.description}>{description}</p>
      </div>
    </main>
  );
}
