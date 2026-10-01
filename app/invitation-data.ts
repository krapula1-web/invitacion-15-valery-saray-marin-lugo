const invitation = {
  title: "Valery Saray | Mis 15 años",
  shareText: "Una invitación muy especial para celebrar los 15 años de Valery Saray Marín Lugo.",
  eventDate: "2027-04-17T19:00:00-05:00" as string | null,
  eventDateLabel: "17 de abril de 2027",
  eventTimeLabel: "7:00 p. m.",
  venueName: "Recreacafé",
  venueDescription: "Vía Picaleña · Kilómetro 4. Te esperamos para celebrar juntos esta noche tan especial.",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Recreacaf%C3%A9%20V%C3%ADa%20Picale%C3%B1a%20Kil%C3%B3metro%204%20Ibagu%C3%A9%20Tolima",
  whatsappNumber: "",
  dressCode: "BLANCO · TONALIDADES MUY CLARAS",
  dressNotice: "Reservamos el tono rosa, exclusivamente para nuestra festejada en su gran noche. Agradecemos tu comprensión.",
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
