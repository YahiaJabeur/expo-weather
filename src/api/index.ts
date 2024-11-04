import axios from "axios";

import { API_KEY, BASE_URL } from "@/constants/config";
import { City } from "@/types/City";
import { CurrentWeather, Forecast } from "@/types/CurrentWeather";

export interface Geolocation {
  lat?: number;
  lon?: number;
}

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {};
  }
  config.params.key = API_KEY;
  return config;
});

export const getLocationByGeo = async (params: Geolocation | string) => {
  if (typeof params === "string") {
    const { data } = await api.get<City[]>(`/search.json?q=${params}`);
    return data;
  }
  const { lat, lon } = params;
  const searchQuery = `${lat},${lon}`;
  if (!searchQuery) {
    throw new Error("Either coordinates (lat/lon) or name must be provided");
  }
  const { data } = await api.get<City[]>(`/search.json?q=${searchQuery}`);
  return data;
};

export const getLocation = async (location: string) => {
  const { data } = await api.get<City[]>(`/search.json?q=${location}`);
  return data;
};

export const searchLocation = async (
  query: string | { lat: number; lon: number },
) => {
  const searchQuery =
    typeof query === "string" ? query : `${query.lat},${query.lon}`;

  const { data } = await api.get<City[]>(`/search.json?q=${searchQuery}`);
  return data;
};

export const getCurrentWeather = async (locationUrl: string) => {
  const { data } = await api.get<CurrentWeather>(
    `/current.json?q=${locationUrl}&aqi=no`,
  );
  return data;
};

export const getForecast = async (locationUrl: string) => {
  const { data } = await api.get<Forecast>(
    `/forecast.json?q=${locationUrl}&days=2&aqi=no&alerts=no`,
  );
  return data;
};
