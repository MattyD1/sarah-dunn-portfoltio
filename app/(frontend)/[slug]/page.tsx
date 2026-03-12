import { getPayload } from "payload";
import configPromise from "@payload-config";
import { draftMode } from "next/headers";
import { Metadata } from "next";
import { generateMeta } from "@/lib/generate-meta";
import { RenderHero } from "@/heros/render-hero";
import { RenderBlocks } from "@/blocks/render-blocks";

type Args = {
  params: Promise<{ slug?: string }>;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== "home";
    })
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = "home" } = await params;

  const page = await queryPageBySlug({ slug });

  return generateMeta({ doc: page });
}

const queryPageBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: "published" } }]),
      ],
    },
  });

  return result.docs?.[0] || null;
};

export default async function Page({ params }: Args) {
  const { slug = "home" } = await params;
  const page = await queryPageBySlug({ slug });

  if (!page) return null;

  const { hero, layout, pageColor } = page;

  return (
    <article
      className="flex flex-col"
      style={{
        backgroundColor: pageColor ?? undefined,
      }}
    >
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
      {/* Buffer */}
      <div className="h-screen bg-[#C4C9C9]" />
    </article>
  );
}
