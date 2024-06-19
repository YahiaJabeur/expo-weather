import { getStoredData } from "@/libs/localStorage";
import { Redirect, Stack } from "expo-router";
import React, { useState } from "react";

export default function App() {
  const [location] = useState(getStoredData("SELECTED_LOCATION_KEY"));

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
