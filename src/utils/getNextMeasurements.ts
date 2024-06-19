import { Measurements } from "@/types/CurrentWeather";

export function getNextMeasurements(data: Measurements[]) {
  const currentTime = new Date();
  const filteredData = data.filter((item) => new Date(item.time) > currentTime);
  const nextMeasurements = filteredData.slice(0, 5);

  return nextMeasurements;
}
