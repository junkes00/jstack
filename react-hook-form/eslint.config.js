import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  { files: ["**/*.{js,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },

  tseslint.configs.stylistic,
  pluginReact.configs.flat.recommended,

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
      // "@stylistic/indent": ["error", 2],
      "@stylistic/jsx-one-expression-per-line": "off",
      "@stylistic/no-multiple-empty-lines": "off",
      "@stylistic/comma-dangle": "off",
    },
  },
]);
