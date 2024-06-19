import React from "react";
import renderer from "react-test-renderer";

import { measurements } from "@/Mocks/measurements";

import { ForecastItem } from "../ForecastItem";

test("renders correctly", () => {
  const tree = renderer
    .create(<ForecastItem item={measurements[0]} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
