import Image from "next/image";
import Avatar from "@/components/Avatar";
import Blitz from "@/components/Blitz";
import styles from "./PhotoWheel.module.css";

export default function PhotoWheel({ months, startMonth, name, image }) {
  const selectedIndex = months.findIndex((item) => item.month === startMonth);
  const selected = months[selectedIndex];

  return (
    <main className={styles.screen}>
      <Blitz />

      <figure className={styles.selected}>
        <Image src={selected.photo.src} alt={selected.photo.alt} fill sizes="380px" className={styles.image} />
        <figcaption className={styles.label}>
          <span className={`${styles.month} regular`}>{selected.name}</span>
          <span className={`${styles.count} semibold`}>
            {selected.photos.toLocaleString("da-DK")} billeder
          </span>
        </figcaption>
      </figure>

      <div className={styles.wheel} style={{ "--turn": `${selectedIndex * -30}deg` }}>
        {months.map((item, index) => (
          <div key={item.month} className={styles.thumb} style={{ "--angle": `${index * 30}deg` }}>
            <Image src={item.photo.src} alt="" fill sizes="80px" className={styles.image} />
          </div>
        ))}
      </div>

      <div className={styles.avatar}>
        <Avatar name={name} image={image} size="xl" />
      </div>
    </main>
  );
}
