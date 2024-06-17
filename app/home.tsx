import { getForecast } from "@/api";
import { DevButton } from "@/components/DevButton";
import { ForecastItem } from "@/components/ForecastItem";
import { QUERY_KEYS } from "@/constants/queries";
import { getStoredData } from "@/libs/localStorage";
import { getNextMeasurements } from "@/utils/getNextMeasurements";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link, Stack, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function Home() {
  console.log("home render");

  const { styles, theme } = useStyles(stylesheet);
  const [location, setLocation] = useState<string>("");

  const { data, isLoading, refetch } = useQuery({
    enabled: !!location,
    queryKey: [QUERY_KEYS.GET_FORECAST, location],
    queryFn: () => getForecast(location),
  });

  const checkStoreLocation = async () => {
    try {
      const storedCity = getStoredData("SELECTED_LOCATION_KEY");

      if (storedCity) {
        setLocation(storedCity);
      }
    } catch (error) {
      console.error("Failed to load selected city:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkStoreLocation();
    }, []),
  );

  const memoizedMeasurements = useMemo(() => {
    if (data) {
      // TODO
      const measurement = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];
      return getNextMeasurements(measurement);
    } else return undefined;
  }, [data]);

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
          title: data ? data?.location.name : "",
          headerShadowVisible: false,
          headerRight: () => (
            <Link testID="change-location" href="/addLocation">
              <Feather name="edit" size={24} color={theme.colors.typography} />
            </Link>
          ),
        }}
      />
      {data && (
        <>
          <Image
            source={{ uri: `https:${data.current.condition.icon}` }}
            style={styles.icon}
            testID="weather-icon"
          />
          <Text
            style={styles.name}
            testID="location-name"
          >{`${data.location.name}, ${data.location.country}`}</Text>
          <View testID="temperature" style={styles.tempContainer}>
            <Text style={styles.temp}>{`${data.current.temp_c}`}</Text>
            <Text style={styles.unit}>°C</Text>
          </View>
          <Text>{data.current.condition.text}</Text>
          <Text
            testID="feels-like"
            style={styles.feelsLike}
          >{`Feels like ${data.current.feelslike_c} °C`}</Text>
          {memoizedMeasurements && (
            <View style={styles.forecastWrapper}>
              {memoizedMeasurements.map((measurement, index) => {
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
      <DevButton />
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
