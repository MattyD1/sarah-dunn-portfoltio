import { Page } from "@/payload-types";
import { blurDataUrlsPlugin } from "@oversightstudio/blur-data-urls";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { mediaGalleryPlugin } from "@sitebytom/payload-media-gallery";
import { Plugin } from "payload";

import { getServerSideURL } from "@/lib/get-url";
import { Media } from "@/collections/media";

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Sarah Dunn` : "Sarah Dunn Art Portfolio";
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
  mediaGalleryPlugin({
    collections: {
      media: true,
    },
    defaultView: "justified", // 'justified' | 'masonry' | 'grid' | 'list'
    layouts: {
      justified: {
        enabled: true,
        footer: "hover", // 'hover' | 'always'
      },
      masonry: {
        enabled: true,
        footer: "hover", // 'hover' | 'always'
      },
      grid: {
        enabled: true,
        footer: "hover", // 'hover' | 'always'
      },
    },
    lightbox: true,
    edit: true,
    disabled: false,
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  blurDataUrlsPlugin({
    enabled: true,
    collections: [Media],
  }),
];
