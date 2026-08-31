import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

interface Props {
  iconName: keyof typeof MaterialIcons.glyphMap;
  value: string;
  label: string;
}

export const WeatherStatChip = ({ iconName, value, label }: Props) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      <MaterialIcons
        name={iconName}
        size={18}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: 12,
    paddingVertical: theme.paddings.sm,
    paddingHorizontal: theme.paddings.lg,
    marginHorizontal: theme.margins.sm,
    minWidth: 80,
  },
  icon: {
    marginBottom: theme.margins.xs,
  },
  value: {
    fontSize: theme.typography.base,
    fontWeight: "700",
    color: theme.colors.typography,
  },
  label: {
    fontSize: theme.typography.sm,
    color: theme.colors.gray,
    marginTop: theme.margins.xs,
  },
}));
