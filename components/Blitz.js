import styles from "./Blitz.module.css";

const spots = ["first", "second", "third"];

export default function Blitz() {
  return spots.map((spot) => (
    <div key={spot} className={`radial-white ${styles.glow} ${styles[spot]}`} />
  ));
}
