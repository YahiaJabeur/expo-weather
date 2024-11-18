import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import { getForecast } from "@/api";
import { QUERY_KEYS } from "@/constants/queries";
import { getStoredData, storeData } from "@/libs/localStorage";
import { Forecast } from "@/types/CurrentWeather";

interface UseForecastDataReturn {
  forecastData: Forecast | undefined;
  isLoading: boolean;
  refetch: () => Promise<QueryObserverResult<Forecast, Error>>;
}

export const useForecastData = (location: string): UseForecastDataReturn => {
  const {
    data: fetchedForecastData,
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!location,
    queryKey: [QUERY_KEYS.GET_FORECAST, location],
    queryFn: () => getForecast(location),
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (fetchedForecastData) {
      storeData("FORECAST_DATA", JSON.stringify(fetchedForecastData));
    }
  }, [fetchedForecastData]);

  const forecastData = useMemo(() => {
    if (fetchedForecastData) return fetchedForecastData;

    const storedForecastData = getStoredData("FORECAST_DATA");
    const data = storedForecastData
      ? (JSON.parse(storedForecastData) as Forecast)
      : undefined;
    return data;
  }, [fetchedForecastData]);

  return { forecastData, isLoading, refetch };
};
