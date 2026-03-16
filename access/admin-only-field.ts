import type { FieldAccess } from "payload";

import { checkRole } from "./utils";

export const adminOnlyFieldAccess: FieldAccess = ({ req: { user } }) => {
  if (user) return checkRole(["admin"], user);

  return false;
};
