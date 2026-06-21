export type Forecast = { current: number; day90: number; year: number; currentScore: number; futureScore: number };

export function buildForecast(current = 462, monthlyReduction = 27): Forecast {
  const day90 = Math.max(120, Math.round(current - monthlyReduction * 3));
  const year = Math.max(95, Math.round(current - monthlyReduction * 6.3));
  return { current, day90, year, currentScore: 78, futureScore: Math.min(96, 78 + Math.round((current - year) / 10)) };
}
