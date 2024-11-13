import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getForecast } from "@/api";
import { QUERY_KEYS } from "@/constants/queries";
import { getStoredData, storeData } from "@/libs/localStorage";
import { Forecast, Measurements } from "@/types/CurrentWeather";
import { getNextMeasurements } from "@/utils/getNextMeasurements";

interface UseWeatherDataReturn {
  data: Forecast | undefined;
  isLoading: boolean;
  refetch: () => Promise<QueryObserverResult<Forecast, Error>>;
  nextDaysMeasurements: Measurements[] | undefined;
}

export const useWeatherData = (): UseWeatherDataReturn => {
  const [location, setLocation] = useState<string>("");

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

  const checkStoreLocation = useCallback(() => {
    try {
      const storedCity = getStoredData("SELECTED_LOCATION_KEY");

      if (storedCity) {
        setLocation(storedCity);
      }
    } catch (error) {
      console.error("Failed to load selected city:", error);
    }
  }, []);

  useFocusEffect(() => {
    checkStoreLocation();
  });

  const nextDaysMeasurements = useMemo(() => {
    if (!forecastData?.forecast?.forecastday) return undefined;

    try {
      const measurements = [
        ...forecastData.forecast.forecastday[0].hour,
        ...forecastData.forecast.forecastday[1].hour,
      ];
      return getNextMeasurements(measurements);
    } catch (error) {
      console.error("Error processing measurements:", error);
      return undefined;
    }
  }, [forecastData]);

  return {
    data: forecastData,
    isLoading,
    refetch,
    nextDaysMeasurements,
  };
};
