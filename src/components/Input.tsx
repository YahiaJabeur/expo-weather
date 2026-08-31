import { Feather } from "@expo/vector-icons";
import React, { forwardRef } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

interface InputProps extends TextInputProps {
  leftIconName?: keyof typeof Feather.glyphMap;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ style, leftIconName, ...props }, ref) => {
    const { theme } = useUnistyles();

    if (leftIconName) {
      return (
        <View style={styles.wrapper}>
          <Feather
            name={leftIconName}
            size={18}
            color={theme.colors.gray}
            style={styles.leftIcon}
          />
          <TextInput
            ref={ref}
            style={[styles.input, styles.inputWithIcon, style]}
            placeholderTextColor={theme.colors.gray}
            {...props}
          />
        </View>
      );
    }

    return (
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        placeholderTextColor={theme.colors.gray}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
    borderRadius: 24,
    paddingHorizontal: theme.paddings.lg,
    marginBottom: theme.margins.sm,
    backgroundColor: theme.colors.surface,
  },
  leftIcon: {
    marginRight: theme.margins.sm,
  },
  input: {
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
    borderRadius: 24,
    paddingHorizontal: theme.paddings.xl,
    paddingVertical: theme.paddings.lg,
    marginBottom: theme.margins.sm,
    fontSize: theme.typography.base,
    color: theme.colors.typography,
    backgroundColor: theme.colors.surface,
  },
  inputWithIcon: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 0,
    paddingHorizontal: 0,
    marginBottom: 0,
    backgroundColor: "transparent",
  },
}));

export default Input;
