import React from "react";
import renderer from "react-test-renderer";
import { LocationItem } from "../LocationItem";
import { location } from "@/Mocks/location";

const mockOnPress = jest.fn();

test("renders correctly", () => {
  const tree = renderer
    .create(<LocationItem item={location} onPress={mockOnPress} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
