const invitation = {
  title: "Valery Saray | Mis 15 años",
  shareText: "Una invitación muy especial para celebrar los 15 años de Valery Saray Marín Lugo.",
  eventDate: null as string | null,
  eventDateLabel: "Próximamente",
  eventTimeLabel: "Próximamente",
  venueName: "Próximamente",
  venueDescription: "Aquí aparecerán el nombre del lugar, la dirección y un acceso directo al mapa.",
  mapsUrl: "",
  whatsappNumber: "",
  dressCode: "ELEGANTE · PRÓXIMAMENTE",
  heroMessage: "Una historia, un sueño y una noche para celebrar.",
  countdownMessage: "Una cuenta regresiva viva para acompañar la ilusión hasta el gran día.",
  countdownReady: "La cuenta regresiva está activa. ¡Cada segundo nos acerca!",
  countdownPending: "La fecha oficial activará el contador en tiempo real.",
  musicDescription: "La canción elegida acompañará esta invitación cuando tengamos el audio definitivo.",
  gallery: [
    ["01", "Un nuevo capítulo", "portraitA"],
    ["02", "Sueños que florecen", "portraitB"],
    ["03", "Momentos especiales", "portraitC"],
    ["04", "La noche soñada", "portraitD"],
  ] as const,
};

export default invitation;
