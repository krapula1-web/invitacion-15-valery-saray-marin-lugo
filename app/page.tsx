"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  CalendarDays, Camera, Check, CheckCircle2, ChevronDown, Clock3, Crown, Flower2,
  Gift, Heart, MapPin, MessageCircle, Music2, Navigation, Quote, Shirt, Sparkles,
  Star, Users, WandSparkles, ArrowUp, Share2, Copy
} from "lucide-react";

const eventDate: string | null = null;

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

function Countdown() {
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

const gallery = [
  ["01", "Un nuevo capítulo", "portraitA"],
  ["02", "Sueños que florecen", "portraitB"],
  ["03", "Momentos especiales", "portraitC"],
  ["04", "La noche soñada", "portraitD"],
];

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [shared, setShared] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [memory, setMemory] = useState("");
  const [memories, setMemories] = useState<string[]>([]);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });\n\n  function scrollToTop() {\n    window.scrollTo({ top: 0, behavior: "smooth" });\n  }

  function handleRSVP(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
            <div className="openingTopLine"><span /><span /><span /></div>
            <span className="seal"><Crown size={24} /></span>
            <p className="eyebrow">Una invitación muy especial</p>
            <p className="openingIntro">Mis</p>
            <h2>15</h2>
            <span className="openingName">Valery Saray</span>
            <span className="openingSurname">Marín Lugo</span>
            <div className="openingRule"><span>✦</span><span>♡</span><span>✦</span></div>
            <button className="openButton primaryButton" onClick={() => setOpened(true)}>
              <Sparkles size={17} /> Abrir mi invitación
            </button>
            <small>Una experiencia creada para celebrar un momento inolvidable</small>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <section className="hero" id="inicio">
        <Petals />
        <div className="heroOrnament ornamentA" />
        <div className="heroOrnament ornamentB" />
        <div className="heroHalo" />
        <div className="heroFrame" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="heroStars" aria-hidden="true"><Star /><Star /><Star /><Star /></div>
        <motion.div
          className="heroContent"
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
          <p className="heroDate">Una historia, un sueño y una noche para celebrar.</p>
          <div className="heroActions">
            <a className="openButton" href="#historia"><Sparkles size={17} /> Descubrir la invitación</a>
            <button className="openButton secondaryAction" type="button" onClick={shareInvitation}>
              {shared ? <Check size={17} /> : <Share2 size={17} />} {shared ? "Enlace copiado" : "Compartir"}
            </button>
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
          <p className="mutedCopy">Una cuenta regresiva viva para acompañar la ilusión hasta el gran día.</p>
          <Countdown />
          <div className="countdownCaption"><span>PRÓXIMAMENTE</span><i>La fecha oficial activará el contador en tiempo real.</i></div>
          <div className="countdownFlourish"><span>✦</span><span>♡</span><span>✦</span></div>
        </Reveal>
      </section>

      <section className="eventSection section" id="evento">
        <Reveal>
          <div className="sectionHeading"><span>Guarda este momento</span><h2>La celebración</h2></div>
          <p className="sectionLead">Todos los detalles de esta noche estarán reunidos aquí para que no te pierdas ningún instante.</p>
          <div className="details">
            <article className="detailCard"><div className="iconBubble"><CalendarDays size={22}/></div><span>Fecha</span><strong>Próximamente</strong><small>Reserva la fecha</small></article>
            <article className="detailCard"><div className="iconBubble"><Clock3 size={22}/></div><span>Hora</span><strong>Próximamente</strong><small>Te esperamos</small></article>
            <article className="detailCard"><div className="iconBubble"><MapPin size={22}/></div><span>Lugar</span><strong>Próximamente</strong><small>Ubicación del evento</small></article>
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
          <div className="familyGrid">
            <article className="familyCard"><Users size={21}/><span>Mis padres</span><h3>Nombre de mamá</h3><h3>Nombre de papá</h3><small>Gracias por hacer posible este sueño y acompañarme siempre.</small></article>
            <article className="familyCard"><Heart size={21}/><span>Mis padrinos</span><h3>Nombre de madrina</h3><h3>Nombre de padrino</h3><small>Gracias por caminar conmigo y ser parte de esta historia.</small></article>
          </div>
          <p className="placeholderNote">Los nombres y datos serán reemplazados por la información definitiva.</p>
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
            {gallery.map(([number, caption, cls]) => (
              <motion.article className={`photo ${cls}`} key={number} whileHover={{ y: -7 }} tabIndex={0}>
                <div className="photoGlow" />
                <div className="photoFrame"><Camera size={20}/><small>FOTO {number}</small></div>
                <div className="photoCaption"><span>{caption}</span><i>✦</i></div>
              </motion.article>
            ))}
          </div>
          <div className="galleryNote"><WandSparkles size={16}/> Las fotografías reales podrán incorporarse cuando estén listas.</div>
        </Reveal>
      </section>

      <section className="location section fullBleed">
        <Reveal>
          <div className="sectionHeading"><span>Te esperamos</span><h2>¿Dónde será?</h2></div>
          <div className="mapCard">
            <div className="mapArt"><div className="mapGrid" /><MapPin size={42}/><span>Ubicación próximamente</span></div>
            <div className="mapInfo"><p className="eyebrow">El lugar de la celebración</p><h3>Próximamente</h3><p>Aquí aparecerán el nombre del lugar, la dirección y un acceso directo al mapa.</p><button className="outlineButton" type="button"><Navigation size={16}/> Cómo llegar</button></div>
          </div>
        </Reveal>
      </section>

      <section className="dress section">
        <Reveal>
          <div className="dressIcon"><Shirt size={25}/></div>
          <p className="eyebrow">Código de vestuario</p>
          <h2>Una noche para vestir de gala</h2>
          <p className="sectionLead">El dress code definitivo aparecerá aquí. Queremos que todos disfruten la noche con elegancia y comodidad.</p>
          <div className="dressBadge"><span>✦</span> ELEGANTE · PRÓXIMAMENTE <span>✦</span></div>
        </Reveal>
      </section>

      <section className="musicSection section fullBleed">
        <Reveal>
          <div className="vinyl"><div className="vinylCenter"><Heart size={18}/></div></div>
          <p className="eyebrow">La banda sonora de esta noche</p>
          <h2>Nuestra canción</h2>
          <p className="sectionLead">La canción elegida acompañará esta invitación cuando tengamos el audio definitivo.</p>
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
              <CheckCircle2 size={38}/><h3>¡Gracias por confirmar!</h3><p>Tu respuesta quedó registrada en esta experiencia. Más adelante la conectaremos con Supabase para guardarla de forma permanente.</p><button className="outlineButton" type="button" onClick={() => setSubmitted(false)}>Editar respuesta</button>
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

      <section className="contact section">
        <Reveal>
          <MessageCircle size={25}/>
          <p className="eyebrow">¿Tienes alguna pregunta?</p>
          <h2>Estamos para ayudarte</h2>
          <p className="sectionLead">Cuando tengamos el contacto definitivo, aquí habrá un botón directo a WhatsApp.</p>
          <button className="outlineButton" type="button"><MessageCircle size={16}/> WhatsApp · Próximamente</button>
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

      <motion.button\n        className="floatingTopButton"\n        type="button"\n        onClick={scrollToTop}\n        aria-label="Volver al menú"\n        title="Volver al menú"\n        initial={{ opacity: 0, scale: 0.75, y: 12 }}\n        animate={{ opacity: 1, scale: 1, y: 0 }}\n        transition={{ duration: 0.35, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}\n      >\n        <ArrowUp size={17} strokeWidth={1.8} />\n      </motion.button>\n\n      <footer><Sparkles size={15}/><span>Valery Saray · Mis 15 años</span><Sparkles size={15}/></footer>
    </main>
  );
}
