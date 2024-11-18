import { useMemo } from "react";

import { Forecast, Measurements } from "@/types/CurrentWeather";

export const useNextDaysMeasurements = (
  forecastData: Forecast | undefined,
): Measurements[] | undefined => {
  return useMemo(() => {
    if (!forecastData?.forecast?.forecastday) return undefined;

    try {
      const measurements = [
        ...forecastData.forecast.forecastday[0].hour,
        ...forecastData.forecast.forecastday[1].hour,
      ];
      const currentTime = new Date();
      const filteredData = measurements.filter(
        (item) => new Date(item.time) > currentTime,
      );
      const nextMeasurements = filteredData.slice(0, 5);

      return nextMeasurements;
    } catch (error) {
      console.error("Error processing measurements:", error);
      return undefined;
    }
  }, [forecastData]);
};
