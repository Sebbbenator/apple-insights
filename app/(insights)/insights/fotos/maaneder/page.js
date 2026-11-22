import PhotoWheel from "@/components/PhotoWheel";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights, monthNames } from "@/lib/insights";
import { getPhotos } from "@/lib/photos";
import styles from "../page.module.css";

export const metadata = {
  title: "Fotos",
};

export default async function PhotoMonthsPage() {
  const currentUser = await getCurrentProfile();
  const [insights, photos] = await Promise.all([
    getInsights(currentUser?.id ?? DEMO_USER_ID),
    getPhotos("month"),
  ]);

  if (!insights || photos.length === 0) {
    return (
      <main className={styles.state}>
        <h1>Ingen fotos endnu</h1>
        <p>Vi har ikke nogen fotos fra dit 2026 endnu. Prøv igen senere.</p>
      </main>
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
