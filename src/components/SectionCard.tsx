import React from "react";
import { Text, View, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface Props {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const SectionCard = ({ title, children, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius,
    paddingVertical: theme.paddings.xl,
    paddingHorizontal: theme.paddings.xl,
    marginHorizontal: theme.margins.xl,
    marginVertical: theme.margins.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: theme.typography.sm,
    fontWeight: "700",
    color: theme.colors.gray,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: theme.margins.lg,
  },
}));
