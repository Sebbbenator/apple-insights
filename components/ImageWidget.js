import Image from "next/image";
import styles from "./ImageWidget.module.css";

export default function ImageWidget({ src, alt, name }) {
  return (
    <figure className={styles.widget}>
      <div className={styles.card}>
        <Image src={src} alt={alt} fill sizes="170px" className={styles.image} />
      </div>
      {name && <figcaption className={styles.caption}>{name}</figcaption>}
    </figure>
  );
}
