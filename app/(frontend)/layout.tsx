import React from "react";
import type { Metadata } from "next";

import "./globals.css";

import { draftMode } from "next/headers";
import { Providers } from "@/providers";
import { GeistSans } from "geist/font/sans";

import { getServerSideURL } from "@/lib/get-url";
import { mergeOpenGraph } from "@/lib/merge-open-graph";
import { cn } from "@/lib/utils";
import { AdminBar } from "@/components/admin-bar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html className={cn(GeistSans.variable)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" sizes="images/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
};
