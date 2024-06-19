import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const Input = ({ style, ...props }: TextInputProps) => {
  const { styles } = useStyles(stylesheet);

  return <TextInput style={[styles.input, style]} {...props} />;
};

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
