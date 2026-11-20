import styles from "./Avatar.module.css";

export default function Avatar({ name, image, size = "md" }) {
  const className = `${styles.avatar} ${styles[size]}`;

  if (image) {
    return <img src={image} alt="" className={className} />;
  }

  if (!name) {
    return (
      <span className={className} aria-hidden="true">
        <svg width="62%" height="62%" viewBox="0 0 40 40" fill="currentColor">
          <circle cx="20" cy="15" r="7" />
          <path d="M6 34c2.5-6 8-9 14-9s11.5 3 14 9" />
        </svg>
      </span>
    );
  }

  return (
    <span className={className} aria-hidden="true">
      {name.charAt(0)}
    </span>
  );
}
