import { Metadata } from "next";
import { getServerSideURL } from "./get-url";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description:
    "A personal portfolio website, designed to showcase my skills and projects.",
  images: [
    {
      url: `${getServerSideURL()}/images/og-image.jpg`,
    },
  ],
  siteName: "Sarah Dunn Art Portfolio",
  title: "Sarah Dunn Art Portfolio",
};

export const mergeOpenGraph = (
  og?: Partial<Metadata["openGraph"]>,
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
