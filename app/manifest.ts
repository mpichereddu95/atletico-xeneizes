import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Atletico Xeneizes",
    short_name: "Atletico Xeneizes",
    description: "La piattaforma ufficiale di Atletico Xeneizes: rosa, partite, classifica, news, media, staff e sponsor.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#111111",
    icons: [
      {
        src: "/icon.png",
        sizes: "1024x1024",
        type: "image/png"
      },
      {
        src: "/apple-icon.png",
        sizes: "1024x1024",
        type: "image/png"
      }
    ]
  };
}
