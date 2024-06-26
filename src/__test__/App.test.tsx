import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactComponent } from "expo-router/build/testing-library/context-stubs";
import { renderRouter, screen } from "expo-router/testing-library";
import React from "react";

import AddLocation from "@/app/addLocation";
import Home from "@/app/index";
import app from "@/app/index";
import { storeData } from "@/libs/localStorage";

jest.mock("../api");

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
      "/": app,
      home: Home,
      addLocation: AddLocation,
    },
    {
      initialUrl: "/",
    },
  );

describe("App", () => {
  beforeAll(() => {
    // clearStorage();
  });

  test("should render correctly", async () => {
    renderer();

    expect(screen).toHavePathname("/addLocation");
    expect(screen.getByTestId("add-location-screen")).toBeDefined();
  });

  test("should redirect to Add location screen when no location is not selected", async () => {
    renderer();

    expect(screen).toHavePathname("/addLocation");
  });

  describe("when location is already selected and stored", () => {
    test("should start application in Home screen", async () => {
      storeData("SELECTED_LOCATION_KEY", "Berlin");

      renderer();

      expect(screen).toHavePathname("/home");
    });
  });
});
