"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CalendarDays, ChevronDown, Clock3, MapPin, Music2, Sparkles, Heart, CheckCircle2, Gift, Shirt, Navigation, Camera, MessageCircle, Flower2, Users, Crown } from "lucide-react";

const sections = [
  { id: "evento", label: "El evento" },
  { id: "programa", label: "Programa" },
  { id: "padres", label: "Padres & padrinos" },
  { id: "galeria", label: "Galería" },
  { id: "confirmacion", label: "Confirmación" }
];

const eventDate: string | null = null;

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

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

function Petals() {
  return <div className="petalField" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <span key={i} className={`floatingPetal petal-${i + 1}`} />)}</div>;
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  function handleRSVP(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="invitation">
      <motion.div className="readingProgress" style={{ scaleX: progress }} />

      {!opened && (
        <motion.div className="openingCurtain" initial={{ opacity: 1 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Petals />
          <motion.div className="openingCard" initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
            <span className="seal"><Crown size={24} /></span>
            <p className="eyebrow">Una invitación muy especial</p>
            <p className="openingIntro">Mis</p>
            <h2>15</h2>
            <span className="openingName">Valery Saray</span>
            <span className="openingSurname">Marín Lugo</span>
            <div className="openingRule"><span>✦</span><span>✦</span><span>✦</span></div>
            <button className="openButton" onClick={() => setOpened(true)}><Sparkles size={17} /> Abrir invitación</button>
            <small>Desliza después para descubrir cada detalle</small>
          </motion.div>
        </motion.div>
      )}

      <section className="hero" id="inicio">
        <Petals />
        <div className="heroOrnament ornamentA" /><div className="heroOrnament ornamentB" /><div className="heroHalo" /><div className="heroFrame" aria-hidden="true"><span /><span /><span /><span /></div>
        <motion.div className="heroContent" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: opened ? 0.15 : 0 }}>
          <p className="eyebrow">Una noche para recordar</p><p className="intro">Mis</p><h1>15</h1><p className="years">años</p>
          <div className="nameRule"><span>✦</span></div><p className="name">Valery Saray</p><p className="surname">Marín Lugo</p>
          <a className="openButton" href="#evento"><Sparkles size={17} /> Descubrir la invitación</a>
        </motion.div>
        <motion.a href="#evento" className="scrollHint" aria-label="Continuar" animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><ChevronDown size={20} /></motion.a>
      </section>

      <nav className="miniNav" aria-label="Navegación">{sections.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}</nav>

      <section className="welcome section" id="evento">
        <Reveal><p className="eyebrow">Con mucho cariño</p><h2>Quiero compartir este momento contigo</h2>
        <p>Hay momentos que se convierten en recuerdos para toda la vida. Mi celebración de 15 años será uno de ellos y me encantará que formes parte de esta noche tan especial.</p></Reveal>
      </section>

      <section className="eventSection section">
        <Reveal><div className="sectionHeading"><span>Detalles</span><h2>La celebración</h2></div>
        <div className="details">
          <div className="detailCard"><CalendarDays size={25}/><span>Fecha</span><strong>Próximamente</strong><small>Guarda esta fecha</small></div>
          <div className="detailCard"><Clock3 size={25}/><span>Hora</span><strong>Próximamente</strong><small>Te esperamos</small></div>
          <div className="detailCard"><MapPin size={25}/><span>Lugar</span><strong>Próximamente</strong><small>Ver ubicación</small></div>
        </div></Reveal>
      </section>

      <section className="countdown section"><Reveal><p className="eyebrow">La cuenta regresiva</p><h2>Faltan</h2><Countdown /></Reveal></section>

      <section className="program section" id="programa">
        <Reveal><div className="sectionHeading"><span>Una noche especial</span><h2>Programa</h2></div>
        <p>Una pequeña guía de los momentos que harán parte de esta celebración.</p>
        <div className="timeline">
          {[
            ["01","Recepción","Próximamente · Bienvenida a los invitados"],
            ["02","Entrada de Valery","El momento de comenzar la celebración"],
            ["03","Vals","Un recuerdo para guardar en el corazón"],
            ["04","Cena y celebración","Compartir, disfrutar y celebrar juntos"],
            ["05","Fiesta","¡Ahora sí, a bailar!"]
          ].map(([n,title,desc]) => <div className="timelineItem" key={n}><span>{n}</span><div><strong>{title}</strong><small>{desc}</small></div></div>)}
        </div></Reveal>
      </section>

      <section className="parents section" id="padres">
        <Reveal>
          <div className="parentsGlow"><Flower2 size={28}/></div>
          <p className="eyebrow">Con amor y gratitud</p>
          <h2>Padres y padrinos</h2>
          <p className="parentsLead">Hay personas que acompañan cada paso, sostienen cada sueño y hacen que este día sea aún más especial.</p>
          <div className="familyGrid">
            <article className="familyCard"><Users size={22}/><span>Mis padres</span><h3>Nombre de mamá</h3><h3>Nombre de papá</h3><small>Gracias por hacer posible este sueño.</small></article>
            <article className="familyCard"><Heart size={22}/><span>Mis padrinos</span><h3>Nombre de madrina</h3><h3>Nombre de padrino</h3><small>Gracias por acompañarme con tanto cariño.</small></article>
          </div>
          <div className="familyNote">Los nombres se actualizarán cuando tengamos los datos definitivos.</div>
        </Reveal>
      </section>

      <section className="quote section"><Reveal><Heart size={22}/><blockquote>“Los momentos más bonitos de la vida merecen ser compartidos con quienes más queremos.”</blockquote></Reveal></section>

      <section className="location section">
        <Reveal><div className="sectionHeading"><span>Te esperamos</span><h2>¿Dónde será?</h2></div>
        <div className="mapPlaceholder"><MapPin size={34}/><strong>Ubicación próximamente</strong><span>Aquí aparecerá el mapa del lugar del evento.</span></div>
        <button className="outlineButton" type="button"><Navigation size={16}/> Cómo llegar</button></Reveal>
      </section>

      <section className="dress section">
        <Reveal><Shirt size={26}/><p className="eyebrow">Código de vestuario</p><h2>Elegancia para una noche especial</h2>
        <p>El código de vestuario se definirá próximamente. Queremos que todos se sientan cómodos y disfruten la celebración.</p>
        <div className="dressBadge">Dress code · Próximamente</div></Reveal>
      </section>

      <section className="gallery section" id="galeria">
        <Reveal><div className="sectionHeading"><span>Recuerdos</span><h2>Galería</h2></div>
        <div className="galleryIntro"><span>Momentos que merecen quedarse para siempre</span></div><div className="galleryGrid">
          <motion.div className="photo photo1" whileHover={{ scale: 1.015, y: -5 }}><div className="photoOverlay"><Camera size={22}/><span>Tu foto aquí</span></div></motion.div><motion.div className="photo photo2" whileHover={{ scale: 1.015, y: -5 }}><div className="photoOverlay"><Camera size={22}/><span>Tu foto aquí</span></div></motion.div>
          <motion.div className="photo photo3" whileHover={{ scale: 1.015, y: -5 }}><div className="photoOverlay"><Camera size={22}/><span>Tu foto aquí</span></div></motion.div><motion.div className="photo photo4" whileHover={{ scale: 1.015, y: -5 }}><div className="photoOverlay"><Camera size={22}/><span>Tu foto aquí</span></div></motion.div>
        </div></Reveal>
      </section>

      <section className="music section">
        <Reveal><Music2 size={25}/><p className="eyebrow">Nuestra canción</p><h2>Un momento especial</h2>
        <p>La música acompañará tu recorrido por esta invitación.</p>
        <button className="musicButton" type="button" onClick={() => setMusicOn(!musicOn)}><Music2 size={16}/> {musicOn ? "Pausar música" : "Reproducir música"}</button>
        <small className="featureNote">{musicOn ? "Reproductor preparado; añadiremos la canción elegida." : "La canción se configurará más adelante."}</small></Reveal>
      </section>

      <section className="gifts section">
        <Reveal><Gift size={26}/><p className="eyebrow">Con cariño</p><h2>Regalos</h2>
        <p>Tu presencia es el mejor regalo. Si deseas tener un detalle con Valery, aquí podremos colocar posteriormente la información de regalos o mesa de sobres.</p>
        <div className="giftCard"><strong>Información de regalos</strong><span>Próximamente</span></div></Reveal>
      </section>

      <section className="rsvp section" id="confirmacion">
        <Reveal><div className="sectionHeading"><span>Tu compañía es importante</span><h2>¿Nos acompañas?</h2></div>
        {!submitted ? (
          <form className="rsvpForm" onSubmit={handleRSVP}>
            <label>Tu nombre<input name="name" placeholder="Escribe tu nombre" required /></label>
            <label>¿Asistirás?"><select name="attendance" defaultValue="si"><option value="si">Sí, allí estaré</option><option value="no">No podré asistir</option></select></label>
            <label>Número de acompañantes<input name="guests" type="number" min="0" max="10" defaultValue="0" /></label>
            <label>Mensaje<textarea name="message" placeholder="Un mensaje para Valery (opcional)" rows={3} /></label>
            <button className="confirmButton" type="submit">Confirmar asistencia</button>
          </form>
        ) : <div className="successMessage"><CheckCircle2 size={32}/><h3>¡Gracias por confirmar!</h3><p>Tu respuesta quedó preparada. En el siguiente paso la conectaremos con Supabase para guardarla.</p></div>}</Reveal>
      </section>

      <section className="contact section">
        <Reveal><MessageCircle size={26}/><p className="eyebrow">¿Tienes alguna pregunta?</p><h2>Estamos para ayudarte</h2>
        <p>Cuando tengamos el número de contacto, aquí podremos añadir un botón directo a WhatsApp.</p>
        <button className="outlineButton" type="button"><MessageCircle size={16}/> WhatsApp · Próximamente</button></Reveal>
      </section>

      <footer><Sparkles size={16}/><span>Valery Saray · Mis 15 años</span><Sparkles size={16}/></footer>
    </main>
  );
}
