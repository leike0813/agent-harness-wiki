import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/**", "node_modules/**", "site/**", "releases/**"] },
  ...tseslint.configs.recommended,
];
