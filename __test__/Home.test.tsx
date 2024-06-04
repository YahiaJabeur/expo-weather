import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "@/app/index";

import { renderRouter, screen, waitFor } from "expo-router/testing-library";
import AddLocation from "@/app/addLocation";
import { ReactComponent } from "expo-router/build/testing-library/context-stubs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Wrapper = (Component: ReactComponent) =>
  jest.fn(() => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    );
  });

const renderer = () =>
  renderRouter(
    {
      "/": Wrapper(Home),
      addLocation: Wrapper(AddLocation),
    },
    {
      initialUrl: "/",
    },
  );

describe("Home screen", () => {
  it("should render correctly", async () => {
    renderer();

    expect(screen).toHavePathname("/");
    expect(screen.getByTestId("home-screen")).toBeDefined();
  });

  it("should redirect to Add location screen when no location is not selected", async () => {
    renderer();

    await waitFor(() => {
      expect(screen).toHavePathname("/addLocation");
    });
  });

  it("should start application in Home screen when location is already selected and stored", async () => {
    // @ts-ignore
    AsyncStorage.getItem.mockResolvedValueOnce("Berlin");

    renderer();

    await waitFor(() => {
      expect(screen).toHavePathname("/");
    });
  });
});
