import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { files: ['**/*.{js,ts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,

  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,

  }),

  globalIgnores(['.config/*']),

  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'no-console': 'warn',
      '@stylistic/indent': ['error', 2],
      '@stylistic/jsx-one-expression-per-line': 'off',
      'linebreak-style': [
        'error',
        'windows',
      ],
    },
  },
]);
