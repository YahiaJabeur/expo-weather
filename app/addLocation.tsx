import { getLocation } from "@/api";
import Input from "@/components/Input";
import { LocationItem } from "@/components/LocationItem";
import { QUERY_KEYS } from "@/constants/queries";
import { STORAGE_KEYS, getStoredData, storeData } from "@/libs/localStorage";
import { useQuery } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function AddLocation() {
  const [location, setLocation] = useState<string>("");
  const [isCitySelected, setIsCitySelected] = useState(false);
  const { styles, theme } = useStyles(stylesheet);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_LOCATION, location],
    queryFn: async () => {
      if (location) return await getLocation(location);
      else return [];
    },
  });

  useEffect(() => {
    try {
      const selectedCity = getStoredData(STORAGE_KEYS.SELECTED_CITY_KEY);
      if (selectedCity !== undefined) {
        setIsCitySelected(true);
      }
    } catch (error) {
      console.error("Failed to load selected city:", error);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetLocation = useCallback(
    debounce((text: string) => {
      setLocation(text);
    }, 500),
    [],
  );

  const selectCity = async (locationUrl: string) => {
    try {
      storeData(STORAGE_KEYS.SELECTED_CITY_KEY, locationUrl);
      router.back();
    } catch (error) {
      console.error("Failed to store selected city:", error);
    }
  };

  return (
    <View testID="add-location-screen" style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: { backgroundColor: theme.colors.background },
          headerBackVisible: isCitySelected ? true : false,
          headerShadowVisible: false,
        }}
      />
      <Input
        testID="location-input"
        style={styles.input}
        placeholder="Enter location"
        onChangeText={debouncedSetLocation}
      />
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <LocationItem
            testID={`location-item-${index}`}
            key={item.id}
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
  input: {
    marginHorizontal: theme.margins.lg,
    color: theme.colors.typography,
  },
}));
