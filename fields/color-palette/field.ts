import { JSONField } from "payload";

export const paletteField = (): JSONField => {
  const baseField: JSONField = {
    name: "palette",
    label: "Generated Palette",
    type: "json",
    admin: {
      components: {
        Field: {
          path: "@/fields/color-palette",
        },
      },
    },
  };

  return baseField;
};
