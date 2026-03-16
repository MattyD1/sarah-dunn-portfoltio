import { ArrayField, Field } from "payload";

import deepMerge from "@/lib/deepMerge";
import { customRowLabel } from "@/components/array-row-label/utility";

import { link, type LinkAppearances } from "./link";

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false;
  overrides?: Partial<ArrayField>;
}) => Field;

export const linkGroup: LinkGroupType = ({
  appearances,
  overrides = {},
} = {}) => {
  const generatedLinkGroup: Field = {
    name: "links",
    type: "array",
    fields: [
      link({
        appearances,
      }),
    ],
    admin: {
      initCollapsed: true,
      ...customRowLabel({
        fieldToUse: "link.label",
        fallbackLabel: "{{link.icon}}",
      }),
    },
  };

  return deepMerge(generatedLinkGroup, overrides);
};
