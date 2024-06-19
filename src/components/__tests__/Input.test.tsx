import React from "react";
import renderer from "react-test-renderer";

import Input from "../Input";

test("renders correctly", () => {
  const tree = renderer.create(<Input />).toJSON();

  expect(tree).toMatchSnapshot();
});
