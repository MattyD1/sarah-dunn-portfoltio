import { Access } from "payload";

import { checkRole } from "./utils";

export const adminOnly: Access = ({ req: { user } }) => {
  if (user) return checkRole(["admin"], user);

  return false;
};
