import HabitsQuiz from "@/components/HabitsQuiz";
import StatusScreen from "@/components/StatusScreen";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, dayPeriods, getInsights } from "@/lib/insights";

export const metadata = {
  title: "Dine skærmvaner",
};

export default async function HabitsPage() {
  const currentUser = await getCurrentProfile();
  const insights = await getInsights(currentUser?.id ?? DEMO_USER_ID);

  if (!insights?.screenTime.habits) {
    return (
      <StatusScreen
        title="Ingen data endnu"
        text="Vi har ikke nogen skærmvaner for dit 2026 endnu. Prøv igen senere."
      />
    );
  }

  const periods = dayPeriods.map((period) => ({ id: period.id, name: period.name }));

  return <HabitsQuiz periods={periods} />;
}
