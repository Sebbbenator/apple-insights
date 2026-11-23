import HabitsQuiz from "@/components/HabitsQuiz";
import StatusScreen from "@/components/StatusScreen";
import { dayPeriods, getInsights } from "@/lib/insights";

export const metadata = {
  title: "Dine skærmvaner",
};

export default async function HabitsPage() {
  const insights = await getInsights();

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
