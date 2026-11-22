import ChapterStart, { chapterStarts } from "@/components/ChapterStart";

export const metadata = { title: "Skærmtid" };

export default function ScreenTimeChapterPage() {
  return <ChapterStart {...chapterStarts.screenTime} />;
}
