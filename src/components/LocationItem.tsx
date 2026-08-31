import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { City } from "@/types/City";

interface Props {
  item: City;
  onPress: (locationUrl: string) => Promise<void>;
  testID?: string;
}

export const LocationItem = ({
  item: { name, region, country, url },
  onPress,
  testID,
}: Props) => {
  const { theme } = useUnistyles();

  return (
    <TouchableOpacity
      onPress={() => onPress(url)}
      style={styles.container}
      testID={testID}
      accessibilityLabel={`Location: ${name}, ${region}, ${country}`}
      activeOpacity={0.7}
    >
      <Feather
        name="map-pin"
        size={18}
        color={theme.colors.primary}
        style={styles.pinIcon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.sub}>
          {[region, country].filter(Boolean).join(", ")}
        </Text>
      </View>
      <Feather name="chevron-right" size={18} color={theme.colors.lightGray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.paddings.xl,
    paddingVertical: theme.paddings.xl,
    borderBottomWidth: 1,
    borderColor: theme.colors.lightGray,
  },
  pinIcon: {
    marginRight: theme.margins.lg,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "700",
    fontSize: theme.typography.base,
    color: theme.colors.typography,
    marginBottom: theme.margins.xs,
  },
  sub: {
    fontSize: theme.typography.sm,
    color: theme.colors.gray,
  },
}));
