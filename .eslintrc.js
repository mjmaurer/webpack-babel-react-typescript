module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["**/*.d.ts"],
  extends: [
    "airbnb",
    "react-app",
    "plugin:no-unsanitized/DOM",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier",
    "import",
    "no-unsanitized",
    "react-hooks",
    "jsx-a11y",
  ],
  rules: {
    "react/function-component-definition": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "no-underscore-dangle": "off",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".tsx", ".ts"],
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        po: "never",
        tsx: "never",
      },
    ],
    "max-len": [
      "warn",
      {
        code: 90,
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
