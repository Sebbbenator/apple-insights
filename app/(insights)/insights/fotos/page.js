import ChapterStart, { chapterStarts } from "@/components/ChapterStart";

export const metadata = { title: "Fotos" };

export default function PhotosPage() {
  return (
    <main>
      <ChapterStart {...chapterStarts.photos} />
    </main>
  );
}
