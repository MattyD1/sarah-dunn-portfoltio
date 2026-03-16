"use client";

import { getClientSideURL } from "@/lib/get-url";
import { useRouter } from "next/navigation";
import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";

export const LivePreviewListener: React.FC = () => {
  const router = useRouter();
  return (
    <PayloadLivePreview
      refresh={router.refresh}
      serverURL={getClientSideURL()}
    />
  );
};
