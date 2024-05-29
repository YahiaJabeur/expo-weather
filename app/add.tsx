import { View, Text, Button } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Add() {
  return (
    <View>
      <Text>add screen</Text>
      <Link href="/" asChild>
        <Button title="back" />
      </Link>
    </View>
  );
}
