import ChapterStart, { chapterStarts } from "@/components/ChapterStart";

export const metadata = { title: "Fotos" };

export default function PhotosPage() {
  return <ChapterStart {...chapterStarts.photos} />;
}
