import Image from "next/image";
import styles from "./ChapterStart.module.css";

export const chapterStarts = {
  screenTime: {
    eyebrow: "Første stop",
    title: "Skærmtid",
    image: "/homescreen/icons/screentime.svg",
    description: "Du er ikke alene om din skærmtid.",
  },
  photos: {
    eyebrow: "Næste stop",
    title: "Fotos",
    image: "/homescreen/icons/photos.svg",
    description: "Tag en tur tilbage i minderne.",
  },
  health: {
    eyebrow: "Sidste stop",
    title: "Sundhed",
    image: "/homescreen/icons/health.svg",
    description: "Tag en tur tilbage i minderne.",
  },
};

export default function ChapterStart({
  eyebrow,
  title,
  image,
  description,
  hint = "Rul for at fortsætte",
}) {
  return (
    <section aria-label={title} className={styles.screen}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <Image src={image} alt="" width={208} height={208} className={styles.icon} />
        <p className={styles.description}>{description}</p>
      </div>
      {hint && <p className={styles.hint}>{hint}</p>}
    </section>
  );
}
