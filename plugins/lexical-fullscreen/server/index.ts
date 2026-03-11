import { createServerFeature } from "@payloadcms/richtext-lexical";

export const FullscreenFeature = createServerFeature({
  feature: {
    ClientFeature: "/plugins/lexical-fullscreen/client#FullscreenFeatureClient",
  },
  key: "fullscreen",
});
