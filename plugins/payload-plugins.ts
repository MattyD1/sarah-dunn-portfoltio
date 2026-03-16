import { getServerSideURL } from "@/lib/get-url";
import { Page } from "@/payload-types";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { Plugin } from "payload";
import { seoPlugin } from "@payloadcms/plugin-seo";

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Sarah Dunn` : "Sarah Dunn Art Portfolio";
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
];
