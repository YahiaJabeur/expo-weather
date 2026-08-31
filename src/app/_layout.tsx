import "react-native-reanimated";
import "../unistyles";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { useUnistyles } from "react-native-unistyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
  queryCache: new QueryCache({
    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Something is wrong!",
        text2: error.message,
        position: "bottom",
      }),
  }),
});

export default function RootLayout() {
  const { theme } = useUnistyles();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        style={theme.colors.typography === "#ffffff" ? "light" : "dark"}
      />
      <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }} />
      <Toast />
    </QueryClientProvider>
  );
}
