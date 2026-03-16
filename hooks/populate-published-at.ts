import { CollectionBeforeChangeHook } from "payload";

export const populatePublishedAt: CollectionBeforeChangeHook = ({
  data,
  operation,
  req,
}) => {
  if (operation !== "create" && operation !== "update") return data;
  if (!req.data || req.data.publishedAt) return data;

  const now = new Date();
  return {
    ...data,
    publishedAt: now,
  };
};
