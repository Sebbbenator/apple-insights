import PhotoLens from "@/components/PhotoLens";
import StatusScreen from "@/components/StatusScreen";
import { getInsights } from "@/lib/insights";
import { getPhotos } from "@/lib/photos";

export const metadata = {
  title: "Fotos",
};

export default async function PhotoLensPage() {
  const [insights, photos] = await Promise.all([
    getInsights(),
    getPhotos("selfie"),
  ]);

  if (!insights || photos.length === 0) {
    return (
      <StatusScreen
        title="Ingen fotos endnu"
        text="Vi har ikke nogen fotos fra dit 2026 endnu. Prøv igen senere."
      />
    );
  }

  return <PhotoLens lens={insights.photos.lens} selfies={insights.photos.selfies} photos={photos} />;
}
