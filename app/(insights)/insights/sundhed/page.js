import ChapterStart, { chapterStarts } from "@/components/ChapterStart";

export const metadata = { title: "Sundhed" };

export default function HealthPage() {
  return (
    <main>
      <ChapterStart {...chapterStarts.health} />
    </main>
  );
}
