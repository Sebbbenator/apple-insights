import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function getPhotos(category) {
  const [supabase, user] = await Promise.all([createClient(), getCurrentUser()]);

  let query = supabase
    .from("photos")
    .select("position, path, alt, userId")
    .eq("category", category)
    .order("position");

  query = user ? query.or(`userId.is.null,userId.eq.${user.sub}`) : query.is("userId", null);

  const { data, error } = await query;

  if (error) {
    throw new Error("Kunne ikke hente fotos fra Supabase.");
  }

  const ownPositions = data.filter((photo) => photo.userId).map((photo) => photo.position);
  const photos = data.filter((photo) => photo.userId || !ownPositions.includes(photo.position));

  return photos.map((photo) => ({
    position: photo.position,
    alt: photo.alt,
    src: supabase.storage.from("photos").getPublicUrl(photo.path).data.publicUrl,
  }));
}
