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
  TextInput,
  View,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Geolocation, getLocationByGeo } from "@/api";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { LocationItem } from "@/components/LocationItem";
import { QUERY_KEYS } from "@/constants/queries";
import { storeData } from "@/libs/localStorage";

export default function AddLocation() {
  const [location, setLocation] = useState<Geolocation | string>();
  const { styles, theme } = useStyles(stylesheet);
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
    console.log("status", status);

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

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
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
      <View style={styles.inputContainer}>
        <Input
          testID="location-input"
          ref={inputRef}
          style={styles.input}
          placeholder="Enter location"
          onChangeText={setLocation}
        />
        <Button
          onPress={getLonLat}
          variant="outline"
          iconName="my-location"
          style={styles.locationButton}
        />
      </View>
      <FlatList
        data={data}
        initialNumToRender={10}
        keyExtractor={(item) => item.id.toString()}
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

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingTop: theme.paddings.xl,
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: theme.paddings.lg,
    width: "100%",
  },
  input: {
    marginHorizontal: theme.margins.lg,
    flex: 1,
    marginRight: theme.margins.lg,
    color: theme.colors.typography,
  },
  locationButton: {
    width: 48,
    height: 48,
    padding: 0,
    aspectRatio: 1,
  },
}));
