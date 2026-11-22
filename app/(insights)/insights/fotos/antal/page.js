import PhotoCount from "@/components/PhotoCount";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";
import { getPhotos } from "@/lib/photos";
import styles from "../page.module.css";

export const metadata = {
  title: "Fotos",
};

export default async function PhotoCountPage() {
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
