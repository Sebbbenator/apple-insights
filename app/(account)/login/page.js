import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Log ind",
};

async function signIn(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login?error=true");
  }

  redirect("/indstillinger");
}

export default async function LoginPage({ searchParams }) {
  const { error } = await searchParams;

  const user = await getCurrentUser();

  if (user) {
    redirect("/indstillinger");
  }

  return (
    <main>
      <h1>Log ind</h1>
      {error && (
        <p className="form-error" role="alert">
          Forkert e-mail eller adgangskode.
        </p>
      )}
      <form action={signIn} className="form">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" placeholder="dig@eksempel.dk" autoComplete="email" required />

        <label htmlFor="password">Adgangskode</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Din adgangskode"
          autoComplete="current-password"
          required
        />

        <button type="submit">Log ind</button>
      </form>
      <p>
        Ingen bruger endnu? <Link href="/signup">Opret en</Link>
      </p>
    </main>
  );
}
