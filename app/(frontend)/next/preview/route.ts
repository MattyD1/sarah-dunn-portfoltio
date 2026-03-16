import { NextRequest } from "next/server";
import { CollectionSlug, getPayload, PayloadRequest } from "payload";
import configPromise from "@payload-config";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise });

  const { searchParams } = new URL(req.url);

  const path = searchParams.get("path");
  const collection = searchParams.get("collection") as CollectionSlug;
  const slug = searchParams.get("slug");
  const previewSecret = searchParams.get("previewSecret");

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  if (!path || !collection || !slug) {
    return new Response("Insufficient search params", { status: 403 });
  }

  if (!path.startsWith("/")) {
    return new Response(
      "This endpoint can only be used for relative previews",
      { status: 500 },
    );
  }

  let user;

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    });
  } catch (e) {
    payload.logger.error({ err: e }, "Error verifying token for live preview");
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  const draft = await draftMode();

  if (!user) {
    draft.disable();
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  draft.enable();
  redirect(path);
}
