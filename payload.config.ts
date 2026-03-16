import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";

import { Pages } from "./collections/pages";
import { Users } from "./collections/users";
import { Media } from "./collections/media";
import { s3Storage } from "@payloadcms/storage-s3";
import { Products } from "./collections/products";
import { Footer } from "./globals/footer/config";
import { plugins } from "./plugins/payload-plugins";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: lexicalEditor(),
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  collections: [Pages, Users, Media, Products],
  cors: [],
  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename }) => {
            return `${process.env.CLOUDFLARE_MEDIA_URL}/${filename}`;
          },
        },
      },

      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: "auto",
        endpoint: process.env.S3_ENDPOINT || "",
      },
    }),
  ],
  globals: [Footer],
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
});
