import { redirect } from "next/navigation";
import Avatar from "@/components/Avatar";
import BackButton from "@/components/BackButton";
import Field from "@/components/Field";
import FieldGroup from "@/components/FieldGroup";
import SubmitButton from "@/components/SubmitButton";
import { getCurrentProfile } from "@/lib/auth";
import { signOut } from "@/lib/actions";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

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

  redirect("/profile?saved=true");
}

export default async function ProfilePage({ searchParams }) {
  const { saved } = await searchParams;

  const currentUser = await getCurrentProfile();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <main className={styles.profile}>
      <BackButton href="/indstillinger" label="Tilbage til Indstillinger" />

      <div className={styles.content}>
        <header className={styles.header}>
          <Avatar name={currentUser.name} image={currentUser.image} size="lg" />
          <h1 className={styles.name}>{currentUser.name}</h1>
          <p className={styles.mail}>{currentUser.mail}</p>
        </header>

        {saved && (
          <p className={styles.saved} role="status">
            Dine ændringer er gemt.
          </p>
        )}

        <form action={updateProfile}>
          <FieldGroup title="Personlige oplysninger" footnote="Billedet skal være et link, der starter med https://.">
            <Field name="name" label="Navn" defaultValue={currentUser.name} autoComplete="given-name" required />
            <Field
              name="image"
              label="Billede"
              type="url"
              placeholder="https://..."
              defaultValue={currentUser.image ?? ""}
            />
          </FieldGroup>
          <SubmitButton pendingText="Gemmer…">Gem</SubmitButton>
        </form>

        <form action={signOut}>
          <SubmitButton variant="danger" pendingText="Logger ud…">
            Log ud
          </SubmitButton>
        </form>
      </div>
    </main>
  );
}
