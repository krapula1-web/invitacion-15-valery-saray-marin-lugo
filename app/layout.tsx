import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valery Saray | Mis 15 años",
  description: "Una experiencia digital creada para celebrar los 15 años de Valery Saray Marín Lugo.",
  keywords: ["Valery Saray", "Mis 15 años", "invitación digital", "quinceañera"],
  icons: { icon: "/favicon.ico" },
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