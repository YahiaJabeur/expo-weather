import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getLocation } from "@/api";

export default function AddLocation() {
  const { data, isLoading } = useQuery({
    queryKey: ["GET_LOCATION"],
    queryFn: async () => {
      return await getLocation("berlin");
    },
  });
  console.log("data", data);

  return (
    <View>
      <Text>add screen</Text>
      <Link href="/" asChild>
        <Text>back</Text>
      </Link>
    </View>
  );
}
