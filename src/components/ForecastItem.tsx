import React from "react";
import { Image, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { Measurements } from "@/types/CurrentWeather";

interface Props {
  item: Measurements;
  testID?: string;
}

export const ForecastItem = ({
  item: { condition, temp_c, time },
  testID,
}: Props) => {
  return (
    <View
      style={styles.container}
      testID={testID}
      accessibilityLabel={`Forecast at ${time.substring(11)}: ${temp_c} degrees Celsius`}
    >
      <Image
        source={{ uri: `https:${condition.icon}` }}
        style={styles.icon}
        accessibilityLabel={`Weather condition: ${condition.text}`}
      />
      <Text style={styles.temp}>{`${Math.round(temp_c)} °C`}</Text>
      <Text style={styles.time}>{time.substring(11)}</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: theme.margins.lg,
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: theme.typography.base,
    color: theme.colors.typography,
    marginBottom: theme.margins.lg,
  },
  time: {
    fontSize: theme.typography.sm,
    color: theme.colors.typography,
    marginBottom: theme.margins.lg,
  },
}));
