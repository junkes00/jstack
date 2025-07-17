import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  { files: ["**/*.{js,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },

  js.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  reactHooks.configs["recommended-latest"],
  reactRefresh.configs.vite,

  globalIgnores(["dist", ".config/*"]),

  stylistic.configs.customize({
    indent: 2,
    quotes: "double",
    semi: true,
  }),

  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
      "linebreak-style": [
        "error",
        "windows",
      ],
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "@stylistic/indent": ["error", 2],
      "@stylistic/jsx-one-expression-per-line": "off",
      "@stylistic/no-multiple-empty-lines": "off",
      "@stylistic/comma-dangle": "off",
    },
  },
]);
