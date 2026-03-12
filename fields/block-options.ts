import { CollapsibleField, Field } from "payload";
import deepMerge from "@/lib/deepMerge";
import { colorField } from "./color-picker/field";

type BlockOptionsType = (options?: {
  overrides?: Partial<CollapsibleField>;
}) => Field;

export const blockOptions: BlockOptionsType = ({ overrides = {} } = {}) => {
  const generatedBlockOptions: Field = {
    type: "collapsible",
    label: "Block Options",
    fields: [
      {
        type: "row",
        fields: [
          colorField({
            name: "backgroundColor",
            colorPresets: ["#C4C9C9", "#BCC2C2"],
            showTextInput: true,
            debounceDelay: 500,
            overrides: (field) => ({
              ...field,
              admin: {
                ...field.admin,
                width: "50%",
              },
            }),
          }),
          {
            name: "gradient",
            type: "radio",
            label: "Apply Gradient",
            defaultValue: "none",
            required: true,
            options: [
              {
                label: "Linear",
                value: "linear",
              },
              {
                label: "Radial",
                value: "radial",
              },
              {
                label: "None",
                value: "none",
              },
            ],
            admin: {
              width: "50%",
            },
          },
        ],
      },
      {
        name: "container",
        label: "Block Container",
        type: "select",
        defaultValue: "default",
        options: [
          {
            label: "Standardized Typography",
            value: "prose",
          },
          {
            label: "Full Width",
            value: "full",
          },
          {
            label: "Default",
            value: "default",
          },
        ],
        admin: {
          description:
            "This value will adjust how the block is presented on the page",
        },
      },
    ],
    admin: {
      initCollapsed: true,
    },
  };

  return deepMerge(generatedBlockOptions, overrides);
};
