import type { RoutePoint } from '@/types';

/**
 * Boarding and dropping points per city.
 *
 * IMPORTANT (Bitla): these locations are researched, not confirmed. Every route
 * carrying `pointsNeedVerification: true` must be checked against the operations
 * sheet before go-live. The times below are offsets from the first departure of
 * the night and are recalculated per service at render time.
 */
type PointPreset = { name: string; landmark: string; offsetMin: number };

export const CITY_POINTS: Record<string, PointPreset[]> = {
  delhi: [
    { name: 'Mori Gate Office', landmark: 'Near Kashmiri Gate ISBT, opposite the metro gate', offsetMin: 0 },
    { name: 'ISBT Kashmiri Gate', landmark: 'Outside the interstate bus terminal, main road side', offsetMin: 10 },
    { name: 'Anand Vihar', landmark: 'Near Anand Vihar ISBT / railway station, NH-9 service road', offsetMin: 40 },
    { name: 'Akshardham', landmark: 'Akshardham metro station, NH-9 side', offsetMin: 55 },
    { name: 'Sarai Kale Khan', landmark: 'Near Sarai Kale Khan ISBT, Ring Road', offsetMin: 75 },
  ],
  lucknow: [
    { name: 'Polytechnic Chauraha', landmark: 'Near Polytechnic metro station, Faizabad Road', offsetMin: 0 },
    { name: 'Kamta', landmark: 'Kamta Chauraha, Faizabad Road', offsetMin: 10 },
    { name: 'Charbagh', landmark: 'Opposite Charbagh railway station, near the bus stand', offsetMin: 40 },
    { name: 'Alambagh Office', landmark: 'Near Avadh Hospital, Nehariya Chauraha', offsetMin: 55 },
  ],
  varanasi: [
    { name: 'Cantt Railway Station', landmark: 'Roadways bus stand side, Varanasi Cantt', offsetMin: 0 },
    { name: 'Sigra', landmark: 'Sigra crossing, near the stadium', offsetMin: 15 },
    { name: 'Lanka', landmark: 'BHU main gate, Lanka crossing', offsetMin: 30 },
  ],
  indore: [
    { name: 'Sarwate Bus Stand', landmark: 'Near Indore Junction railway station', offsetMin: 0 },
    { name: 'Bhawarkua', landmark: 'Bhawarkua square, AB Road', offsetMin: 20 },
    { name: 'Vijay Nagar', landmark: 'Vijay Nagar square, AB Road', offsetMin: 35 },
  ],
  ujjain: [
    { name: 'Nanakheda Bus Stand', landmark: 'Nanakheda, Dewas Road', offsetMin: 0 },
    { name: 'Dewas Gate', landmark: 'Dewas Gate bus stand, near Mahakal Road', offsetMin: 15 },
  ],
  kanpur: [
    { name: 'Jhakarkati Bus Stand', landmark: 'Main interstate terminal, Jhakarkati', offsetMin: 0 },
    { name: 'Rawatpur', landmark: 'Rawatpur crossing, GT Road', offsetMin: 20 },
    { name: 'Kalyanpur', landmark: 'Kalyanpur crossing, GT Road towards Delhi', offsetMin: 30 },
  ],
  agra: [
    { name: 'Agra Cantt', landmark: 'Near Agra Cantt railway station', offsetMin: 0 },
    { name: 'Bhagwan Talkies', landmark: 'Bhagwan Talkies crossing, NH-19', offsetMin: 15 },
    { name: 'Sikandra', landmark: 'Sikandra bypass, NH-19', offsetMin: 25 },
  ],
  chhatarpur: [
    { name: 'Chhatarpur Bus Stand', landmark: 'Main bus stand, Chhatarpur', offsetMin: 0 },
    { name: 'Panna Naka', landmark: 'Panna Naka crossing', offsetMin: 12 },
  ],
};

/** Adds `minutes` to a "HH:MM" clock string, wrapping past midnight. */
export function addMinutes(hhmm: string, minutes: number): string {
  const [h, m] = hhmm.split(':').map(Number);
  const total = (h * 60 + m + minutes + 1440 * 2) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

/** Boarding points for a city, timed from the first departure of the night. */
export function boardingPoints(city: string, firstDeparture: string): RoutePoint[] {
  return (CITY_POINTS[city] ?? []).map((p) => ({
    name: p.name,
    landmark: p.landmark,
    time: addMinutes(firstDeparture, p.offsetMin),
  }));
}

/**
 * The order in which an ARRIVING coach reaches a city's points, which is not
 * always the reverse of the boarding order — it depends which side of the city
 * the coach enters from. Only cities that differ from the boarding order are
 * listed; everything else is served in the same order it boards.
 *
 * Delhi is the exception: coaches arrive from the east on NH-9, so they reach
 * Sarai Kale Khan and Akshardham well before Kashmiri Gate.
 */
const ARRIVAL_ORDER: Record<string, string[]> = {
  delhi: ['Sarai Kale Khan', 'Akshardham', 'Anand Vihar', 'ISBT Kashmiri Gate', 'Mori Gate Office'],
};

/**
 * Dropping points for a city. The final point is the coach's scheduled arrival
 * time and every earlier stop is offset back from it, so times run forward down
 * the list the way a passenger reads them.
 */
export function droppingPoints(city: string, firstArrival: string): RoutePoint[] {
  const preset = CITY_POINTS[city] ?? [];
  if (!preset.length) return [];

  const order = ARRIVAL_ORDER[city];
  const sequence = order
    ? order.map((name) => preset.find((p) => p.name === name)).filter((p): p is PointPreset => Boolean(p))
    : preset;

  // The last stop is the scheduled arrival; earlier stops are offset back from
  // it by the same spacing the boarding offsets describe.
  const lastOffset = sequence[sequence.length - 1].offsetMin;

  return sequence.map((p) => ({
    name: p.name,
    landmark: p.landmark,
    time: addMinutes(firstArrival, -Math.abs(lastOffset - p.offsetMin)),
  }));
}
