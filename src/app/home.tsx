import { Feather } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { DevButton } from "@/components/DevButton";
import { ForecastItem } from "@/components/ForecastItem";
import { useWeatherData } from "@/hooks/use-weather-data";

export default function Home() {
  const { styles, theme } = useStyles(stylesheet);
  const { forecastData, refetch, nextDaysMeasurements, isLoading } =
    useWeatherData();

  return (
    <ScrollView
      testID="home-screen"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <Stack.Screen
        options={{
          headerTitleStyle: { color: theme.colors.typography },
          headerStyle: { backgroundColor: theme.colors.background },
          title: forecastData ? forecastData?.location.name : "",
          headerShadowVisible: false,
          headerRight: () => (
            <Link testID="change-location" href="/addLocation">
              <Feather name="edit" size={24} color={theme.colors.typography} />
            </Link>
          ),
        }}
      />
      {forecastData && (
        <>
          <Image
            source={{ uri: `https:${forecastData.current.condition.icon}` }}
            style={styles.icon}
            testID="weather-icon"
          />
          <Text
            style={styles.name}
            testID="location-name"
          >{`${forecastData.location.name}, ${forecastData.location.country}`}</Text>
          <View testID="temperature" style={styles.tempContainer}>
            <Text style={styles.temp}>{`${forecastData.current.temp_c}`}</Text>
            <Text style={styles.unit}>°C</Text>
          </View>
          <Text>{forecastData.current.condition.text}</Text>
          <Text
            testID="feels-like"
            style={styles.feelsLike}
          >{`Feels like ${forecastData.current.feelslike_c} °C`}</Text>
          {nextDaysMeasurements && (
            <View style={styles.forecastWrapper}>
              {nextDaysMeasurements.map((measurement, index) => {
                return (
                  <ForecastItem
                    testID={`forecast-${index}`}
                    key={measurement.time}
                    item={measurement}
                  />
                );
              })}
            </View>
          )}
        </>
      )}
      {__DEV__ && <DevButton />}
    </ScrollView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  tempContainer: {
    flexDirection: "row",
  },
  unit: {
    marginTop: theme.margins.lg,
    fontWeight: "bold",
    fontSize: theme.typography.lg,
    color: theme.colors.typography,
  },
  temp: {
    fontSize: theme.typography["7xl"],
    color: theme.colors.typography,
  },
  icon: {
    marginTop: theme.margins.xl,
    width: 100,
    height: 100,
  },
  name: {
    fontWeight: "bold",
    fontSize: theme.typography.lg,
    color: theme.colors.typography,
    marginBottom: theme.margins.lg,
  },
  feelsLike: {
    fontSize: theme.typography.xl,
    color: theme.colors.typography,
    marginVertical: theme.margins.xl,
  },
  forecastWrapper: {
    marginVertical: theme.margins.xl,
    flexDirection: "row",
  },
}));
