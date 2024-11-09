import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";

import { getForecast } from "@/api";
import { QUERY_KEYS } from "@/constants/queries";
import { getStoredData } from "@/libs/localStorage";
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

  const { data, isLoading, refetch } = useQuery({
    enabled: !!location,
    queryKey: [QUERY_KEYS.GET_FORECAST, location],
    queryFn: () => getForecast(location),
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

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
    if (!data?.forecast?.forecastday) return undefined;

    try {
      const measurement = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];
      return getNextMeasurements(measurement);
    } catch (error) {
      console.error("Error processing measurements:", error);
      return undefined;
    }
  }, [data]);

  return { data, isLoading, refetch, nextDaysMeasurements };
};
