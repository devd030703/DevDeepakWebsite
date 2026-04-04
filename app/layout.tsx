import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import "./globals.css";
import { siteConfig } from "@/lib/content";

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Dev Deepak",
    "Product",
    "Engine by Starling",
    "Starling Bank",
    "personal website"
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=Plus+Jakarta+Sans:wght@600;700&family=Fraunces:opsz,wght@9..144,500&family=Crimson+Pro:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
