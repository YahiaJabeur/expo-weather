import { API_KEY, BASE_URL } from "@/constants/config";
import { City } from "@/types/City";
import { CurrentWeather, Forecast } from "@/types/CurrentWeather";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
});

export const getLocation = async (location: string): Promise<City[]> => {
  const { data } = await api.get(`/search.json?key=${API_KEY}&q=${location}`);
  return data;
};

export const getCurrentWeather = async (
  locationUrl: string,
): Promise<CurrentWeather> => {
  const { data } = await api.get(
    `/current.json?key=${API_KEY}&q=${locationUrl}&aqi=no`,
  );
  return data;
};

export const getForecast = async (locationUrl: string): Promise<Forecast> => {
  const { data } = await api.get(
    `/forecast.json?key=${API_KEY}&q=${locationUrl}&days=2&aqi=no&alerts=no`,
  );
  return data;
};
