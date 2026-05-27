import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PwaBootstrap } from "@/components/pwa/pwa-bootstrap";
import "./globals.css";

export const metadata: Metadata = {
  title: "SST iPOS Login",
  description: "Secure login and pre-entry flow for SST iPOS",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "SSTiPOS",
    statusBarStyle: "default"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body>
        {children}
        <PwaBootstrap />
      </body>
    </html>
  );
}

