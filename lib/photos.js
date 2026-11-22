import { createClient } from "@/lib/supabase/server";

export async function getPhotos(category) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("photos")
    .select("position, path, alt")
    .eq("category", category)
    .order("position");

  if (error) {
    throw new Error("Kunne ikke hente fotos fra Supabase.");
  }

  return data.map((photo) => ({
    position: photo.position,
    alt: photo.alt,
    src: supabase.storage.from("photos").getPublicUrl(photo.path).data.publicUrl,
  }));
}
