import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Opret bruger",
};

async function signUp(formData) {
  "use server";

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect("/signup?error=true");
  }

  await supabase.from("users").insert({
    id: data.user.id,
    name: name,
    mail: email,
  });

  redirect("/insights");
}

export default async function SignUpPage({ searchParams }) {
  const { error } = await searchParams;

  const user = await getCurrentUser();

  if (user) {
    redirect("/insights");
  }

  return (
    <main>
      <h1>Opret bruger</h1>
      {error && (
        <p className="form-error" role="alert">
          Kunne ikke oprette brugeren. Måske er e-mailen allerede i brug.
        </p>
      )}
      <form action={signUp} className="form">
        <label htmlFor="name">Navn</label>
        <input id="name" name="name" placeholder="Dit fornavn" autoComplete="given-name" required />

        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" placeholder="dig@eksempel.dk" autoComplete="email" required />

        <label htmlFor="password">Adgangskode</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Mindst 6 tegn"
          autoComplete="new-password"
          minLength={6}
          required
        />

        <button type="submit">Opret bruger</button>
      </form>
      <p>
        Har du allerede en bruger? <Link href="/login">Log ind</Link>
      </p>
    </main>
  );
}
