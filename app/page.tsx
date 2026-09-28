"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ChevronDown, Clock3, MapPin, Music2, Sparkles, Heart, CheckCircle2, Gift, Shirt, Navigation, Camera, MessageCircle } from "lucide-react";

const sections = [
  { id: "evento", label: "El evento" },
  { id: "programa", label: "Programa" },
  { id: "galeria", label: "Galería" },
  { id: "confirmacion", label: "Confirmación" }
];

const eventDate: string | null = null;

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    if (!eventDate) return;
    const update = () => setRemaining(Math.max(0, new Date(eventDate).getTime() - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  if (remaining === null) return <div className="timer">{["días", "horas", "min", "seg"].map((x) => <div key={x}><b>--</b><span>{x}</span></div>)}</div>;
  const totalSeconds = Math.floor(remaining / 1000);
  const values = [Math.floor(totalSeconds / 86400), Math.floor((totalSeconds % 86400) / 3600), Math.floor((totalSeconds % 3600) / 60), totalSeconds % 60];
  return <div className="timer">{values.map((value, i) => <div key={i}><b>{String(value).padStart(2, "0")}</b><span>{["días", "horas", "min", "seg"][i]}</span></div>)}</div>;
}

export default function Home() {
  const [musicOn, setMusicOn] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleRSVP(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="invitation">
      <section className="hero" id="inicio">
        <div className="heroOrnament ornamentA" /><div className="heroOrnament ornamentB" /><div className="petal petalA" /><div className="petal petalB" />
        <motion.div className="heroContent" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
          <p className="eyebrow">Una noche para recordar</p><p className="intro">Mis</p><h1>15</h1><p className="years">años</p>
          <div className="nameRule"><span>✦</span></div><p className="name">Valery Saray</p><p className="surname">Marín Lugo</p>
          <a className="openButton" href="#evento"><Sparkles size={17} /> Abrir invitación</a>
        </motion.div>
        <a href="#evento" className="scrollHint" aria-label="Continuar"><ChevronDown size={20} /></a>
      </section>

      <nav className="miniNav" aria-label="Navegación">{sections.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}</nav>

      <section className="welcome section" id="evento">
        <p className="eyebrow">Con mucho cariño</p><h2>Quiero compartir este momento contigo</h2>
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

      <section className="countdown section"><p className="eyebrow">La cuenta regresiva</p><h2>Faltan</h2><Countdown /></section>

      <section className="program section" id="programa">
        <div className="sectionHeading"><span>Una noche especial</span><h2>Programa</h2></div>
        <p>Una pequeña guía de los momentos que harán parte de esta celebración.</p>
        <div className="timeline">
          <div className="timelineItem"><span>01</span><div><strong>Recepción</strong><small>Próximamente · Bienvenida a los invitados</small></div></div>
          <div className="timelineItem"><span>02</span><div><strong>Entrada de Valery</strong><small>El momento de comenzar la celebración</small></div></div>
          <div className="timelineItem"><span>03</span><div><strong>Vals</strong><small>Un recuerdo para guardar en el corazón</small></div></div>
          <div className="timelineItem"><span>04</span><div><strong>Cena y celebración</strong><small>Compartir, disfrutar y celebrar juntos</small></div></div>
          <div className="timelineItem"><span>05</span><div><strong>Fiesta</strong><small>¡Ahora sí, a bailar!</small></div></div>
        </div>
      </section>

      <section className="quote section"><Heart size={22}/><blockquote>“Los momentos más bonitos de la vida merecen ser compartidos con quienes más queremos.”</blockquote></section>

      <section className="location section">
        <div className="sectionHeading"><span>Te esperamos</span><h2>¿Dónde será?</h2></div>
        <div className="mapPlaceholder"><MapPin size={34}/><strong>Ubicación próximamente</strong><span>Aquí aparecerá el mapa del lugar del evento.</span></div>
        <button className="outlineButton" type="button"><Navigation size={16}/> Cómo llegar</button>
      </section>

      <section className="dress section">
        <Shirt size={26}/><p className="eyebrow">Código de vestuario</p><h2>Elegancia para una noche especial</h2>
        <p>El código de vestuario se definirá próximamente. Queremos que todos se sientan cómodos y disfruten la celebración.</p>
        <div className="dressBadge">Dress code · Próximamente</div>
      </section>

      <section className="gallery section" id="galeria">
        <div className="sectionHeading"><span>Recuerdos</span><h2>Galería</h2></div>
        <div className="galleryGrid">
          <div className="photo photo1"><Camera size={22}/><span>Tu foto aquí</span></div><div className="photo photo2"><Camera size={22}/><span>Tu foto aquí</span></div>
          <div className="photo photo3"><Camera size={22}/><span>Tu foto aquí</span></div><div className="photo photo4"><Camera size={22}/><span>Tu foto aquí</span></div>
        </div>
      </section>

      <section className="music section">
        <Music2 size={25}/><p className="eyebrow">Nuestra canción</p><h2>Un momento especial</h2>
        <p>La música acompañará tu recorrido por esta invitación.</p>
        <button className="musicButton" type="button" onClick={() => setMusicOn(!musicOn)}><Music2 size={16}/> {musicOn ? "Pausar música" : "Reproducir música"}</button>
        <small className="featureNote">{musicOn ? "Reproductor preparado; añadiremos la canción elegida." : "La canción se configurará más adelante."}</small>
      </section>

      <section className="gifts section">
        <Gift size={26}/><p className="eyebrow">Con cariño</p><h2>Regalos</h2>
        <p>Tu presencia es el mejor regalo. Si deseas tener un detalle con Valery, aquí podremos colocar posteriormente la información de regalos o mesa de sobres.</p>
        <div className="giftCard"><strong>Información de regalos</strong><span>Próximamente</span></div>
      </section>

      <section className="rsvp section" id="confirmacion">
        <div className="sectionHeading"><span>Tu compañía es importante</span><h2>¿Nos acompañas?</h2></div>
        {!submitted ? (
          <form className="rsvpForm" onSubmit={handleRSVP}>
            <label>Tu nombre<input name="name" placeholder="Escribe tu nombre" required /></label>
            <label>¿Asistirás?><select name="attendance" defaultValue="si"><option value="si">Sí, allí estaré</option><option value="no">No podré asistir</option></select></label>
            <label>Número de acompañantes<input name="guests" type="number" min="0" max="10" defaultValue="0" /></label>
            <label>Mensaje<textarea name="message" placeholder="Un mensaje para Valery (opcional)" rows={3} /></label>
            <button className="confirmButton" type="submit">Confirmar asistencia</button>
          </form>
        ) : <div className="successMessage"><CheckCircle2 size={32}/><h3>¡Gracias por confirmar!</h3><p>Tu respuesta quedó preparada. En el siguiente paso la conectaremos con Supabase para guardarla.</p></div>}
      </section>

      <section className="contact section">
        <MessageCircle size={26}/><p className="eyebrow">¿Tienes alguna pregunta?</p><h2>Estamos para ayudarte</h2>
        <p>Cuando tengamos el número de contacto, aquí podremos añadir un botón directo a WhatsApp.</p>
        <button className="outlineButton" type="button"><MessageCircle size={16}/> WhatsApp · Próximamente</button>
      </section>

      <footer><Sparkles size={16}/><span>Valery Saray · Mis 15 años</span><Sparkles size={16}/></footer>
    </main>
  );
}
