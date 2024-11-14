import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { getStoredData } from "@/libs/localStorage";

type UseLocationReturn = {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};

export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<string>("");

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

  return { location, setLocation };
};
