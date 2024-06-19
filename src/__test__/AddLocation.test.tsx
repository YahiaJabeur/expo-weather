import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MMKV } from "react-native-mmkv";

import Home from "@/src/app/index";

import { locations } from "@/src/Mocks/location";
import AddLocation from "@/src/app/addLocation";
import { ReactComponent } from "expo-router/build/testing-library/context-stubs";
import {
  fireEvent,
  renderRouter,
  screen,
  waitFor,
} from "expo-router/testing-library";
import { getLocation } from "../api";

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
      "/": Wrapper(Home),
      addLocation: Wrapper(AddLocation),
    },
    {
      initialUrl: "/addLocation",
    },
  );

describe("Add location screen", () => {
  it("should redirect to Add location screen when no location is not selected", async () => {
    renderer();

    await waitFor(() => {
      expect(screen).toHavePathname("/addLocation");
    });
  });

  it("should render correctly", async () => {
    renderer();

    expect(screen).toHavePathname("/addLocation");
    expect(screen.getByTestId("add-location-screen")).toBeDefined();
  });

  it("should fire getLocation api", async () => {
    renderer();
    const input = screen.getByTestId("location-input");

    fireEvent.changeText(input, "Berlin");

    await waitFor(() => {
      expect(getLocation).toHaveBeenCalledTimes(1);
    });
  });

  it("should display the result list items", async () => {
    renderer();
    const input = screen.getByTestId("location-input");

    fireEvent.changeText(input, "Berlin");

    // @ts-ignore
    getLocation.mockResolvedValueOnce(locations);

    await waitFor(async () => {
      expect(screen.getAllByTestId(/location-item-/).length).toBe(5);
    });
  });

  it("should store selected location url", async () => {
    let storage: MMKV;

    storage = new MMKV();

    jest.mock("expo-router", () => ({ back: jest.fn() }));
    renderer();
    const input = screen.getByTestId("location-input");

    fireEvent.changeText(input, "Berlin");

    // @ts-ignore
    getLocation.mockResolvedValueOnce(locations);

    await waitFor(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.press(screen.getByTestId("location-item-1"), "Berlin");
    });

    await waitFor(async () => {
      expect(storage.set).toHaveBeenCalledWith(
        "LOCATION_KEY",
        "berlin-usulutan-el-salvador",
      );
    });
  });
});
