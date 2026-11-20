import Link from "next/link";
import { redirect } from "next/navigation";
import AuthScreen from "@/components/AuthScreen";
import Field from "@/components/Field";
import FieldGroup from "@/components/FieldGroup";
import SubmitButton from "@/components/SubmitButton";
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
    <AuthScreen
      title="Log ind"
      description="Log ind med din e-mail for at se dit eget 2026."
      error={error && "Forkert e-mail eller adgangskode. Prøv igen."}
      footer={
        <>
          <p>
            Har du ikke en bruger? <Link href="/signup">Opret en</Link>
          </p>
          <Link href="/insights">Prøv demoen i stedet</Link>
        </>
      }
    >
      <form action={signIn}>
        <FieldGroup>
          <Field
            name="email"
            label="E-mail"
            type="email"
            placeholder="dig@eksempel.dk"
            autoComplete="email"
            invalid={Boolean(error)}
            required
          />
          <Field
            name="password"
            label="Adgangskode"
            type="password"
            placeholder="Påkrævet"
            autoComplete="current-password"
            invalid={Boolean(error)}
            required
          />
        </FieldGroup>
        <SubmitButton pendingText="Logger ind…">Fortsæt</SubmitButton>
      </form>
    </AuthScreen>
  );
}
