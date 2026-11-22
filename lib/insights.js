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

export const dayPeriods = [
  { id: "morgen", name: "Morgen", definite: "Morgenen", from: 6 },
  { id: "middag", name: "Middag", definite: "Middagen", from: 12 },
  { id: "aften", name: "Aften", definite: "Aftenen", from: 18 },
  { id: "nat", name: "Nat", definite: "Natten", from: 0 },
];

function sum(rows, key) {
  return rows.reduce((total, row) => total + row[key], 0);
}

function topRow(rows, key) {
  return rows.reduce((top, row) => (row[key] > top[key] ? row : top));
}

function lowRow(rows, key) {
  return rows.reduce((low, row) => (row[key] < low[key] ? row : low));
}

const walkerTitles = [
  { from: 12000, title: "Maratonmaskinen", description: "Dine sko har aldrig haft en fridag." },
  { from: 9000, title: "Byvandreren", description: "Du kender byen bedre end Kort-appen." },
  { from: 6000, title: "Hverdagshelten", description: "Skridt for skridt, dag efter dag." },
  { from: 0, title: "Sofastrategen", description: "Hvorfor gå, når man kan planlægge?" },
];

function minutesFrom(hours, from, length) {
  let total = 0;
  for (let step = 0; step < length; step++) {
    total = total + hours[(from + step) % 24].minutes;
  }
  return total;
}

function getHabits(hours) {
  if (hours.length !== 24) {
    return null;
  }

  const windows = hours.map((row) => ({ hour: row.hour, minutes: minutesFrom(hours, row.hour, 3) }));
  const windowStart = topRow(windows, "minutes").hour;
  const periods = dayPeriods.map((period) => ({
    ...period,
    minutes: minutesFrom(hours, period.from, 6),
  }));

  return {
    hours: hours,
    peakHour: topRow(hours, "minutes").hour,
    peakWindow: { from: windowStart, to: (windowStart + 3) % 24 },
    peakPeriod: topRow(periods, "minutes"),
  };
}

export async function getInsights(userId) {
  const supabase = await createClient();

  const [monthsResult, placesResult, hoursResult, appsResult] = await Promise.all([
    supabase.from("insight_months").select("*").eq("userId", userId).order("month"),
    supabase
      .from("photo_places")
      .select("*")
      .eq("userId", userId)
      .order("photos", { ascending: false }),
    supabase.from("screen_hours").select("hour, minutes").eq("userId", userId).order("hour"),
    supabase
      .from("screen_apps")
      .select("app, minutes")
      .eq("userId", userId)
      .order("minutes", { ascending: false }),
  ]);

  if (monthsResult.error || placesResult.error || hoursResult.error || appsResult.error) {
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
  const dailySteps = Math.round(steps / 365);
  const walker = walkerTitles.find((item) => dailySteps >= item.from);
  const lowPulseMonth = lowRow(months, "minHeartRate");
  const highPulseMonth = topRow(months, "maxHeartRate");

  return {
    months: months,
    screenTime: {
      totalMinutes: screenTimeMinutes,
      dailyMinutes: Math.round(screenTimeMinutes / 365),
      pickups: pickups,
      dailyPickups: Math.round(pickups / 365),
      habits: getHabits(hoursResult.data),
      apps: appsResult.data,
    },
    photos: {
      total: sum(months, "photos"),
      videos: sum(months, "videos"),
      places: places,
      topMonth: {
        month: photoMonth.month,
        name: monthNames[photoMonth.month - 1],
        photos: photoMonth.photos,
      },
      topPlace: places[0],
    },
    health: {
      steps: steps,
      dailySteps: dailySteps,
      topMonth: { name: monthNames[stepMonth.month - 1], steps: stepMonth.steps },
      restingHeartRate: Math.round(sum(months, "restingHeartRate") / months.length),
      heartRate: {
        average: Math.round(sum(months, "averageHeartRate") / months.length),
        lowest: {
          bpm: lowPulseMonth.minHeartRate,
          month: lowPulseMonth.month,
          name: monthNames[lowPulseMonth.month - 1],
        },
        highest: {
          bpm: highPulseMonth.maxHeartRate,
          month: highPulseMonth.month,
          name: monthNames[highPulseMonth.month - 1],
        },
      },
      distanceKm: steps * 0.00075,
      activeCalories: Math.round(steps * 0.04),
      title: walker.title,
      description: walker.description,
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
