module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: ["plugin:@typescript-eslint/recommended", "eslint:recommended"],

  env: {
    es6: true,
    node: true,
  },
  plugins: ["@typescript-eslint"],

  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    // "@typescript-eslint/camelcase": "warn",
    "prefer-arrow-callback": "warn",
    "@typescript-eslint/semi": [2, "always"],
    "@typescript-eslint/quotes": ["error", "double"],
    eqeqeq: "error",
    "no-var": "error",
    "prefer-const": "error",
    "no-const-assign": "error",
    "prefer-template": "error",
    "no-trailing-spaces": "warn",
    "keyword-spacing": "error",
    "space-before-blocks": "error",
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": [2, "never"],
    "arrow-spacing": "error",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/member-delimiter-style": [
      2,
      {
        multiline: {
          delimiter: "comma",
          requireLast: false,
        },
        singleline: {
          delimiter: "comma",
          requireLast: false,
        },
      },
    ],
    "@typescript-eslint/type-annotation-spacing": [
      2,
      {
        overrides: {
          arrow: {
            before: true,
            after: true,
          },
        },
      },
    ],
    indent: ["error", 2],
  },
};
