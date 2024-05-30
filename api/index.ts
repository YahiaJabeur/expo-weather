import { API_KEY, BASE_URL } from "@/constants/config";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
});

export const getLocation = async (location: string) => {
  const { data } = await api.get(`/search.json?key=${API_KEY}&q=${location}`);
  return data;
};

export const getCurrentWeather = async (locationUrl: string) => {
  const { data } = await api.get(
    `/current.json?key=${API_KEY}&q=${location}&aqi=no`,
  );
  return data;
};
