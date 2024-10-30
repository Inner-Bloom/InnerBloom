// packages/express-backend/eslint.config.js
import js from "@eslint/js";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js}"],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      ...js.configs.recommended.rules
    }
  }
];
