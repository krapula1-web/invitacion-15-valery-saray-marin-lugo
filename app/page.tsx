"use client";

import { motion } from "framer-motion";
import { CalendarDays, ChevronDown, Clock3, MapPin, Music2, Sparkles, Heart } from "lucide-react";

const sections = [
  { id: "evento", label: "El evento" },
  { id: "galeria", label: "Galería" },
  { id: "confirmacion", label: "Confirmación" }
];

export default function Home() {
  return (
    <main className="invitation">
      <section className="hero" id="inicio">
        <div className="heroOrnament ornamentA" />
        <div className="heroOrnament ornamentB" />
        <div className="petal petalA" />
        <div className="petal petalB" />
        <motion.div className="heroContent" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
          <p className="eyebrow">Una noche para recordar</p>
          <p className="intro">Mis</p>
          <h1>15</h1>
          <p className="years">años</p>
          <div className="nameRule"><span>✦</span></div>
          <p className="name">Valery Saray</p>
          <p className="surname">Marín Lugo</p>
          <a className="openButton" href="#evento"><Sparkles size={17} /> Abrir invitación</a>
        </motion.div>
        <a href="#evento" className="scrollHint" aria-label="Continuar"><ChevronDown size={20} /></a>
      </section>

      <nav className="miniNav" aria-label="Navegación">
        {sections.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
      </nav>

      <section className="welcome section" id="evento">
        <p className="eyebrow">Con mucho cariño</p>
        <h2>Quiero compartir este momento contigo</h2>
        <p>Hay momentos que se convierten en recuerdos para toda la vida. Mi celebración de 15 años será uno de ellos y me encantará que formes parte de esta noche tan especial.</p>
      </section>

      <section className="eventSection section">
        <div className="sectionHeading"><span>Detalles</span><h2>La celebración</h2></div>
        <div className="details">
          <div className="detailCard"><CalendarDays size={25}/><span>Fecha</span><strong>Próximamente</strong><small>Guarda esta fecha</small></div>
          <div className="detailCard"><Clock3 size={25}/><span>Hora</span><strong>Próximamente</strong><small>Te esperamos</small></div>
          <div className="detailCard"><MapPin size={25}/><span>Lugar</span><strong>Próximamente</strong><small>Ver ubicación</small></div>
        </div>
      </section>

      <section className="countdown section">
        <p className="eyebrow">La cuenta regresiva comienza pronto</p>
        <h2>Faltan</h2>
        <div className="timer">
          {["00 días", "00 horas", "00 min", "00 seg"].map((x) => <div key={x}><b>{x.split(" ")[0]}</b><span>{x.split(" ")[1]}</span></div>)}
        </div>
      </section>

      <section className="quote section">
        <Heart size={22}/>
        <blockquote>“Los momentos más bonitos de la vida merecen ser compartidos con quienes más queremos.”</blockquote>
      </section>

      <section className="gallery section" id="galeria">
        <div className="sectionHeading"><span>Recuerdos</span><h2>Galería</h2></div>
        <div className="galleryGrid">
          <div className="photo photo1">Tu foto aquí</div><div className="photo photo2">Tu foto aquí</div>
          <div className="photo photo3">Tu foto aquí</div><div className="photo photo4">Tu foto aquí</div>
        </div>
      </section>

      <section className="music section">
        <Music2 size={25}/><p className="eyebrow">Nuestra canción</p><h2>Un momento especial</h2><p>La música podrá acompañar tu recorrido por esta invitación.</p>
        <button className="musicButton"><Music2 size={16}/> Reproducir música</button>
      </section>

      <section className="rsvp section" id="confirmacion">
        <div className="sectionHeading"><span>Tu compañía es importante</span><h2>¿Nos acompañas?</h2></div>
        <p>Muy pronto podrás confirmar tu asistencia desde aquí.</p>
        <button className="confirmButton">Confirmar asistencia</button>
      </section>

      <footer><Sparkles size={16}/><span>Valery Saray · Mis 15 años</span><Sparkles size={16}/></footer>
    </main>
  );
}
