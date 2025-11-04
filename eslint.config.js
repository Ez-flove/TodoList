// eslint.config.js
import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "**/.prettierrc.cjs",
      "**/eslint.config.js",
      "**/node_modules/**",
    ],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
        projectService: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      prettier: prettierPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      // ---- TypeScript rules ----
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",

      // ---- React rules ----
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",

      // ---- Import & Formatting ----
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "import/newline-after-import": ["error", { count: 1 }],
      "lines-around-comment": [
        "error",
        {
          beforeBlockComment: true,
          allowBlockStart: true,
          allowClassStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
        },
      ],
      "newline-before-return": "error",
      "no-console": "off",

      // ---- Prettier ----
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
];
