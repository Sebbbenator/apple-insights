const places = [
  { place: "Aarhus", latitude: 56.1572, longitude: 10.2107 },
  { place: "København", latitude: 55.6761, longitude: 12.5683 },
  { place: "Skagen", latitude: 57.7209, longitude: 10.5839 },
  { place: "Gudhjem", latitude: 55.2125, longitude: 14.9706 },
  { place: "Ebeltoft", latitude: 56.1944, longitude: 10.6821 },
  { place: "Aalborg", latitude: 57.0488, longitude: 9.9217 },
  { place: "Odense", latitude: 55.4038, longitude: 10.4024 },
  { place: "Ribe", latitude: 55.3283, longitude: 8.7608 },
];

const apps = ["Beskeder", "Fotos", "Safari", "Instagram", "Snapchat", "TikTok", "YouTube", "Facebook"];

const hourProfile = [4, 2, 1, 0.5, 0.3, 0.5, 2, 4, 4, 3, 3, 3, 4, 3.5, 3, 3.5, 4, 5, 5.5, 6, 7.5, 8.5, 7.5, 6];

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const season = [0.6, 0.6, 0.8, 0.9, 1.1, 1.4, 1.8, 1.5, 1, 0.8, 0.6, 0.7];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createFakeMonths(userId) {
  return daysInMonth.map((days, index) => {
    const photos = Math.round(randomBetween(350, 700) * season[index]);

    return {
      userId: userId,
      month: index + 1,
      screenTimeMinutes: days * randomBetween(150, 280),
      pickups: days * randomBetween(60, 120),
      photos: photos,
      videos: Math.round((photos * randomBetween(5, 12)) / 100),
      steps: Math.round(days * randomBetween(5000, 8000) * (0.8 + season[index] * 0.2)),
      restingHeartRate: randomBetween(55, 68),
      averageHeartRate: randomBetween(66, 78),
      minHeartRate: randomBetween(52, 62),
      maxHeartRate: randomBetween(100, 125),
    };
  });
}

function createFakePlaces(userId, totalPhotos) {
  const weights = places.map(() => Math.random());
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
  let photosLeft = totalPhotos;

  return places.map((place, index) => {
    const isLast = index === places.length - 1;
    const photos = isLast ? photosLeft : Math.floor((totalPhotos * weights[index]) / weightSum);
    photosLeft = photosLeft - photos;

    return { userId: userId, ...place, photos: photos };
  });
}

function splitMinutes(total, weights) {
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
  let minutesLeft = total;

  return weights.map((weight, index) => {
    const isLast = index === weights.length - 1;
    const minutes = isLast ? minutesLeft : Math.floor((total * weight) / weightSum);
    minutesLeft = minutesLeft - minutes;
    return minutes;
  });
}

function createFakeHours(userId, totalMinutes) {
  const weights = hourProfile.map((weight) => weight * (0.6 + Math.random() * 0.8));
  const minutes = splitMinutes(totalMinutes, weights);

  return minutes.map((hourMinutes, hour) => ({ userId: userId, hour: hour, minutes: hourMinutes }));
}

function createFakeApps(userId, totalMinutes) {
  const appMinutes = Math.round(totalMinutes * (0.55 + Math.random() * 0.15));
  const weights = apps.map(() => Math.random() ** 2);
  const minutes = splitMinutes(appMinutes, weights);

  return apps.map((app, index) => ({ userId: userId, app: app, minutes: minutes[index] }));
}

export async function createFakeInsights(supabase, userId) {
  const months = createFakeMonths(userId);
  const totalPhotos = months.reduce((sum, month) => sum + month.photos, 0);
  const photoPlaces = createFakePlaces(userId, totalPhotos);
  const totalMinutes = months.reduce((sum, month) => sum + month.screenTimeMinutes, 0);

  const { error: monthsError } = await supabase.from("insight_months").insert(months);
  const { error: placesError } = await supabase.from("photo_places").insert(photoPlaces);
  const { error: statsError } = await supabase
    .from("photo_stats")
    .insert({
      userId: userId,
      percentile: Math.round(6000 + Math.random() * 3990) / 100,
      selfies: Math.round(totalPhotos * (0.02 + Math.random() * 0.33)),
    });
  const { error: hoursError } = await supabase
    .from("screen_hours")
    .insert(createFakeHours(userId, totalMinutes));
  const { error: appsError } = await supabase
    .from("screen_apps")
    .insert(createFakeApps(userId, totalMinutes));

  if (monthsError || placesError || statsError || hoursError || appsError) {
    throw new Error("Kunne ikke oprette insights til den nye bruger.");
  }
}
