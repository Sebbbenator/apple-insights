import { redirect } from "next/navigation";
import UserBadge from "@/components/UserBadge";
import { getCurrentProfile } from "@/lib/auth";
import { signOut } from "@/lib/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Profil",
};

async function updateProfile(formData) {
  "use server";

  const currentUser = await getCurrentProfile();

  if (!currentUser) {
    redirect("/login");
  }

  const supabase = await createClient();
  await supabase
    .from("users")
    .update({
      name: formData.get("name").trim(),
      image: formData.get("image").trim(),
    })
    .eq("id", currentUser.id);

  redirect("/profile");
}

export default async function ProfilePage() {
  const currentUser = await getCurrentProfile();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Profil</h1>
      <UserBadge user={currentUser} />

      <form action={updateProfile} className="form">
        <label htmlFor="name">Navn</label>
        <input id="name" name="name" defaultValue={currentUser.name} required />

        <label htmlFor="image">Billede (URL)</label>
        <input id="image" name="image" type="url" placeholder="https://..." defaultValue={currentUser.image ?? ""} />

        <button type="submit">Gem</button>
      </form>

      <p>E-mail: {currentUser.mail}</p>
      <form action={signOut} className="form">
        <button type="submit">Log ud</button>
      </form>
    </main>
  );
}
