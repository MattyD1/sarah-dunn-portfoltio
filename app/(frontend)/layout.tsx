import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Providers } from "@/providers";
import { draftMode } from "next/headers";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import { AdminBar } from "@/components/admin-bar";
import { getServerSideURL } from "@/lib/get-url";
import { mergeOpenGraph } from "@/lib/merge-open-graph";

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
