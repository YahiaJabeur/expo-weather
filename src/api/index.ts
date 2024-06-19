import axios from "axios";

import { API_KEY, BASE_URL } from "@/constants/config";
import { City } from "@/types/City";
import { CurrentWeather, Forecast } from "@/types/CurrentWeather";

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

export const getLocation = async (location: string) => {
  const { data } = await api.get<City[]>(`/search.json?q=${location}`);
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
