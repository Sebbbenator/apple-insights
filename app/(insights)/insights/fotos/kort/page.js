import PhotoMap from "@/components/PhotoMap";
import StatusScreen from "@/components/StatusScreen";
import { getInsights } from "@/lib/insights";

export const metadata = {
  title: "Fotos",
};

export default async function PhotoMapPage() {
  const insights = await getInsights();

  if (!insights || insights.photos.places.length === 0) {
    return (
      <StatusScreen
        title="Ingen steder endnu"
        text="Vi ved ikke, hvor dine fotos fra 2026 er taget endnu. Prøv igen senere."
      />
    );
  }

  return <PhotoMap places={insights.photos.places} topPlace={insights.photos.topPlace} />;
}
