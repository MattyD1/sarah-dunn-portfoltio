import { getPayload } from "payload";
import configPromise from "@payload-config";
import { draftMode } from "next/headers";
import { Metadata } from "next";
import { generateMeta } from "@/lib/generate-meta";
import { RenderHero } from "@/heros/render-hero";
import { RenderBlocks } from "@/blocks/render-blocks";
import { Footer } from "@/globals/footer/component";
import { ColorPalette } from "@/fields/color-palette/types";
import { Cursor } from "@/components/cursor";

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

  const {
    hero,
    layout,
    theme: { palette: untypedPalette },
  } = page;

  const palette = untypedPalette as ColorPalette | null;

  console.log(palette);

  return (
    <article
      className="flex flex-col bg-(--accent-one)"
      style={
        {
          "--accent-one": palette?.accentScale[0] ?? "#fff",
          "--accent-two": palette?.accentScale[1] ?? "#fff",
          "--accent-three": palette?.accentScale[2] ?? "#fff",
          "--accent-four": palette?.accentScale[3] ?? "#fff",
          "--accent-five": palette?.accentScale[4] ?? "#fff",
          "--accent-six": palette?.accentScale[5] ?? "#fff",
          "--accent-seven": palette?.accentScale[6] ?? "#fff",
          "--accent-eight": palette?.accentScale[7] ?? "#fff",
          "--accent-nine": palette?.accentScale[8] ?? "#fff",
          "--accent-ten": palette?.accentScale[9] ?? "#fff",
          "--accent-eleven": palette?.accentScale[10] ?? "#fff",
          "--accent-twelve": palette?.accentScale[11] ?? "#fff",
          "--grey-one": "#00ff00",
          "--grey-two": "#00ff00",
          "--grey-three": "#00ff00",
          "--grey-four": "#00ff00",
          "--grey-five": "#00ff00",
          "--grey-six": "#00ff00",
          "--grey-seven": "#00ff00",
          "--grey-eight": "#00ff00",
          "--grey-nine": "#00ff00",
          "--grey-ten": "#00ff00",
          "--grey-eleven": "#00ff00",
          "--grey-twelve": "#00ff00",
        } as React.CSSProperties
      }
    >
      <Cursor />
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
      <Footer />
    </article>
  );
}
