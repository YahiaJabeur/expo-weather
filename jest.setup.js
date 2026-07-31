const { NativeModules } = require("react-native");

NativeModules.Unistyles = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};

require("./src/unistyles");

jest.mock("@testing-library/jest-native/extend-expect");
