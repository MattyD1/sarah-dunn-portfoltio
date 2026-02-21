import { Page } from "@/payload-types";
import { Metadata } from "next";
import { mergeOpenGraph } from "./merge-open-graph";

export const generateMeta = async (args: { doc: Page }): Promise<Metadata> => {
  const { doc } = args || {};

  return {
    openGraph: mergeOpenGraph(),
  };
};
