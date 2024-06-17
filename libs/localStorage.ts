import { MMKV } from "react-native-mmkv";

export type STORAGE_KEYS = "SELECTED_LOCATION_KEY";

const storage = new MMKV();

export const storeData = (key: STORAGE_KEYS, value: string) => {
  return storage.set(key, value);
};

export const getStoredData = (key: STORAGE_KEYS) => {
  return storage.getString(key);
};

export const clearStorage = () => {
  return storage.clearAll();
};
