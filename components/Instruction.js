"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { flow } from "@/lib/flow";
import styles from "./Instruction.module.css";

const minSwipe = 50;
const chapters = [...new Set(flow.map((page) => page.chapter))];
const end = { href: "/", chapter: "end" };

function firstPage(chapter) {
  return flow.find((page) => page.chapter === chapter);
}

export default function Instruction() {
  const pathname = usePathname();
  const router = useRouter();
  const index = flow.findIndex((page) => page.href === pathname);
  const page = flow[index];
  const chapter = chapters.indexOf(page?.chapter);
  const next = page && !page.quiz ? flow[index + 1] || end : null;
  const previous = index > 0 ? flow[index - 1] : null;
  const nextChapter = firstPage(chapters[chapter + 1]);
  const previousChapter = firstPage(chapters[chapter - 1]);

  useEffect(() => {
    if (!page) {
      return;
    }

    let start = null;

    function go(target) {
      if (target) {
        router.push(target.href);
      }
    }

    function onKeyDown(event) {
      const moves = {
        ArrowDown: next,
        ArrowUp: previous,
        ArrowRight: nextChapter,
        ArrowLeft: previousChapter,
      };

      if (!(event.key in moves) || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (event.target.closest("input, textarea, select")) {
        return;
      }

      event.preventDefault();
      go(moves[event.key]);
    }

    function onTouchStart(event) {
      start = event.touches.length === 1 ? event.touches[0] : null;
    }

    function onTouchEnd(event) {
      if (!start) {
        return;
      }

      const end = event.changedTouches[0];
      const x = end.clientX - start.clientX;
      const y = end.clientY - start.clientY;
      start = null;

      if (Math.max(Math.abs(x), Math.abs(y)) < minSwipe) {
        return;
      }

      if (Math.abs(x) > Math.abs(y)) {
        go(x < 0 ? nextChapter : previousChapter);
      } else {
        go(y < 0 ? next : previous);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [page, next, previous, nextChapter, previousChapter, router]);

  if (!next) {
    return null;
  }

  const finished = next === end;
  const newChapter = !finished && next.chapter !== page.chapter;

  return (
    <Link href={next.href} className={`${styles.instruction} ${newChapter ? styles.swipe : ""}`}>
      {finished ? "Tilbage til hjemmeskærmen" : newChapter ? "Swipe for næste App" : "Scroll for at fortsætte"}
      <span className={styles.arrow} aria-hidden="true">
        {newChapter ? "→" : "↓"}
      </span>
    </Link>
  );
}
