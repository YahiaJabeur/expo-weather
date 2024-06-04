import { getNextMeasurements } from "../getNextMeasurements";
import { measurements } from "@/Mocks/measurements";

describe("getNextMeasurements", () => {
  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return an empty array if no measurements are after current time", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2025, 3, 1));

    const nextMeasurements = getNextMeasurements(measurements);

    expect(nextMeasurements).toEqual([]);
  });

  it("should return up to 5 next measurements after current time", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-06-04T07:34:58.472Z"));

    const nextMeasurements = getNextMeasurements(measurements);

    expect(nextMeasurements.length).toBe(5);
    expect(nextMeasurements).toEqual([
      {
        time_epoch: 1717484400,
        time: "2024-06-04 10:00",
        temp_c: 24.6,
        temp_f: 76.2,
        is_day: 1,
        condition: {
          text: "Sunny",
          icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          code: 1000,
        },
        wind_mph: 6.9,
        wind_kph: 11.2,
        wind_degree: 246,
        wind_dir: "WSW",
        pressure_mb: 1015,
        pressure_in: 29.97,
        precip_mm: 0,
        precip_in: 0,
        snow_cm: 0,
        humidity: 33,
        cloud: 3,
        feelslike_c: 24.7,
        feelslike_f: 76.4,
        windchill_c: 24.6,
        windchill_f: 76.2,
        heatindex_c: 24.7,
        heatindex_f: 76.4,
        dewpoint_c: 7.2,
        dewpoint_f: 44.9,
        will_it_rain: 0,
        chance_of_rain: 0,
        will_it_snow: 0,
        chance_of_snow: 0,
        vis_km: 10,
        vis_miles: 6,
        gust_mph: 8,
        gust_kph: 12.9,
        uv: 6,
      },
      {
        time_epoch: 1717488000,
        time: "2024-06-04 11:00",
        temp_c: 25.8,
        temp_f: 78.5,
        is_day: 1,
        condition: {
          text: "Sunny",
          icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          code: 1000,
        },
        wind_mph: 7.6,
        wind_kph: 12.2,
        wind_degree: 253,
        wind_dir: "WSW",
        pressure_mb: 1015,
        pressure_in: 29.96,
        precip_mm: 0,
        precip_in: 0,
        snow_cm: 0,
        humidity: 30,
        cloud: 6,
        feelslike_c: 25.2,
        feelslike_f: 77.4,
        windchill_c: 25.8,
        windchill_f: 78.5,
        heatindex_c: 25.2,
        heatindex_f: 77.4,
        dewpoint_c: 6.7,
        dewpoint_f: 44.1,
        will_it_rain: 0,
        chance_of_rain: 0,
        will_it_snow: 0,
        chance_of_snow: 0,
        vis_km: 10,
        vis_miles: 6,
        gust_mph: 8.7,
        gust_kph: 14.1,
        uv: 7,
      },
      {
        time_epoch: 1717491600,
        time: "2024-06-04 12:00",
        temp_c: 26.7,
        temp_f: 80,
        is_day: 1,
        condition: {
          text: "Sunny",
          icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          code: 1000,
        },
        wind_mph: 7.6,
        wind_kph: 12.2,
        wind_degree: 252,
        wind_dir: "WSW",
        pressure_mb: 1014,
        pressure_in: 29.96,
        precip_mm: 0,
        precip_in: 0,
        snow_cm: 0,
        humidity: 28,
        cloud: 5,
        feelslike_c: 25.7,
        feelslike_f: 78.2,
        windchill_c: 26.7,
        windchill_f: 80,
        heatindex_c: 25.7,
        heatindex_f: 78.2,
        dewpoint_c: 6.6,
        dewpoint_f: 43.9,
        will_it_rain: 0,
        chance_of_rain: 0,
        will_it_snow: 0,
        chance_of_snow: 0,
        vis_km: 10,
        vis_miles: 6,
        gust_mph: 8.7,
        gust_kph: 14.1,
        uv: 7,
      },
      {
        time_epoch: 1717495200,
        time: "2024-06-04 13:00",
        temp_c: 28.5,
        temp_f: 83.3,
        is_day: 1,
        condition: {
          text: "Sunny",
          icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          code: 1000,
        },
        wind_mph: 7.8,
        wind_kph: 12.6,
        wind_degree: 243,
        wind_dir: "WSW",
        pressure_mb: 1014,
        pressure_in: 29.94,
        precip_mm: 0,
        precip_in: 0,
        snow_cm: 0,
        humidity: 26,
        cloud: 5,
        feelslike_c: 27,
        feelslike_f: 80.7,
        windchill_c: 28.5,
        windchill_f: 83.3,
        heatindex_c: 27,
        heatindex_f: 80.7,
        dewpoint_c: 7.1,
        dewpoint_f: 44.8,
        will_it_rain: 0,
        chance_of_rain: 0,
        will_it_snow: 0,
        chance_of_snow: 0,
        vis_km: 10,
        vis_miles: 6,
        gust_mph: 9,
        gust_kph: 14.5,
        uv: 7,
      },
      {
        time_epoch: 1717498800,
        time: "2024-06-04 14:00",
        temp_c: 29,
        temp_f: 84.2,
        is_day: 1,
        condition: {
          text: "Sunny",
          icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          code: 1000,
        },
        wind_mph: 8.7,
        wind_kph: 14,
        wind_degree: 242,
        wind_dir: "WSW",
        pressure_mb: 1014,
        pressure_in: 29.93,
        precip_mm: 0,
        precip_in: 0,
        snow_cm: 0,
        humidity: 25,
        cloud: 4,
        feelslike_c: 27.5,
        feelslike_f: 81.4,
        windchill_c: 29,
        windchill_f: 84.3,
        heatindex_c: 27.5,
        heatindex_f: 81.4,
        dewpoint_c: 7.3,
        dewpoint_f: 45.1,
        will_it_rain: 0,
        chance_of_rain: 0,
        will_it_snow: 0,
        chance_of_snow: 0,
        vis_km: 10,
        vis_miles: 6,
        gust_mph: 10,
        gust_kph: 16.2,
        uv: 7,
      },
    ]);
  });
});