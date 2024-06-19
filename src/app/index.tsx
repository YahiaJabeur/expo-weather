import { getStoredData } from "@/libs/localStorage";
import { Redirect, Stack } from "expo-router";
import React, { useEffect, useState } from "react";

export default function App() {
  const [location, setLocation] = useState<string | undefined>(undefined);

  // use memo instead
  useEffect(() => {
    const storedCity = getStoredData("SELECTED_LOCATION_KEY");
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
