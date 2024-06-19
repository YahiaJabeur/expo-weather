import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "@/src/app/index";

import { forecast } from "@/src/Mocks/forecast";
import AddLocation from "@/src/app/addLocation";
import app from "@/src/app/index";
import { storeData } from "@/src/libs/localStorage";
import { ReactComponent } from "expo-router/build/testing-library/context-stubs";
import { renderRouter, screen, waitFor } from "expo-router/testing-library";
import { getForecast } from "../src/api";

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
      "/": Wrapper(app),
      home: Wrapper(Home),
      addLocation: Wrapper(AddLocation),
    },
    {
      initialUrl: "/",
    }
  );

describe("Home screen", () => {
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
      storeData(STORAGE_KEYS.SELECTED_CITY_KEY, "Berlin");

      renderer();

      expect(screen).toHavePathname("/home");
    });

    test("should call getForecast api", async () => {
      // @ts-ignore
      // AsyncStorage.getItem.mockResolvedValueOnce("Berlin");
      storeData(STORAGE_KEYS.SELECTED_CITY_KEY, "Berlin");

      renderer();

      expect(getForecast).toHaveBeenCalledTimes(1);
    });

    test("should display 5 next days weather", async () => {
      storeData(STORAGE_KEYS.SELECTED_CITY_KEY, "Berlin");

      // @ts-ignore
      getForecast.mockResolvedValueOnce(forecast);

      renderer();

      await waitFor(async () => {
        expect(screen.getAllByTestId(/forecast-/).length).toBe(5);
      });
    });

    test("should display the current weather details", async () => {
      // @ts-ignore
      // AsyncStorage.getItem.mockResolvedValueOnce("Berlin");
      storeData(STORAGE_KEYS.SELECTED_CITY_KEY, "Berlin");
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
          "Tunis, Tunisia"
        );
      });
      await waitFor(async () => {
        // @ts-ignore
        expect(screen.getByTestId("feels-like")).toHaveTextContent(
          "Feels like 21 °C"
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
