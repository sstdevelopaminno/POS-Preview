import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/?app=sstipos",
    name: "SSTiPOS",
    short_name: "SSTiPOS",
    description: "SSTiPOS mobile login and POS handoff",
    start_url: "/login/store",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f4efe7",
    theme_color: "#c15627",
    icons: [
      {
        src: "/brand/sst-ipos-logo-sample.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/brand/sst-ipos-logo-sample.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/brand/sst-ipos-logo-sample.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
