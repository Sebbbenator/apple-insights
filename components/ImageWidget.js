import Image from "next/image";
import Link from "next/link";
import SiriGlow from "./SiriGlow";
import glowStyles from "./SiriGlow.module.css";
import styles from "./ImageWidget.module.css";

export default function ImageWidget({ src, alt, name, href }) {
  const content = (
    <>
      <div className={styles.card}>
        <Image src={src} alt={alt} fill sizes="170px" className={styles.image} />
        <SiriGlow className={glowStyles.widget} splash={false} />
      </div>
      {name && <span className={styles.caption}>{name}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${styles.widget} ${styles.link}`}>
        {content}
      </Link>
    );
  }

  return <div className={styles.widget}>{content}</div>;
}
