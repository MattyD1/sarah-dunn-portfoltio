import { Block, Field, GroupField } from "payload";

import deepMerge from "@/lib/deepMerge";

import { iconField } from "./lucide-icon-picker/field";

export type LinkAppearances = "default" | "icon";

export const appearanceOptions: Record<
  LinkAppearances,
  { label: string; value: string }
> = {
  default: {
    label: "Default",
    value: "default",
  },
  icon: {
    label: "Icon",
    value: "icon",
  },
};

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  overrides?: Partial<GroupField>;
}) => Field;

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name: "link",
    type: "group",
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "type",
            type: "radio",
            admin: {
              layout: "horizontal",
              width: "50%",
            },
            options: [
              {
                label: "Internal Link",
                value: "reference",
              },
              {
                label: "Custom Url",
                value: "custom",
              },
            ],
          },
          {
            name: "newTab",
            type: "checkbox",
            admin: {
              style: {
                alignSelf: "flex-end",
              },
              width: "50%",
            },
            label: "Open in new tab",
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: "reference",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "reference",
      },
      label: "Document to link to",
      relationTo: ["pages"],
      required: true,
    },
    {
      name: "url",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
      },
      label: "Custom URL",
      required: true,
    },
  ];

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: "50%",
      },
    }));

    linkResult.fields.push({
      type: "row",
      fields: [
        ...linkTypes,
        {
          name: "label",
          type: "text",
          admin: {
            width: "50%",
            condition: (_, siblingData) => siblingData?.appearance !== "icon",
          },
          label: "Label",
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  if (appearances !== false) {
    let appearanceOptionToUse = [appearanceOptions.default];

    if (appearances) {
      appearanceOptionToUse = appearances.map(
        (appearance) => appearanceOptions[appearance]
      );
    }

    linkResult.fields.push(
      {
        name: "appearance",
        type: "select",
        required: true,
        admin: {
          description: "Choose how the link should re rendered.",
        },
        options: appearanceOptionToUse,
      },
      iconField({
        name: "icon",
      })
    );
  }

  return deepMerge(linkResult, overrides);
};

export const linkBlock: Block = {
  slug: "linkBlock",
  interfaceName: "linkBlock",
  fields: [link()],
};
