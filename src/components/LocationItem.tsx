import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

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
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableOpacity
      onPress={() => onPress(url)}
      style={styles.container}
      testID={testID}
      accessibilityLabel={`Location: ${name}, ${region}, ${country}`}
    >
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.region}>{region}</Text>
      </View>
      <Text style={styles.country}>{country}</Text>
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: theme.colors.lightGray,
    paddingHorizontal: theme.paddings.lg,
    paddingVertical: theme.paddings.xl,
    justifyContent: "space-between",
  },
  nameContainer: {
    flexDirection: "column",
    marginRight: theme.margins.md,
  },
  name: {
    fontWeight: "bold",
    fontSize: theme.typography.lg,
    color: theme.colors.typography,
    marginBottom: theme.margins.lg,
  },
  region: {
    color: theme.colors.gray,
    alignSelf: "flex-start",
  },
  country: {
    color: theme.colors.primaryLight,
  },
}));
