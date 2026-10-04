"use client";

import type { FormEvent, ReactNode } from "react";
import invitation from "./invitation-data";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  CalendarDays, CalendarPlus, Camera, Check, CheckCircle2, ChevronDown, Clock3, Crown, Flower2,
  Gift, Heart, MapPin, MessageCircle, Music2, Navigation, Quote, Shirt, Sparkles,
  Star, Users, WandSparkles, ArrowUp, Share2
} from "lucide-react";

const eventDate = invitation.eventDate;

const sections = [
  { id: "historia", label: "Historia" },
  { id: "evento", label: "El evento" },
  { id: "programa", label: "Programa" },
  { id: "familia", label: "Familia" },
  { id: "galeria", label: "Galería" },
  { id: "confirmacion", label: "RSVP" },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Petals({ count = 20 }: { count?: number }) {
  return (
    <div className="petalField" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => <span key={i} className={`floatingPetal petal-${(i % 18) + 1}`} />)}
    </div>
  );
}

function FallingStars({ count = 18 }: { count?: number }) {\n  return (\n    <div className="fallingStarField" aria-hidden="true">\n      {Array.from({ length: count }, (_, i) => <span key={i} className={`fallingStar star-${(i % 18) + 1}`} />)}\n    </div>\n  );\n}\n\nfunction Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    if (!eventDate) return;
    const update = () => setRemaining(Math.max(0, new Date(eventDate).getTime() - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  if (remaining === null) {
    return <div className="timer">{["días", "horas", "min", "seg"].map((label) => <div key={label}><b>--</b><span>{label}</span></div>)}</div>;
  }
  const total = Math.floor(remaining / 1000);
  const values = [
    Math.floor(total / 86400),
    Math.floor((total % 86400) / 3600),
    Math.floor((total % 3600) / 60),
    total % 60,
  ];
  return <div className="timer">{values.map((value, i) => <div key={i}><b>{String(value).padStart(2, "0")}</b><span>{["días", "horas", "min", "seg"][i]}</span></div>)}</div>;
}

const moments = [
  ["01", "Recepción", "Bienvenida y encuentro con nuestros invitados."],
  ["02", "Entrada de Valery", "El instante que dará comienzo a la celebración."],
  ["03", "Vals", "Un recuerdo para guardar toda la vida."],
  ["04", "Cena & celebración", "Compartir, brindar y disfrutar juntos."],
  ["05", "Fiesta", "La noche continúa. ¡Ahora sí, a bailar!"],
];

const gallery = invitation.gallery;

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [shared, setShared] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [memory, setMemory] = useState("");
  const [memories, setMemories] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("historia");
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpGuests, setRsvpGuests] = useState("0");
  const [rsvpAttendance, setRsvpAttendance] = useState("si");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, 70]);
  const heroScale = useTransform(scrollYProgress, [0, 0.28], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0.18]);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0.08, 0.2, 0.5] }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function shareInvitation() {
    const shareData = {
      title: invitation.title,
      text: invitation.shareText,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => undefined);
      return;
    }
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    }).catch(() => undefined);
  }

  function addToCalendar() {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Valery Saray//Mis 15 anos//ES",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:valery-saray-15-2027@invitacion",
      "DTSTAMP:20261004T000000Z",
      "DTSTART:20270417T190000",
      "DTEND:20270417T230000",
      "SUMMARY:Mis 15 años · Valery Saray",
      "LOCATION:Recreacafé, Vía Picaleña · Kilómetro 4, Ibagué, Tolima",
      "DESCRIPTION:Celebración de los 15 años de Valery Saray Marín Lugo.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "valery-saray-15.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function handleRSVP(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setRsvpName(String(data.get("name") || ""));
    setRsvpGuests(String(data.get("guests") || "0"));
    setRsvpAttendance(String(data.get("attendance") || "si"));
    setSubmitted(true);
  }

  function addMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = memory.trim();
    if (!value) return;
    setMemories((current) => [value, ...current].slice(0, 6));
    setMemory("");
  }

  return (
    <main className="invitation">
      <motion.div className="readingProgress" style={{ scaleX: progress }} />

      <AnimatePresence>
      {!opened && (
        <motion.div className="openingCurtain" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
          <motion.div className="curtainPanel curtainLeft" exit={{ x: "-100%", opacity: 0 }} transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="curtainPanel curtainRight" exit={{ x: "100%", opacity: 0 }} transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }} />
          <Petals count={24} />
          <motion.div
            className="openingCard"
            exit={{ opacity: 0, scale: 0.94, y: -12, filter: "blur(5px)" }}
            initial={{ scale: 0.82, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div className="openingTopLine" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25, duration: .6 }}><span /><span /><span /></motion.div>
            <motion.span className="seal" initial={{ opacity: 0, scale: .65, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: .45, duration: .8, ease: [0.22, 1, 0.36, 1] }}><Crown size={24} /></motion.span>
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65, duration: .6 }}>Una invitación muy especial</motion.p>
            <motion.p className="openingIntro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8, duration: .6 }}>Mis</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 18, scale: .9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .95, duration: .85, ease: [0.22, 1, 0.36, 1] }}>15</motion.h2>
            <motion.span className="openingName" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.12, duration: .6 }}>Valery Saray</motion.span>
            <motion.span className="openingSurname" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: .7 }}>Marín Lugo</motion.span>
            <motion.div className="openingRule" initial={{ opacity: 0, scaleX: .5 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 1.45, duration: .7 }}><span>✦</span><span>♡</span><span>✦</span></motion.div>
            <motion.button className="openButton primaryButton" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.65, duration: .65 }} onClick={() => setOpened(true)}>
              <Sparkles size={17} /> Abrir mi invitación
            </motion.button>
            <motion.small initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: .7 }}>Una experiencia creada para celebrar un momento inolvidable</motion.small>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <section className="hero" id="inicio">
        <Petals />
        <FallingStars count={18} />
        <div className="heroOrnament ornamentA" />
        <div className="heroOrnament ornamentB" />
        <div className="heroHalo" />
        <div className="heroFrame" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="heroStars" aria-hidden="true"><Star /><Star /><Star /><Star /></div>
        <motion.div
          className="heroContent"
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: opened ? 0.12 : 0.35 }}
        >
          <p className="eyebrow">Una noche para recordar</p>
          <p className="intro">Mis</p>
          <h1>15</h1>
          <p className="years">años</p>
          <div className="nameRule"><span>✦</span></div>
          <p className="name">Valery Saray</p>
          <p className="surname">Marín Lugo</p>
          <p className="heroDate">{invitation.heroMessage}</p>
          <div className="heroActions">
            <a className="openButton" href="#historia"><Sparkles size={17} /> Descubrir la invitación</a>
            <button className="openButton secondaryAction" type="button" onClick={shareInvitation}>
              {shared ? <Check size={17} /> : <Share2 size={17} />} {shared ? "Enlace copiado" : "Compartir"}
            </button>
          </div>
          <div className="heroMeta" aria-label="Resumen del evento">
            <span><b>17</b> ABRIL 2027</span><i>·</i><span><b>7:00</b> P. M.</span><i>·</i><span>RECREACAFÉ</span>
          </div>
        </motion.div>
        <motion.a href="#historia" className="scrollHint" aria-label="Continuar" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <span>Descubre</span><ChevronDown size={19} />
        </motion.a>
      </section>

      <nav className="miniNav" aria-label="Navegación">
        <div className="navInner">
          <a className="navBrand" href="#inicio">VS<span>15</span></a>
          {sections.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
          <button className="navShare" onClick={shareInvitation} aria-label="Compartir invitación" title="Compartir invitación">
            {shared ? <Check size={14} /> : <Share2 size={14} />}
            <span>{shared ? "Copiado" : "Compartir"}</span>
          </button>
          <button className={`navMusic ${musicOn ? "isOn" : ""}`} onClick={() => setMusicOn((v) => !v)} aria-label="Música">
            <Music2 size={15} /> <span>{musicOn ? "♫" : "♪"}</span>
          </button>
        </div>
      </nav>

      <aside className="chapterRail" aria-label="Progreso de la invitación">
        <span className="chapterRailTitle">LA NOCHE DE VALERY</span>
        {sections.map((section, index) => (
          <a key={section.id} className={activeSection === section.id ? "isActive" : ""} href={`#${section.id}`} aria-label={`Ir a ${section.label}`}>
            <b>0{index + 1}</b><span>{section.label}</span>
          </a>
        ))}
      </aside>

      <section className="story section" id="historia">
        <Reveal>
          <div className="storySeal"><Flower2 size={23} /></div>
          <p className="eyebrow">Una nueva etapa comienza</p>
          <h2>Mi historia, mi sueño, mi noche</h2>
          <div className="ornamentalRule"><span>✦</span></div>
          <p className="leadCopy">Hay momentos que imaginamos desde siempre. Momentos que llegan para recordarnos cuánto hemos crecido, cuánto hemos soñado y cuánto amor nos ha acompañado en el camino.</p>
          <div className="letterCard">
            <div className="letterCorner" />
            <p className="letterKicker">Una pequeña carta</p>
            <p>Hoy quiero celebrar una etapa maravillosa de mi vida rodeada de las personas que hacen que cada recuerdo sea más bonito.</p>
            <p>Por eso, quiero que estés conmigo en esta noche tan especial. Tu presencia será parte de una historia que guardaré para siempre en mi corazón.</p>
            <span className="signature">Con cariño,<br /><strong>Valery Saray</strong></span>
          </div>
        </Reveal>
      </section>

      <section className="countdown section fullBleed">
        <Reveal>
          <p className="eyebrow">Comienza la cuenta regresiva</p>
          <h2>El gran día se acerca</h2>
          <p className="mutedCopy">{invitation.countdownMessage}</p>
          <Countdown />
          <div className="countdownCaption"><span>{eventDate ? "FALTAN" : "PRÓXIMAMENTE"}</span><i>{eventDate ? invitation.countdownReady : invitation.countdownPending}</i></div>
          <div className="countdownFlourish"><span>✦</span><span>♡</span><span>✦</span></div>
        </Reveal>
      </section>

      <section className="eventSection section" id="evento">
        <Reveal>
          <div className="sectionHeading"><span>Guarda este momento</span><h2>La celebración</h2></div>
          <p className="sectionLead">Todos los detalles de esta noche estarán reunidos aquí para que no te pierdas ningún instante.</p>
          <div className="details">
            <article className="detailCard"><div className="iconBubble"><CalendarDays size={22}/></div><span>Fecha</span><strong>{invitation.eventDateLabel}</strong><small>Reserva la fecha</small></article>
            <article className="detailCard"><div className="iconBubble"><Clock3 size={22}/></div><span>Hora</span><strong>{invitation.eventTimeLabel}</strong><small>Te esperamos</small></article>
            <article className="detailCard"><div className="iconBubble"><MapPin size={22}/></div><span>Lugar</span><strong>{invitation.venueName}</strong><small>Ubicación del evento</small></article>
          </div>
          <div className="eventTools">
            <button className="outlineButton" type="button" onClick={addToCalendar}><CalendarPlus size={16}/> Agendar la fecha</button>
            <a className="outlineButton" href={invitation.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={16}/> Abrir ubicación</a>
          </div>
        </Reveal>
      </section>

      <section className="program section fullBleed" id="programa">
        <Reveal>
          <div className="sectionHeading"><span>Una noche especial</span><h2>Programa</h2></div>
          <p className="sectionLead">Cada instante tendrá su propio recuerdo.</p>
          <div className="timeline">
            {moments.map(([number, title, description]) => (
              <div className="timelineItem" key={number}>
                <span>{number}</span>
                <div><strong>{title}</strong><small>{description}</small></div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="family section" id="familia">
        <Reveal>
          <div className="familyCrown"><Crown size={25}/></div>
          <p className="eyebrow">Con amor y gratitud</p>
          <h2>Las personas que hacen posible este sueño</h2>
          <p className="sectionLead familyLead">Hay personas que sostienen nuestros sueños, nos acompañan en cada paso y hacen que un día especial sea todavía más memorable.</p>
          <div className="familyGrid familyGridSingle">
            <article className="familyCard">
              <Users size={21}/>
              <span>Mis padres</span>
              <h3>Fabián Arley Marín</h3>
              <h3>Edith Lugo</h3>
              <small>Gracias por hacer posible este sueño y acompañarme siempre.</small>
            </article>
          </div>
        </Reveal>
      </section>

      <section className="quoteBand fullBleed">
        <Petals count={10}/>
        <Reveal><Quote size={26}/><blockquote>“Los momentos más bonitos de la vida merecen ser compartidos con quienes más queremos.”</blockquote><span>— Valery Saray</span></Reveal>
      </section>

      <section className="gallery section" id="galeria">
        <Reveal>
          <div className="sectionHeading"><span>Recuerdos que comienzan aquí</span><h2>Galería</h2></div>
          <p className="sectionLead">Este espacio está preparado para convertir tus fotografías favoritas en parte de la experiencia.</p>
          <div className="galleryGrid">
            {gallery.map(([number, caption, cls], index) => (
              <motion.button className={`photo ${cls}`} key={number} whileHover={{ y: -7 }} type="button" onClick={() => setLightboxIndex(index)} aria-label={`Abrir ${caption}`}>
                <div className="photoGlow" />
                <div className="photoFrame"><Camera size={20}/><small>FOTO {number}</small></div>
                <div className="photoCaption"><span>{caption}</span><i>✦</i></div>
              </motion.button>
            ))}
          </div>
          <div className="galleryNote"><WandSparkles size={16}/> Toca una fotografía para abrir su vista destacada. Las imágenes reales se incorporarán en cuanto estén listas.</div>
        </Reveal>
      </section>

      <section className="location section fullBleed">
        <Reveal>
          <div className="sectionHeading"><span>Te esperamos</span><h2>¿Dónde será?</h2></div>
          <div className="mapCard">
            <div className="mapArt"><div className="mapGrid" /><MapPin size={42}/><span>Vía Picaleña · Kilómetro 4</span><small>Ibagué · Tolima</small></div>
            <div className="mapInfo">
              <p className="eyebrow">El lugar de la celebración</p>
              <h3>{invitation.venueName}</h3>
              <p>{invitation.venueDescription}</p>
              <div className="routeButtons">
                <a className="outlineButton" href={invitation.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={16}/> Google Maps</a>
                <a className="outlineButton" href="https://www.waze.com/ul?q=Recreacaf%C3%A9%20V%C3%ADa%20Picale%C3%B1a%20Kil%C3%B3metro%204%20Ibagu%C3%A9%20Tolima&navigate=yes" target="_blank" rel="noreferrer"><Navigation size={16}/> Waze</a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="dress section">
        <Reveal>
          <div className="dressIcon"><Shirt size={25}/></div>
          <p className="eyebrow">Código de vestuario</p>
          <h2>Una noche para vestir de gala</h2>
          <p className="sectionLead">El dress code definitivo aparecerá aquí. Queremos que todos disfruten la noche con elegancia y comodidad.</p>
          <div className="dressBadge"><span>✦</span> {invitation.dressCode} <span>✦</span></div>
          <p className="dressNotice">{invitation.dressNotice}</p>
        </Reveal>
      </section>

      <section className="musicSection section fullBleed">
        <Reveal>
          <div className="vinyl"><div className="vinylCenter"><Heart size={18}/></div></div>
          <p className="eyebrow">La banda sonora de esta noche</p>
          <h2>Nuestra canción</h2>
          <p className="sectionLead">{invitation.musicDescription}</p>
          <button className={`musicButton ${musicOn ? "playing" : ""}`} type="button" onClick={() => setMusicOn((v) => !v)}><Music2 size={17}/>{musicOn ? "Música activada" : "Activar música"}</button>
          <small className="featureNote">{musicOn ? "Reproductor listo para conectar el audio." : "La música se añadirá con la canción elegida."}</small>
        </Reveal>
      </section>

      <section className="gifts section">
        <Reveal>
          <div className="giftIcon"><Gift size={24}/></div>
          <p className="eyebrow">Un detalle con cariño</p>
          <h2>Tu presencia es el mejor regalo</h2>
          <p className="sectionLead">Si deseas tener un detalle con Valery, aquí podremos publicar posteriormente la información de regalos, mesa de sobres o transferencia.</p>
          <div className="giftCard"><span>REGALOS</span><strong>Información próximamente</strong><small>Todo quedará presentado de forma clara y elegante.</small></div>
        </Reveal>
      </section>

      <section className="rsvp section" id="confirmacion">
        <Reveal>
          <div className="sectionHeading"><span>Tu compañía hace la diferencia</span><h2>¿Nos acompañas?</h2></div>
          <p className="sectionLead">Confirma tu asistencia para que podamos preparar todo con mucho cariño.</p>
          {!submitted ? (
            <form className="rsvpForm" onSubmit={handleRSVP}>
              <label>Tu nombre<input name="name" placeholder="Escribe tu nombre" required /></label>
              <div className="formTwo"><label>¿Asistirás?<select name="attendance" defaultValue="si"><option value="si">Sí, allí estaré</option><option value="no">No podré asistir</option></select></label><label>Acompañantes<input name="guests" type="number" min="0" max="10" defaultValue="0" /></label></div>
              <label>Mensaje<textarea name="message" placeholder="Déjale unas palabras a Valery (opcional)" rows={4} /></label>
              <button className="confirmButton" type="submit"><CheckCircle2 size={17}/> Confirmar mi asistencia</button>
            </form>
          ) : (
            <motion.div className="successMessage" initial={{ scale: .94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <CheckCircle2 size={38}/>
              <h3>{rsvpAttendance === "si" ? "¡Te esperamos, " + rsvpName + "!" : "Gracias por avisarnos, " + rsvpName + "."}</h3>
              <p>{rsvpAttendance === "si" ? `Tu pase está preparado para esta experiencia. Invitados: ${Number(rsvpGuests) + 1}.` : "Sentiremos mucho que no puedas acompañarnos, pero gracias por confirmarlo."}</p>
              {rsvpAttendance === "si" && (
                <div className="digitalPass">
                  <div className="passTop"><span>VALERY SARAY</span><b>15</b></div>
                  <div className="passBody"><div className="passCode">VS15</div><div><small>PASE DIGITAL</small><strong>{rsvpName}</strong><span>17 ABRIL · 7:00 P. M.</span></div></div>
                  <div className="passFoot"><span>RECREACAFÉ · IBAGUÉ</span><i>✦</i></div>
                </div>
              )}
              <button className="outlineButton" type="button" onClick={() => setSubmitted(false)}>Editar respuesta</button>
            </motion.div>
          )}
        </Reveal>
      </section>

      <section className="memories section fullBleed">
        <Reveal>
          <div className="memoryIcon"><MessageCircle size={24}/></div>
          <p className="eyebrow">Libro de recuerdos</p>
          <h2>Déjale unas palabras a Valery</h2>
          <p className="sectionLead">Un pequeño espacio para que cada invitado pueda dejar un recuerdo que algún día volverá a leer.</p>
          <form className="memoryForm" onSubmit={addMemory}>
            <textarea value={memory} onChange={(e) => setMemory(e.target.value)} placeholder="Escribe un mensaje bonito para Valery..." rows={3} maxLength={180} />
            <button className="confirmButton" type="submit"><Heart size={16}/> Guardar mi mensaje</button>
          </form>
          <div className="memoryWall">
            {memories.length === 0 ? <div className="emptyMemory"><Sparkles size={17}/> Sé la primera persona en dejar un recuerdo.</div> : memories.map((item, i) => <article className="memoryCard" key={`${item}-${i}`}><span>♡</span><p>“{item}”</p><small>Con cariño</small></article>)}
          </div>
        </Reveal>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Galería ampliada" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxIndex(null)}>
            <motion.div className={`lightboxCard ${gallery[lightboxIndex][2]}`} initial={{ scale: .92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .95, y: 10 }} onClick={(event) => event.stopPropagation()}>
              <button className="lightboxClose" type="button" onClick={() => setLightboxIndex(null)} aria-label="Cerrar galería">×</button>
              <div className="lightboxMark"><Camera size={24}/><span>FOTO {gallery[lightboxIndex][0]}</span></div>
              <h3>{gallery[lightboxIndex][1]}</h3>
              <p>Este espacio quedará listo para una fotografía real de Valery y su celebración.</p>
              <div className="lightboxNav">
                <button type="button" onClick={() => setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)}>Anterior</button>
                <button type="button" onClick={() => setLightboxIndex((lightboxIndex + 1) % gallery.length)}>Siguiente</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="contact section">
        <Reveal>
          <MessageCircle size={25}/>
          <p className="eyebrow">¿Tienes alguna pregunta?</p>
          <h2>Estamos para ayudarte</h2>
          <p className="sectionLead">{invitation.whatsappNumber ? "Escríbenos directamente si tienes alguna pregunta sobre la celebración." : "Cuando tengamos el contacto definitivo, aquí habrá un botón directo a WhatsApp."}</p>
          <button className="outlineButton" type="button" disabled={!invitation.whatsappNumber} onClick={() => invitation.whatsappNumber && window.open(`https://wa.me/${invitation.whatsappNumber}`, "_blank", "noopener,noreferrer")}><MessageCircle size={16}/> {invitation.whatsappNumber ? "Escribir por WhatsApp" : "WhatsApp · Próximamente"}</button>
        </Reveal>
      </section>

      <section className="closing fullBleed">
        <Petals count={12}/>
        <Reveal>
          <div className="closingCrown"><Crown size={27}/></div>
          <p className="eyebrow">Gracias por ser parte de mi historia</p>
          <h2>Nos vemos en mi gran noche</h2>
          <div className="closingName">Valery Saray</div>
          <div className="closingRule">✦ ♡ ✦</div>
          <p>Mis 15 años</p>
        </Reveal>
      </section>

      <button
        className="floatingTopButton"
        type="button"
        onClick={scrollToTop}
        aria-label="Subir al inicio"
        title="Subir al inicio"
      >
        <ArrowUp size={17} strokeWidth={2} /><span>Subir</span>
      </button>

      <footer><Sparkles size={15}/><span>{invitation.title}</span><Sparkles size={15}/></footer>
    </main>
  );
}
