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
      colorField({
        name: "backgroundColor",
        showTextInput: true,
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
