import React from "react";
import renderer from "react-test-renderer";
import { ForecastItem } from "../ForecastItem";
import { measurements } from "@/Mocks/measurements";

test("renders correctly", () => {
  const tree = renderer
    .create(<ForecastItem item={measurements[0]} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
