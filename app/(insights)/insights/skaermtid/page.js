import Link from "next/link";
import ChapterStart, { chapterStarts } from "@/components/ChapterStart";

export const metadata = { title: "Skærmtid" };

export default function ScreenTimeChapterPage() {
  return (
    <main>
      <ChapterStart
        {...chapterStarts.screenTime}
        hint={<Link href="/insights/skaermtid/timer">Rul for at fortsætte</Link>}
      />
    </main>
  );
}
