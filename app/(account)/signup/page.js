import Link from "next/link";
import { redirect } from "next/navigation";
import AuthScreen from "@/components/AuthScreen";
import Field from "@/components/Field";
import FieldGroup from "@/components/FieldGroup";
import SubmitButton from "@/components/SubmitButton";
import { getCurrentUser } from "@/lib/auth";
import { createFakeInsights } from "@/lib/fakeInsights";
import { signupFields } from "@/lib/signupFields";
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

  if (error || !data.session) {
    redirect("/signup?error=true");
  }

  const { error: profileError } = await supabase.from("users").insert({
    id: data.user.id,
    name: name,
    mail: email,
  });

  if (profileError) {
    redirect("/signup?error=true");
  }

  const insightsCreated = await createFakeInsights(supabase, data.user.id);

  if (!insightsCreated) {
    redirect("/signup?error=true");
  }

  redirect("/indstillinger");
}

export default async function SignUpPage({ searchParams }) {
  const { error } = await searchParams;

  const user = await getCurrentUser();

  if (user) {
    redirect("/indstillinger");
  }

  return (
    <AuthScreen
      title="Opret bruger"
      description="Én bruger er alt, du skal bruge for at se dit eget 2026."
      error={error && "Kunne ikke oprette brugeren. Måske er e-mailen allerede i brug."}
      footer={
        <p>
          Har du allerede en bruger? <Link href="/login">Log ind</Link>
        </p>
      }
    >
      <form action={signUp}>
        <FieldGroup footnote="Adgangskoden skal være mindst 6 tegn.">
          {signupFields.map((field) => (
            <Field key={field.name} {...field} invalid={Boolean(error)} required />
          ))}
        </FieldGroup>
        <SubmitButton pendingText="Opretter bruger…">Opret bruger</SubmitButton>
      </form>
    </AuthScreen>
  );
}
