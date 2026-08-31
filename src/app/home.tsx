import { Feather } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { DevButton } from "@/components/DevButton";
import { ForecastItem } from "@/components/ForecastItem";
import { SectionCard } from "@/components/SectionCard";
import { WeatherStatChip } from "@/components/WeatherStatChip";
import { useWeatherData } from "@/hooks/use-weather-data";

export default function Home() {
  const { theme } = useUnistyles();
  const { forecastData, refetch, nextDaysMeasurements, isLoading } =
    useWeatherData();

  // Format local time of the location
  const localTime = forecastData?.location.localtime
    ? forecastData.location.localtime.substring(11, 16)
    : "";

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
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
          title: "",
          headerRight: () => (
            <Link testID="change-location" href="/addLocation">
              <Feather
                name="search"
                size={22}
                color={theme.colors.typography}
              />
            </Link>
          ),
        }}
      />

      {/* Loading skeleton */}
      {isLoading && !forecastData && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading weather…</Text>
        </View>
      )}

      {/* Empty / no data state */}
      {!isLoading && !forecastData && (
        <View style={styles.emptyContainer}>
          <Feather name="cloud-off" size={64} color={theme.colors.lightGray} />
          <Text style={styles.emptyTitle}>No weather data</Text>
          <Text style={styles.emptySubtitle}>
            Search for a city to get started
          </Text>
          <Link href="/addLocation" style={styles.emptyLink}>
            <Text style={styles.emptyLinkText}>Search a city</Text>
          </Link>
        </View>
      )}

      {forecastData && (
        <>
          {/* Location header */}
          <View style={styles.locationHeader}>
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={16} color={theme.colors.primary} />
              <Text
                style={styles.locationName}
                testID="location-name"
              >{`${forecastData.location.name}, ${forecastData.location.country}`}</Text>
            </View>
            {localTime ? (
              <Text style={styles.localTime}>{`Local time ${localTime}`}</Text>
            ) : null}
          </View>

          {/* Hero weather card */}
          <View style={styles.heroCard}>
            <Image
              source={{ uri: `https:${forecastData.current.condition.icon}` }}
              style={styles.heroIcon}
              testID="weather-icon"
            />
            <View testID="temperature" style={styles.tempContainer}>
              <Text style={styles.temp}>
                {`${Math.round(forecastData.current.temp_c)}`}
              </Text>
              <Text style={styles.unit}>°C</Text>
            </View>
            <Text style={styles.conditionText}>
              {forecastData.current.condition.text}
            </Text>

            {/* Stat chips row */}
            <View style={styles.statsRow}>
              <WeatherStatChip
                iconName="thermostat"
                value={`${Math.round(forecastData.current.feelslike_c)}°`}
                label="Feels like"
              />
              <WeatherStatChip
                iconName="water-drop"
                value={`${forecastData.current.humidity}%`}
                label="Humidity"
              />
              <WeatherStatChip
                iconName="air"
                value={`${Math.round(forecastData.current.wind_kph)} km/h`}
                label="Wind"
              />
            </View>
          </View>

          {/* Hourly forecast section */}
          {nextDaysMeasurements && nextDaysMeasurements.length > 0 && (
            <SectionCard title="Next Hours" style={styles.forecastCard}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.forecastScroll}
              >
                {nextDaysMeasurements.map((measurement, index) => (
                  <ForecastItem
                    testID={`forecast-${index}`}
                    key={measurement.time}
                    item={measurement}
                  />
                ))}
              </ScrollView>
            </SectionCard>
          )}
        </>
      )}

      {__DEV__ && <DevButton />}
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    paddingBottom: theme.paddings["3xl"],
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingTop: 80,
  },
  loadingText: {
    fontSize: theme.typography.base,
    color: theme.colors.gray,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    gap: 12,
  },
  emptyTitle: {
    fontSize: theme.typography.xl,
    fontWeight: "700",
    color: theme.colors.typography,
    marginTop: theme.margins.lg,
  },
  emptySubtitle: {
    fontSize: theme.typography.base,
    color: theme.colors.gray,
  },
  emptyLink: {
    marginTop: theme.margins.xl,
    paddingVertical: theme.paddings.lg,
    paddingHorizontal: theme.paddings["2xl"],
    backgroundColor: theme.colors.primary,
    borderRadius: 24,
  },
  emptyLinkText: {
    color: theme.colors.light,
    fontWeight: "700",
    fontSize: theme.typography.base,
  },

  // Location header
  locationHeader: {
    alignItems: "center",
    paddingTop: theme.paddings["2xl"],
    paddingBottom: theme.paddings.lg,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationName: {
    fontWeight: "700",
    fontSize: theme.typography.lg,
    color: theme.colors.typography,
  },
  localTime: {
    fontSize: theme.typography.sm,
    color: theme.colors.gray,
    marginTop: theme.margins.sm,
  },

  // Hero card
  heroCard: {
    marginHorizontal: theme.margins.xl,
    marginVertical: theme.margins.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius,
    paddingVertical: theme.paddings["2xl"],
    paddingHorizontal: theme.paddings.xl,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  heroIcon: {
    width: 120,
    height: 120,
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: theme.margins.sm,
  },
  temp: {
    fontSize: theme.typography["7xl"],
    fontWeight: "200",
    color: theme.colors.typography,
    lineHeight: 100,
  },
  unit: {
    marginTop: theme.margins.xl,
    fontWeight: "700",
    fontSize: theme.typography.xl,
    color: theme.colors.typography,
  },
  conditionText: {
    fontSize: theme.typography.lg,
    color: theme.colors.gray,
    marginTop: theme.margins.sm,
    marginBottom: theme.margins.xl,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.margins.lg,
  },

  // Forecast section
  forecastCard: {
    marginHorizontal: theme.margins.xl,
  },
  forecastScroll: {
    paddingHorizontal: theme.paddings.xs,
    gap: 8,
  },
}));
