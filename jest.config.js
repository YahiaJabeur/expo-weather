module.exports = {
  preset: "jest-expo",
  setupFiles: ["./jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|@uidotdev/usehooks|standard-navigation))",
    "/node_modules/react-native-reanimated/plugin/",
  ],
};
