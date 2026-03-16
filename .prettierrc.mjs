/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  endOfLine: "lf",
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 80,
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/access/(.*)$",
    "^@/migrations/(.*)$",
    "^@/blocks/(.*)$",
    "^@/collections/(.*)$",
    "^@/fields/(.*)$",
    "^@/plugins/(.*)$",
    "^@/providers/(.*)$",
    "^@/globals/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindStylesheet: "./app/(frontend)/globals.css",
  tailwindFunctions: ["cn", "cva"],
};

export default config;
