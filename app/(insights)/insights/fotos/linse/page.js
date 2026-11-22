import PhotoLens from "@/components/PhotoLens";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, getInsights } from "@/lib/insights";
import { getPhotos } from "@/lib/photos";
import styles from "../page.module.css";

export const metadata = {
  title: "Fotos",
};

export default async function PhotoLensPage() {
  const currentUser = await getCurrentProfile();
  const [insights, photos] = await Promise.all([
    getInsights(currentUser?.id ?? DEMO_USER_ID),
    getPhotos("selfie"),
  ]);

  if (!insights || photos.length === 0) {
    return (
      <main className={styles.state}>
        <h1>Ingen fotos endnu</h1>
        <p>Vi har ikke nogen fotos fra dit 2026 endnu. Prøv igen senere.</p>
      </main>
    );
  }

  return <PhotoLens lens={insights.photos.lens} selfies={insights.photos.selfies} photos={photos} />;
}
