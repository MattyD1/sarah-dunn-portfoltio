import { CollectionBeforeChangeHook } from "payload";

import { generatePalette } from "@/fields/color-palette/generate-palette";

export const populatePalette: CollectionBeforeChangeHook = ({
  data,
  operation,
  req,
}) => {
  if (operation !== "create" && operation !== "update") return data;
  if (!req.data) return data;

  const palette = generatePalette({
    appearance: req?.data?.theme?.dark ? "dark" : "light",
    accent: req?.data?.theme?.accentColor ?? "#fff",
    gray: req?.data?.theme?.grayColor ?? "#fff",
    background: req?.data?.theme?.backgroundColor ?? "#fff",
  });

  return {
    ...data,
    theme: {
      ...data.theme,
      palette,
    },
  };
};
