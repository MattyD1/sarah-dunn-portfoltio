"use client";

import React, { useState } from "react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import {
  PayloadAdminBar,
  type PayloadAdminBarProps,
  type PayloadMeUser,
} from "@payloadcms/admin-bar";

import { getClientSideURL } from "@/lib/get-url";
import { cn } from "@/lib/utils";

const collectionLabels = {
  pages: {
    plural: "Pages",
    singular: "Page",
  },
};

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps;
}> = ({ adminBarProps } = {}) => {
  const segments = useSelectedLayoutSegments();
  const [show, setShow] = useState(false);
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels]
      ? segments[1]
      : "pages"
  ) as keyof typeof collectionLabels;
  const router = useRouter();

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id));
  }, []);

  return (
    <div
      className={cn("text-whtie bg-black px-2 py-2", {
        block: show,
        hidden: !show,
      })}
    >
      <div>
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: "font-medium text-white",
            logo: "text-white",
            user: "text-white",
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || "Pages",
            singular: collectionLabels[collection]?.singular || "Page",
          }}
          logo={<div>Logo</div>}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch("/next/exit-preview").then(() => {
              router.push("/");
              router.refresh();
            });
          }}
          style={{
            backgroundColor: "transparent",
            padding: 0,
            position: "relative",
            zIndex: "unset",
          }}
        />
      </div>
    </div>
  );
};
