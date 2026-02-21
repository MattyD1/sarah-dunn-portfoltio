import { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description:
    "A personal portfolio website, designed to showcase my skills and projects.",
  images: [
    {
      url: "https://payloadcms.com/images/og-image.jpg",
    },
  ],
  siteName: "Sarah Dunn Portfolio",
  title: "Sarah Dunn Portfolio",
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
