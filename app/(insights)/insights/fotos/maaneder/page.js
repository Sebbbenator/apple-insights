import PhotoWheel from "@/components/PhotoWheel";
import StatusScreen from "@/components/StatusScreen";
import { getCurrentProfile } from "@/lib/auth";
import { getInsights, monthNames } from "@/lib/insights";
import { getPhotos } from "@/lib/photos";

export const metadata = {
  title: "Fotos",
};

export default async function PhotoMonthsPage() {
  const [currentUser, insights, photos] = await Promise.all([
    getCurrentProfile(),
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

  const months = insights.months.map((row) => ({
    month: row.month,
    name: monthNames[row.month - 1],
    photos: row.photos,
    photo: photos.find((photo) => photo.position === row.month),
  }));

  return (
    <PhotoWheel
      months={months}
      startMonth={insights.photos.topMonth.month}
      name={currentUser?.name}
      image={currentUser?.image}
    />
  );
}
