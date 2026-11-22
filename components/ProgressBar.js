"use client";

import { usePathname } from "next/navigation";
import { flow } from "@/lib/flow";
import styles from "./ProgressBar.module.css";

const labels = {
  skaermtid: "Skærmtid",
  fotos: "Fotos",
  sundhed: "Sundhed",
};

const chapters = Object.keys(labels);

function pagesIn(chapter) {
  return flow.filter((page) => page.chapter === chapter);
}

export default function ProgressBar() {
  const pathname = usePathname();
  const page = flow.find((item) => item.href === pathname);
  const current = chapters.indexOf(page?.chapter);

  if (current === -1) {
    return null;
  }

  const pages = pagesIn(page.chapter);
  const step = pages.indexOf(page) + 1;

  return (
    <div
      className={styles.progressBar}
      role="progressbar"
      aria-label="Fremskridt"
      aria-valuemin={1}
      aria-valuemax={pages.length}
      aria-valuenow={step}
      aria-valuetext={`${labels[page.chapter]}, side ${step} af ${pages.length}`}
    >
      {chapters.map((chapter, index) => {
        let fill = 0;

        if (index < current) {
          fill = 1;
        } else if (index === current) {
          fill = step / pages.length;
        }

        return (
          <span key={chapter} className={`${styles.pill} ${styles[chapter]}`}>
            <span className={styles.fill} style={{ "--fill": fill }} />
          </span>
        );
      })}
    </div>
  );
}
