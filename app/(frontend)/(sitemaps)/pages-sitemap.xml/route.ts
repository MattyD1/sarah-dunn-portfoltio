import { unstable_cache } from "next/cache";
import configPromise from "@payload-config";
import { getServerSideSitemap } from "next-sitemap";
import { getPayload } from "payload";

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      "https://www.sarahdunn.ca";

    const res = await payload.find({
      collection: "pages",
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: "published",
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    const dateFallback = new Date().toISOString();

    const sitemap = res.docs
      ? res.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => ({
            loc:
              page?.slug === "home"
                ? `${SITE_URL}/`
                : `${SITE_URL}/${page.slug}`,
            mastmod: page.updatedAt || dateFallback,
          }))
      : [];

    return sitemap;
  },
  ["pages-sitemap"],
  {
    tags: ["pages-sitemap"],
  }
);

export async function GET() {
  const sitemap = await getPagesSitemap();
  return getServerSideSitemap(sitemap);
}
