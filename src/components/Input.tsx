import React, { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const Input = forwardRef<TextInput, TextInputProps>(
  ({ style, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);

    return <TextInput ref={ref} style={[styles.input, style]} {...props} />;
  },
);

Input.displayName = "Input";

const stylesheet = createStyleSheet((theme) => ({
  input: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: theme.borderRadius,
    padding: theme.paddings.lg,
    marginBottom: theme.margins.sm,
    fontSize: theme.typography.base,
  },
}));

export default Input;
