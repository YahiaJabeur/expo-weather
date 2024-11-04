import { MaterialIcons } from "@expo/vector-icons";
import React, { forwardRef } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ButtonProps extends TouchableOpacityProps {
  text?: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  iconSize?: number;
  variant?: "primary" | "secondary" | "outline";
  iconPosition?: "left" | "right";
}

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      text,
      iconName,
      iconSize = 24,
      style,
      variant = "primary",
      iconPosition = "left",
      ...props
    },
    ref,
  ) => {
    const { styles, theme } = useStyles(stylesheet);

    const buttonStyles = [
      styles.button,
      variant === "secondary" && styles.buttonSecondary,
      variant === "outline" && styles.buttonOutline,
      style,
    ];

    const textStyles = [
      styles.text,
      variant === "secondary" && styles.textSecondary,
      variant === "outline" && styles.textOutline,
    ];

    const renderContent = () => (
      <>
        {iconName && iconPosition === "left" && (
          <MaterialIcons
            name={iconName}
            size={iconSize}
            color={
              variant === "primary" ? theme.colors.light : theme.colors.primary
            }
            style={styles.iconLeft}
          />
        )}
        <Text style={textStyles}>{text}</Text>
        {iconName && iconPosition === "right" && (
          <MaterialIcons
            name={iconName}
            size={iconSize}
            color={
              variant === "primary" ? theme.colors.light : theme.colors.primary
            }
            style={styles.iconRight}
          />
        )}
      </>
    );

    return (
      <TouchableOpacity ref={ref} style={buttonStyles} {...props}>
        <View style={styles.content}>{renderContent()}</View>
      </TouchableOpacity>
    );
  },
);

Button.displayName = "Button";

const stylesheet = createStyleSheet((theme) => ({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius,
    padding: theme.paddings.md,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: theme.colors.light,
    fontSize: theme.typography.base,
    fontWeight: "600",
  },
  textSecondary: {
    color: theme.colors.light,
  },
  textOutline: {
    color: theme.colors.primary,
  },
  iconLeft: {
    marginRight: theme.margins.sm,
  },
  iconRight: {
    marginLeft: theme.margins.sm,
  },
}));

export default Button;
