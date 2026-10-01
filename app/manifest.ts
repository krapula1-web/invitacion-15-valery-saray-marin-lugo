import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Valery Saray · Mis 15 años",
    short_name: "Valery Saray 15",
    description: "Invitación digital de los 15 años de Valery Saray Marín Lugo.",
    start_url: "/invitacion-15-valery-saray-marin-lugo/",
    display: "standalone",
    background_color: "#fff8fb",
    theme_color: "#4a2838",
    lang: "es",
    icons: [{ src: "/invitacion-15-valery-saray-marin-lugo/icon.svg", sizes: "any", type: "image/svg+xml" }]
  };
}
