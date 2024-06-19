import React from "react";
import renderer from "react-test-renderer";

import { location } from "@/Mocks/location";

import { LocationItem } from "../LocationItem";

const mockOnPress = jest.fn();

test("renders correctly", () => {
  const tree = renderer
    .create(<LocationItem item={location} onPress={mockOnPress} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
