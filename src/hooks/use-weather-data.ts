import { QueryObserverResult } from "@tanstack/react-query";

import { Forecast, Measurements } from "@/types/CurrentWeather";

import { useForecastData } from "./use-forecast-data";
import { useLocation } from "./use-location";
import { useNextDaysMeasurements } from "./use-next-days-measurements";

interface UseWeatherDataReturn {
  forecastData: Forecast | undefined;
  isLoading: boolean;
  refetch: () => Promise<QueryObserverResult<Forecast, Error>>;
  nextDaysMeasurements: Measurements[] | undefined;
}

export const useWeatherData = (): UseWeatherDataReturn => {
  const { location } = useLocation();
  const { forecastData, isLoading, refetch } = useForecastData(location);
  const nextDaysMeasurements = useNextDaysMeasurements(forecastData);

  return {
    forecastData,
    isLoading,
    refetch,
    nextDaysMeasurements,
  };
};
