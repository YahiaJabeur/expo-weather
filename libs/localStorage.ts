import AsyncStorage from "@react-native-async-storage/async-storage";

export enum STORAGE_KEYS {
  SELECTED_CITY_KEY = "LOCATION_KEY",
}

export const storeData = async (key: STORAGE_KEYS, value: string) => {
  return await AsyncStorage.setItem(key, value);
};

export const getStoredData = async (key: STORAGE_KEYS) => {
  return await AsyncStorage.getItem(key);
};

export const clearStorage = async () => {
  return await AsyncStorage.clear();
};
