import { STORAGE_KEYS, getStoredData } from "@/libs/localStorage";
import { Redirect, Stack } from "expo-router";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [location, setLocation] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedCity = getStoredData(STORAGE_KEYS.SELECTED_CITY_KEY);
    setLocation(storedCity);
  }, [location]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {location ? (
        <Redirect href={"home"} />
      ) : (
        <Redirect href={"addLocation"} />
      )}
    </>
  );
}
