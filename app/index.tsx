import { getForecast } from "@/api";
// import { DevButton } from "@/components/DevButton";
import { ForecastItem } from "@/components/ForecastItem";
import { QUERY_KEYS } from "@/constants/queries";
import { STORAGE_KEYS, getStoredData } from "@/libs/localStorage";
import { getNextMeasurements } from "@/utils/getNextMeasurements";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link, Stack, router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function Home() {
  const { styles } = useStyles(stylesheet);
  const [location, setLocation] = useState<string | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_FORECAST, location],
    queryFn: async () => {
      if (location) return await getForecast(location);
      else return null;
    },
  });

  const checkStoreLocation = async () => {
    try {
      const storedCity = await getStoredData(STORAGE_KEYS.SELECTED_CITY_KEY);

      if (storedCity) {
        setLocation(storedCity);
      } else {
        router.push("addLocation");
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
          title: data ? data?.location.name : "",
          headerShadowVisible: false,
          headerRight: () => (
            <Link testID="change-location" href="/addLocation">
              <Feather name="edit" size={24} color="black" />
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
          <View style={styles.tempContainer}>
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
              {memoizedMeasurements.map((measurement) => {
                return (
                  <ForecastItem
                    testID={`forecast-${measurement.time}`}
                    key={measurement.time}
                    item={measurement}
                  />
                );
              })}
            </View>
          )}
        </>
      )}
      {/* <DevButton /> */}
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
