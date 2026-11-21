import Link from "next/link";
import ChapterStart, { chapterStarts } from "@/components/ChapterStart";

export const metadata = { title: "Fotos" };

export default function PhotosPage() {
  return (
    <main>
      <ChapterStart
        {...chapterStarts.photos}
        hint={<Link href="/insights/sundhed">Fortsæt til Sundhed</Link>}
      />
    </main>
  );
}
