import styles from "./CalendarWidget.module.css";

const events = [
  { title: "Æde 500 pandekager", time: "17.00–17.30" },
  { title: "Tiktok Rizzparty", time: "19.00–20.00" },
];

export default function CalendarWidget() {
  return (
    <figure className={styles.widget}>
      <div className={styles.card}>
        <p className={styles.weekday}>Mandag</p>
        <p className={styles.day}>26</p>
        <ul className={styles.events}>
          {events.map((event) => (
            <li key={event.title} className={styles.event}>
              <span className={styles.title}>{event.title}</span>
              <span className={styles.eventTime}>{event.time}</span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className={styles.caption}>Kalender</figcaption>
    </figure>
  );
}
