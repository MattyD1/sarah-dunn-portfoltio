import { Access } from "payload";

import { checkRole } from "./utils";

export const adminOrPublished: Access = ({ req: { user } }) => {
  if (user && checkRole(["admin"], user)) return true;

  return {
    _status: {
      equals: "published",
    },
  };
};
