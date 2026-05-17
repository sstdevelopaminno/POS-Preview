import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "QR Login",
  description: "QR and PIN login surface for POS staff"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Segoe UI, sans-serif", background: "#f7f7f7" }}>{children}</body>
    </html>
  );
}

