import * as eslintPluginTypescript from "@typescript-eslint/eslint-plugin"
import eslintPluginPrettier from "eslint-plugin-prettier"
import parser from "@typescript-eslint/parser"
import prettierConfig from "./prettier.base.cjs"

export default [
  {
    languageOptions: {
      globals: {
        browser: true,
        node: true,
        es2021: true,
      },
      parser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        project: "./tsconfig.base.json",
      },
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      prettier: eslintPluginPrettier,
    },
    rules: {
      // "prettier/prettier": ["warn", prettierConfig],
      "no-console": ["error", { allow: ["error"] }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
    },
  },
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/.next/**", "**/out/**"],
  },
]
