import { adminOnly } from "@/access/admin-only";
import { adminOnlyFieldAccess } from "@/access/admin-only-field";
import { adminOrSelf } from "@/access/admin-or-self";
import { publicAccess } from "@/access/public-access";
import { checkRole } from "@/access/utils";
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: ({ req: { user } }) => checkRole(["admin"], user),
    create: publicAccess,
    delete: adminOnly,
    read: adminOrSelf,
    unlock: adminOnly,
    update: adminOrSelf,
  },
  admin: {
    group: "Users",
    defaultColumns: ["name", "email", "roles"],
    useAsTitle: "name",
  },
  auth: {
    tokenExpiration: 1209600,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "roles",
      type: "select",
      access: {
        create: adminOnlyFieldAccess,
        read: adminOnlyFieldAccess,
        update: adminOnlyFieldAccess,
      },
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
