import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    group: "Users",
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "roles",
      type: "select",
      defaultValue: ["admin"],
      hasMany: true,
      options: [
        {
          label: "admin",
          value: "admin",
        },
      ],
    },
  ],
};
