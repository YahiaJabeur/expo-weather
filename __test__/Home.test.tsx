import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "@/app/index";

import { renderRouter, screen, waitFor } from "expo-router/testing-library";
import AddLocation from "@/app/addLocation";
import { ReactComponent } from "expo-router/build/testing-library/context-stubs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getForecast } from "../api";
import { forecast } from "@/Mocks/forecast";

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

  describe("when location is already selected and stored", () => {
    it("should start application in Home screen", async () => {
      // @ts-ignore
      AsyncStorage.getItem.mockResolvedValueOnce("Berlin");

      renderer();

      await waitFor(() => {
        expect(screen).toHavePathname("/");
      });
    });

    it("should call getForecast api", async () => {
      // @ts-ignore
      AsyncStorage.getItem.mockResolvedValueOnce("Berlin");

      renderer();

      expect(getForecast).toHaveBeenCalledTimes(1);
    });

    it("should display 5 next days weather", async () => {
      // @ts-ignore
      AsyncStorage.getItem.mockResolvedValueOnce("Berlin");
      // @ts-ignore
      getForecast.mockResolvedValueOnce(forecast);

      renderer();

      await waitFor(async () => {
        expect(screen.getAllByTestId(/forecast-/).length).toBe(5);
      });
    });

    it("should display the current weather details", async () => {
      // @ts-ignore
      AsyncStorage.getItem.mockResolvedValueOnce("Berlin");
      // @ts-ignore
      getForecast.mockResolvedValueOnce(forecast);

      renderer();

      await waitFor(async () => {
        // @ts-ignore
        expect(screen.getByTestId("temperature")).toHaveTextContent("21°C");
      });
      await waitFor(async () => {
        // @ts-ignore
        expect(screen.getByTestId("location-name")).toHaveTextContent(
          "Tunis, Tunisia",
        );
      });
      await waitFor(async () => {
        // @ts-ignore
        expect(screen.getByTestId("feels-like")).toHaveTextContent(
          "Feels like 21 °C",
        );
      });
      await waitFor(async () => {
        const image = screen.getByTestId("weather-icon");
        expect(image.props.source).toEqual({
          uri: "https://cdn.weatherapi.com/weather/64x64/night/116.png",
        });
      });
    });
  });
});
