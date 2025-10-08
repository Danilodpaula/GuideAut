import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import i18next from "eslint-plugin-i18next";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["node_modules", "dist"] },
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      i18next,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "no-console": "error",
      "react/forbid-component-props": ["error", { forbid: ["style"] }],
      "i18next/no-literal-string": [
        "error",
        { markupOnly: true, ignoreAttributeNames: ["data-testid", "id", "to"] },
      ],
      "import/order": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-explicit-any": "off",   // <- desativado

      "react-hooks/exhaustive-deps": "warn",
      // regra de cores removida (no-restricted-syntax para hex/rgb)
    },
  },
  {
    files: ["src/modules/ESDModule/styles/themes/**/*.{ts,tsx}"],
    rules: {},
  },
  {
    files: [
      "src/modules/ESDModule/**/*.test.{ts,tsx}",
      "src/modules/ESDModule/**/__tests__/**/*.{ts,tsx}",
    ],
    rules: { "i18next/no-literal-string": "off" },
  },
];
