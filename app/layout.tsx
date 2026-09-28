import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valery Saray | Mis 15 años",
  description: "Invitación digital de los 15 años de Valery Saray Marín Lugo"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}