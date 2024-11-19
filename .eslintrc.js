module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "simple-import-sort", "eslint-plugin-react-compiler"],
  rules: {
    "prettier/prettier": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react-compiler/react-compiler": "error",
  },
  overrides: [
    {
      // Test files only
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  env: {
    jest: true,
  },
};
