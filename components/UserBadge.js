import styles from "./UserBadge.module.css";

export default function UserBadge({ user }) {
  return (
    <div className={styles.badge}>
      {user.image ? (
        <img src={user.image} alt="" className={styles.avatar} />
      ) : (
        <span className={styles.avatar} aria-hidden="true">
          {user.name.charAt(0)}
        </span>
      )}
      <p className={styles.name}>{user.name}</p>
    </div>
  );
}
