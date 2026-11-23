import PhotoCount from "@/components/PhotoCount";
import StatusScreen from "@/components/StatusScreen";
import { getInsights } from "@/lib/insights";
import { getPhotos } from "@/lib/photos";

export const metadata = {
  title: "Fotos",
};

export default async function PhotoCountPage() {
  const [insights, photos] = await Promise.all([
    getInsights(),
    getPhotos("month"),
  ]);

  if (!insights || photos.length === 0) {
    return (
      <StatusScreen
        title="Ingen fotos endnu"
        text="Vi har ikke nogen fotos fra dit 2026 endnu. Prøv igen senere."
      />
    );
  }

  const topMonth = insights.photos.topMonth.month;
  const stack = [
    ...photos.filter((photo) => photo.position !== topMonth),
    ...photos.filter((photo) => photo.position === topMonth),
  ];

  return (
    <PhotoCount
      total={insights.photos.total}
      percentile={insights.photos.percentile}
      photos={stack}
    />
  );
}
