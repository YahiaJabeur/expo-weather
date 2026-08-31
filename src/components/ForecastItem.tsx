import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { Measurements } from "@/types/CurrentWeather";

interface Props {
  item: Measurements;
  testID?: string;
}

export const ForecastItem = ({
  item: { condition, temp_c, time, chance_of_rain },
  testID,
}: Props) => {
  const { theme } = useUnistyles();
  const timeLabel = time.substring(11, 16);

  return (
    <View
      style={styles.container}
      testID={testID}
      accessibilityLabel={`Forecast at ${timeLabel}: ${Math.round(temp_c)} degrees Celsius`}
    >
      <Text style={styles.time}>{timeLabel}</Text>
      <Image
        source={{ uri: `https:${condition.icon}` }}
        style={styles.icon}
        accessibilityLabel={`Weather condition: ${condition.text}`}
      />
      <Text style={styles.temp}>{`${Math.round(temp_c)}°`}</Text>
      {chance_of_rain > 0 && (
        <View style={styles.rainRow}>
          <Feather name="droplet" size={10} color={theme.colors.primary} />
          <Text style={styles.rainText}>{`${chance_of_rain}%`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: theme.margins.sm,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: 14,
    paddingVertical: theme.paddings.lg,
    paddingHorizontal: theme.paddings.md,
    minWidth: 64,
  },
  icon: {
    width: 44,
    height: 44,
    marginVertical: theme.margins.xs,
  },
  temp: {
    fontSize: theme.typography.base,
    fontWeight: "700",
    color: theme.colors.typography,
  },
  time: {
    fontSize: theme.typography.sm,
    color: theme.colors.gray,
    marginBottom: theme.margins.xs,
  },
  rainRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.margins.xs,
    gap: 2,
  },
  rainText: {
    fontSize: theme.typography.sm,
    color: theme.colors.primary,
  },
}));
