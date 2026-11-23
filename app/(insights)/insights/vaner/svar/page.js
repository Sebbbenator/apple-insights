import { redirect } from "next/navigation";
import HabitsAnswer from "@/components/HabitsAnswer";
import StatusScreen from "@/components/StatusScreen";
import { getCurrentProfile } from "@/lib/auth";
import { DEMO_USER_ID, dayPeriods, getInsights } from "@/lib/insights";

export const metadata = {
  title: "Din prime time",
};

function clock(hour) {
  return `kl. ${String(hour).padStart(2, "0")}`;
}

export default async function HabitsAnswerPage({ searchParams }) {
  const { gaet } = await searchParams;
  const guess = dayPeriods.find((period) => period.id === gaet);

  if (!guess) {
    redirect("/insights/vaner");
  }

  const currentUser = await getCurrentProfile();
  const insights = await getInsights(currentUser?.id ?? DEMO_USER_ID);
  const habits = insights?.screenTime.habits;

  if (!habits) {
    return (
      <StatusScreen
        title="Ingen data endnu"
        text="Vi har ikke nogen skærmvaner for dit 2026 endnu. Prøv igen senere."
      />
    );
  }

  const correct = guess.id === habits.peakPeriod.id;
  const maxMinutes = Math.max(...habits.hours.map((row) => row.minutes));
  const { from, to } = habits.peakWindow;
  const bars = habits.hours.map((row) => ({
    hour: row.hour,
    size: row.minutes / maxMinutes,
    peak: (row.hour - from + 24) % 24 < 3,
  }));

  return (
    <HabitsAnswer
      title={`${correct ? "Rigtigt!" : "Tæt på!"} ${habits.peakPeriod.definite} er din prime time`}
      peakHour={clock(habits.peakHour)}
      summary={`Mellem ${clock(from)} og ${String(to).padStart(2, "0")} er du mest aktiv`}
      bars={bars}
    />
  );
}
