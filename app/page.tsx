"use client";

import { motion } from "framer-motion";
import { CalendarDays, ChevronDown, MapPin, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="invitation">
      <section className="hero">
        <div className="glow glowOne" />
        <div className="glow glowTwo" />
        <motion.div
          className="heroContent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="eyebrow">Una noche para recordar</p>
          <p className="intro">Mis</p>
          <h1>15 años</h1>
          <p className="name">Valery Saray</p>
          <p className="surname">Marín Lugo</p>
          <button className="openButton">
            <Sparkles size={18} /> Abrir invitación
          </button>
        </motion.div>
        <div className="scrollHint"><ChevronDown size={20} /></div>
      </section>

      <section className="welcome section">
        <p className="eyebrow">Con mucho cariño</p>
        <h2>Quiero compartir este momento contigo</h2>
        <p>
          Hay momentos que se convierten en recuerdos para toda la vida.
          Mi celebración de 15 años será uno de ellos y me encantará que formes
          parte de esta noche tan especial.
        </p>
      </section>

      <section className="details section">
        <div className="detailCard"><CalendarDays size={26} /><span>Fecha</span><strong>Próximamente</strong></div>
        <div className="detailCard"><MapPin size={26} /><span>Lugar</span><strong>Próximamente</strong></div>
      </section>

      <section className="section placeholder">
        <p className="eyebrow">Estamos preparando algo especial</p>
        <h2>La invitación continúa</h2>
        <p>En las siguientes etapas añadiremos cuenta regresiva, ubicación, galería, música, confirmación de asistencia y conexión con Supabase.</p>
      </section>
    </main>
  );
}