import Link from "next/link";
import ChapterStart, { chapterStarts } from "@/components/ChapterStart";

export const metadata = { title: "Sundhed" };

export default function HealthPage() {
  return (
    <main>
      <ChapterStart
        {...chapterStarts.health}
        hint={<Link href="/insights/sundhed/skridt">Se dine skridt</Link>}
      />
    </main>
  );
}
