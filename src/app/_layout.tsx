import "react-native-reanimated";
import "../unistyles";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

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
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerBackTitleVisible: false }} />
      <Toast />
    </QueryClientProvider>
  );
}
