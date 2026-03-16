import type { Access } from "payload";
import { checkRole } from "./utils";

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(["admin"], user)) {
      return true;
    }

    return {
      id: {
        equals: user.id,
      },
    };
  }

  return false;
};
