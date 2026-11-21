import Link from "next/link";
import ChapterStart, { chapterStarts } from "@/components/ChapterStart";

export const metadata = { title: "Skærmtid" };

export default function ScreenTimePage() {
  return (
    <main>
      <ChapterStart
        {...chapterStarts.screenTime}
        hint={<Link href="/insights/fotos">Fortsæt til Fotos</Link>}
      />
    </main>
  );
}
