import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import * as Location from "expo-location";
import { router, Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { Geolocation, getLocationByGeo } from "@/api";
import Input from "@/components/Input";
import { LocationItem } from "@/components/LocationItem";
import { QUERY_KEYS } from "@/constants/queries";
import { storeData } from "@/libs/localStorage";

export default function AddLocation() {
  const [location, setLocation] = useState<Geolocation | string>();
  const { theme } = useUnistyles();
  const inputRef = useRef<TextInput>(null);
  const debouncedLocation = useDebounce(location, 500);

  const { data } = useQuery({
    enabled: !!debouncedLocation,
    queryKey: [QUERY_KEYS.GET_LOCATION, debouncedLocation],
    queryFn: () => getLocationByGeo(debouncedLocation as Geolocation | string),
  });

  const openSettings = () => {
    Linking.openSettings();
  };

  const getLonLat = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Location Permission Required",
        "Please enable location permissions in settings to use this feature",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: openSettings },
        ],
      );
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation({
      lat: loc.coords.latitude,
      lon: loc.coords.longitude,
    });
  };

  const selectCity = async (locationUrl: string) => {
    try {
      storeData("SELECTED_LOCATION_KEY", locationUrl);
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/home");
      }
    } catch (error) {
      console.error("Failed to store selected city:", error);
    }
  };

  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        Keyboard.dismiss();
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 100);
      }
    }, 100);

    return () => clearTimeout(focusTimeout);
  }, []);

  return (
    <View testID="add-location-screen" style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
        }}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find a city</Text>
        <Text style={styles.subtitle}>
          Search by name or use your current location
        </Text>
      </View>

      {/* Search input */}
      <View style={styles.searchRow}>
        <Input
          testID="location-input"
          ref={inputRef}
          style={styles.input}
          placeholder="Search city..."
          onChangeText={setLocation}
          leftIconName="search"
        />
      </View>

      {/* Use my location button */}
      <TouchableOpacity
        onPress={getLonLat}
        style={styles.geoButton}
        activeOpacity={0.8}
      >
        <Feather name="navigation" size={16} color={theme.colors.primary} />
        <Text style={styles.geoButtonText}>Use my current location</Text>
      </TouchableOpacity>

      {/* Separator */}
      {data && data.length > 0 && (
        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorLabel}>Results</Text>
          <View style={styles.separatorLine} />
        </View>
      )}

      <FlatList
        data={data}
        initialNumToRender={10}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item, index }) => (
          <LocationItem
            testID={`location-item-${index}`}
            item={item}
            onPress={selectCity}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.paddings["2xl"],
    paddingTop: theme.paddings.xl,
    paddingBottom: theme.paddings.lg,
  },
  title: {
    fontSize: theme.typography["3xl"],
    fontWeight: "800",
    color: theme.colors.typography,
    marginBottom: theme.margins.sm,
  },
  subtitle: {
    fontSize: theme.typography.base,
    color: theme.colors.gray,
  },
  searchRow: {
    paddingHorizontal: theme.paddings["2xl"],
    marginBottom: theme.margins.lg,
  },
  input: {
    flex: 1,
    color: theme.colors.typography,
  },
  geoButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: theme.margins["2xl"],
    marginBottom: theme.margins.xl,
    paddingVertical: theme.paddings.lg,
    paddingHorizontal: theme.paddings.xl,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    gap: 8,
    backgroundColor: theme.colors.surfaceMuted,
  },
  geoButtonText: {
    fontSize: theme.typography.base,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.paddings["2xl"],
    marginBottom: theme.margins.lg,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.lightGray,
  },
  separatorLabel: {
    fontSize: theme.typography.sm,
    color: theme.colors.gray,
    fontWeight: "600",
    marginHorizontal: theme.margins.lg,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
}));
