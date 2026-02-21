import { getClientSideURL } from "@/lib/get-url";

export const getMediaUrl = (
  url: string | null | undefined,
  cacheTag?: string | null,
): string => {
  if (!url) return "";

  if (cacheTag && cacheTag !== "") {
    cacheTag = encodeURIComponent(cacheTag);
  }

  // Check if URL already has http/https protocol
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return cacheTag ? `${url}?${cacheTag}` : url;
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL();
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`;
};
