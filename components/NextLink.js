"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { flow } from "@/lib/flow";
import styles from "./NextLink.module.css";

export default function NextLink() {
  const pathname = usePathname();
  const index = flow.findIndex((page) => page.href === pathname);
  const next = flow[index + 1];

  if (index === -1 || flow[index].quiz || !next) {
    return null;
  }

  return (
    <Link href={next.href} className={styles.next}>
      Rul for at fortsætte
    </Link>
  );
}
