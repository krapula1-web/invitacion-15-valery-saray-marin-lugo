import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {\n  width: "device-width",\n  initialScale: 1,\n  viewportFit: "cover",\n  themeColor: "#302236",\n};\n\nexport const metadata: Metadata = {
  title: "Valery Saray | Mis 15 años",
  description: "Una experiencia digital creada para celebrar los 15 años de Valery Saray Marín Lugo.",
  keywords: ["Valery Saray", "Mis 15 años", "invitación digital", "quinceañera"],
  openGraph: {
    title: "Valery Saray | Mis 15 años",
    description: "Una noche para recordar.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}