import { Redirect, Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { getStoredData } from "@/libs/localStorage";

export default function App() {
  const location = getStoredData("SELECTED_LOCATION_KEY");

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ActivityIndicator size={"large"} />
      {location ? (
        <Redirect href={"/home"} />
      ) : (
        <Redirect href={"/addLocation"} />
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
}));
