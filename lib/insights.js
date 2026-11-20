import { createClient } from "@/lib/supabase/server";

export const DEMO_USER_ID = "00000000-0000-4000-8000-000000000001";

const monthNames = [
  "januar",
  "februar",
  "marts",
  "april",
  "maj",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "december",
];

function sum(rows, key) {
  return rows.reduce((total, row) => total + row[key], 0);
}

function topRow(rows, key) {
  return rows.reduce((top, row) => (row[key] > top[key] ? row : top));
}

export async function getInsights(userId) {
  const supabase = await createClient();

  const [monthsResult, placesResult] = await Promise.all([
    supabase.from("insight_months").select("*").eq("userId", userId).order("month"),
    supabase
      .from("photo_places")
      .select("*")
      .eq("userId", userId)
      .order("photos", { ascending: false }),
  ]);

  if (monthsResult.error || placesResult.error) {
    throw new Error("Kunne ikke hente insights fra Supabase.");
  }

  const months = monthsResult.data;
  const places = placesResult.data;

  if (months.length === 0) {
    return null;
  }

  const screenTimeMinutes = sum(months, "screenTimeMinutes");
  const pickups = sum(months, "pickups");
  const steps = sum(months, "steps");
  const photoMonth = topRow(months, "photos");
  const stepMonth = topRow(months, "steps");

  return {
    months: months,
    screenTime: {
      totalMinutes: screenTimeMinutes,
      dailyMinutes: Math.round(screenTimeMinutes / 365),
      pickups: pickups,
      dailyPickups: Math.round(pickups / 365),
    },
    photos: {
      total: sum(months, "photos"),
      videos: sum(months, "videos"),
      places: places,
      topMonth: { name: monthNames[photoMonth.month - 1], photos: photoMonth.photos },
      topPlace: places[0],
    },
    health: {
      steps: steps,
      dailySteps: Math.round(steps / 365),
      topMonth: { name: monthNames[stepMonth.month - 1], steps: stepMonth.steps },
      restingHeartRate: Math.round(sum(months, "restingHeartRate") / months.length),
    },
    awards: [
      {
        title: "Fotomåneden",
        value: monthNames[photoMonth.month - 1],
        detail: `${photoMonth.photos.toLocaleString("da-DK")} fotos`,
      },
      {
        title: "Yndlingsstedet",
        value: places[0].place,
        detail: `${places[0].photos.toLocaleString("da-DK")} fotos`,
      },
      {
        title: "Skridtmåneden",
        value: monthNames[stepMonth.month - 1],
        detail: `${stepMonth.steps.toLocaleString("da-DK")} skridt`,
      },
    ],
  };
}
