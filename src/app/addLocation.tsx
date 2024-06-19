import { useQuery } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import debounce from "lodash/debounce";
import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { getLocation } from "@/api";
import Input from "@/components/Input";
import { LocationItem } from "@/components/LocationItem";
import { QUERY_KEYS } from "@/constants/queries";
import { storeData } from "@/libs/localStorage";

export default function AddLocation() {
  const [location, setLocation] = useState<string>("");
  const { styles, theme } = useStyles(stylesheet);

  const { data } = useQuery({
    enabled: !!location,
    queryKey: [QUERY_KEYS.GET_LOCATION, location],
    queryFn: () => getLocation(location),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetLocation = useCallback(
    debounce((text: string) => {
      setLocation(text);
    }, 500),
    [],
  );

  const selectCity = async (locationUrl: string) => {
    try {
      storeData("SELECTED_LOCATION_KEY", locationUrl);
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("home");
      }
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <LocationItem
            testID={`location-item-${index}`}
            // key={item.id}
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
