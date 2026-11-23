import { demoMemoji } from "@/lib/memojis";
import styles from "./Avatar.module.css";

export default function Avatar({ name, image, size = "md" }) {
  const className = `${styles.avatar} ${styles[size]}`;

  if (image) {
    return <img src={image} alt="" className={className} />;
  }

  if (!name) {
    return <img src={demoMemoji} alt="" className={className} />;
  }

  return (
    <span className={className} aria-hidden="true">
      {name.charAt(0)}
    </span>
  );
}
