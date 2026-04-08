import * as React from "react"

/* ========================================
   VISITAS STORE — Context + Mock Data
   Central state for the Bene Access demo
   ======================================== */

export type EstadoVisita = "pendiente" | "aprobado" | "rechazado" | "reagendado"
export type ContactoPreferido = "whatsapp" | "sms"

export interface Visita {
  id: string
  folio: string
  empresa: string
  representante: string
  telefono: string
  personas: string[]
  contactoPreferido: ContactoPreferido
  personaVisitar: string
  fechaHora: string
  documentoValidado: boolean
  estado: EstadoVisita
  comentario: string
  fechaCreacion: string
  fechaActualizacion: string
}

function generarFolio(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let result = "FOL-"
  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

// ── Mock Data ──────────────────────────────────────────────────────────────────

const MOCK_VISITAS: Visita[] = [
  {
    id: "1",
    folio: "FOL-A1B2C3",
    empresa: "TechCorp SA de CV",
    representante: "Carlos Mendoza",
    telefono: "5598765432",
    personas: ["Carlos Mendoza", "Laura Torres"],
    contactoPreferido: "whatsapp",
    personaVisitar: "Ing. Roberto Díaz",
    fechaHora: "2026-04-07 09:00",
    documentoValidado: true,
    estado: "aprobado",
    comentario: "Acceso autorizado para auditoría trimestral",
    fechaCreacion: "2026-04-05T10:00:00Z",
    fechaActualizacion: "2026-04-06T08:30:00Z",
  },
  {
    id: "2",
    folio: "FOL-D4E5F6",
    empresa: "Grupo Innovar",
    representante: "María García",
    telefono: "5598765432",
    personas: ["María García", "Pedro Rodríguez"],
    contactoPreferido: "sms",
    personaVisitar: "Lic. Patricia Ruiz",
    fechaHora: "2026-04-07 11:30",
    documentoValidado: true,
    estado: "pendiente",
    comentario: "",
    fechaCreacion: "2026-04-06T14:00:00Z",
    fechaActualizacion: "2026-04-06T14:00:00Z",
  },
  {
    id: "3",
    folio: "FOL-G7H8I9",
    empresa: "Consultores del Norte",
    representante: "Alejandro Vega",
    telefono: "5511223344",
    personas: ["Alejandro Vega", "Fernanda López", "Jorge Soto"],
    contactoPreferido: "whatsapp",
    personaVisitar: "Dr. Samuel Castro",
    fechaHora: "2026-04-07 14:00",
    documentoValidado: false,
    estado: "rechazado",
    comentario: "Documento de identidad no válido",
    fechaCreacion: "2026-04-06T16:00:00Z",
    fechaActualizacion: "2026-04-07T07:00:00Z",
  },
  {
    id: "4",
    folio: "FOL-J0K1L2",
    empresa: "Servicios Globales SRL",
    representante: "Diana Flores",
    telefono: "5544556677",
    personas: ["Diana Flores", "Raúl Martínez"],
    contactoPreferido: "whatsapp",
    personaVisitar: "Ing. Carmen Navarro",
    fechaHora: "2026-04-07 16:00",
    documentoValidado: true,
    estado: "reagendado",
    comentario: "Reagendado por conflicto de agenda del receptor",
    fechaCreacion: "2026-04-04T09:00:00Z",
    fechaActualizacion: "2026-04-06T17:00:00Z",
  },
  {
    id: "5",
    folio: "FOL-M3N4O5",
    empresa: "DataSystems México",
    representante: "Eduardo Herrera",
    telefono: "5533445566",
    personas: ["Eduardo Herrera"],
    contactoPreferido: "sms",
    personaVisitar: "Arq. Lucía Medina",
    fechaHora: "2026-04-08 10:00",
    documentoValidado: true,
    estado: "pendiente",
    comentario: "",
    fechaCreacion: "2026-04-07T08:00:00Z",
    fechaActualizacion: "2026-04-07T08:00:00Z",
  },
  {
    id: "6",
    folio: "FOL-P6Q7R8",
    empresa: "Nexus Logística",
    representante: "Sofía Ramírez",
    telefono: "5566778899",
    personas: ["Sofía Ramírez", "Tomás Ortega"],
    contactoPreferido: "whatsapp",
    personaVisitar: "Lic. Pablo Guerrero",
    fechaHora: "2026-04-08 13:00",
    documentoValidado: true,
    estado: "aprobado",
    comentario: "Reunión de seguimiento de proyecto",
    fechaCreacion: "2026-04-07T09:30:00Z",
    fechaActualizacion: "2026-04-07T10:00:00Z",
  },
  {
    id: "7",
    folio: "FOL-S9T0U1",
    empresa: "Arquitectura Avanzada",
    representante: "Roberto Silva",
    telefono: "5577889900",
    personas: ["Roberto Silva"],
    contactoPreferido: "sms",
    personaVisitar: "Ing. Mónica Vargas",
    fechaHora: "2026-04-05 09:00",
    documentoValidado: true,
    estado: "aprobado",
    comentario: "Entrega de planos revisados",
    fechaCreacion: "2026-04-03T11:00:00Z",
    fechaActualizacion: "2026-04-04T08:00:00Z",
  },
  {
    id: "8",
    folio: "FOL-V2W3X4",
    empresa: "Legal & Partners",
    representante: "Claudia Jiménez",
    telefono: "5588990011",
    personas: ["Claudia Jiménez", "Antonio Reyes"],
    contactoPreferido: "whatsapp",
    personaVisitar: "Dr. Ernesto Blanco",
    fechaHora: "2026-04-05 15:00",
    documentoValidado: true,
    estado: "rechazado",
    comentario: "Visita fuera del horario permitido",
    fechaCreacion: "2026-04-04T12:00:00Z",
    fechaActualizacion: "2026-04-05T14:50:00Z",
  },
  {
    id: "9",
    folio: "FOL-Y5Z6A7",
    empresa: "Manufactura Integral",
    representante: "Luis Castillo",
    telefono: "5599001122",
    personas: ["Luis Castillo", "Verónica Lagos", "Hugo Peralta"],
    contactoPreferido: "sms",
    personaVisitar: "Lic. Andrea Fuentes",
    fechaHora: "2026-04-06 10:30",
    documentoValidado: true,
    estado: "aprobado",
    comentario: "Inspección de calidad programada",
    fechaCreacion: "2026-04-04T15:00:00Z",
    fechaActualizacion: "2026-04-05T16:00:00Z",
  },
  {
    id: "10",
    folio: "FOL-B8C9D0",
    empresa: "FinanzasPro",
    representante: "Isabel Morales",
    telefono: "5500112233",
    personas: ["Isabel Morales"],
    contactoPreferido: "whatsapp",
    personaVisitar: "Lic. Gustavo Peña",
    fechaHora: "2026-04-06 12:00",
    documentoValidado: false,
    estado: "reagendado",
    comentario: "Documentación incompleta, reagendado para completar",
    fechaCreacion: "2026-04-05T08:00:00Z",
    fechaActualizacion: "2026-04-06T11:45:00Z",
  },
  {
    id: "11",
    folio: "FOL-E1F2G3",
    empresa: "BioTech Innovations",
    representante: "García Torres",
    telefono: "5511334455",
    personas: ["García Torres", "Natalia Cruz"],
    contactoPreferido: "sms",
    personaVisitar: "Dr. Felipe Sandoval",
    fechaHora: "2026-04-09 09:00",
    documentoValidado: true,
    estado: "pendiente",
    comentario: "",
    fechaCreacion: "2026-04-07T11:00:00Z",
    fechaActualizacion: "2026-04-07T11:00:00Z",
  },
  {
    id: "12",
    folio: "FOL-H4I5J6",
    empresa: "Constructora Omega",
    representante: "Miguel Ángel Rivas",
    telefono: "5522445566",
    personas: ["Miguel Ángel Rivas", "Daniela Soto"],
    contactoPreferido: "whatsapp",
    personaVisitar: "Arq. Rosa Torres",
    fechaHora: "2026-04-09 11:00",
    documentoValidado: true,
    estado: "aprobado",
    comentario: "Visita de supervisión de obra",
    fechaCreacion: "2026-04-07T12:00:00Z",
    fechaActualizacion: "2026-04-07T13:30:00Z",
  },
  {
    id: "13",
    folio: "FOL-K7L8M9",
    empresa: "Agro Exportaciones",
    representante: "Carmen Estrada",
    telefono: "5533556677",
    personas: ["Carmen Estrada"],
    contactoPreferido: "sms",
    personaVisitar: "Ing. Arturo Domínguez",
    fechaHora: "2026-04-10 10:00",
    documentoValidado: true,
    estado: "pendiente",
    comentario: "",
    fechaCreacion: "2026-04-07T14:00:00Z",
    fechaActualizacion: "2026-04-07T14:00:00Z",
  },
  {
    id: "14",
    folio: "FOL-N0O1P2",
    empresa: "CloudSoft Solutions",
    representante: "Andrés Guzmán",
    telefono: "5544667788",
    personas: ["Andrés Guzmán", "Patricia Sánchez", "Oscar Villanueva"],
    contactoPreferido: "whatsapp",
    personaVisitar: "Lic. Beatriz Olvera",
    fechaHora: "2026-04-04 14:00",
    documentoValidado: true,
    estado: "aprobado",
    comentario: "Demo de producto programada",
    fechaCreacion: "2026-04-02T10:00:00Z",
    fechaActualizacion: "2026-04-04T13:45:00Z",
  },
  {
    id: "15",
    folio: "FOL-Q3R4S5",
    empresa: "Seguridad Total SA",
    representante: "Ricardo Nava",
    telefono: "5555778899",
    personas: ["Ricardo Nava", "Elena Barrera"],
    contactoPreferido: "sms",
    personaVisitar: "Lic. Humberto Díaz",
    fechaHora: "2026-04-04 16:00",
    documentoValidado: true,
    estado: "rechazado",
    comentario: "No se encontró cita registrada con la persona a visitar",
    fechaCreacion: "2026-04-03T14:00:00Z",
    fechaActualizacion: "2026-04-04T15:55:00Z",
  },
  {
    id: "16",
    folio: "FOL-T6U7V8",
    empresa: "Innovaciones Verdes",
    representante: "Silvia Mora",
    telefono: "5566889900",
    personas: ["Silvia Mora", "Alejandro Cruz", "Vanessa Torres"],
    contactoPreferido: "whatsapp",
    personaVisitar: "Dr. Francisco Leal",
    fechaHora: "2026-04-07 08:30",
    documentoValidado: true,
    estado: "aprobado",
    comentario: "Presentación de proyecto de sustentabilidad",
    fechaCreacion: "2026-04-06T18:00:00Z",
    fechaActualizacion: "2026-04-07T08:00:00Z",
  },
  {
    id: "17",
    folio: "FOL-W9X0Y1",
    empresa: "Pharma Distribuidora",
    representante: "Jorge Montes",
    telefono: "5577990011",
    personas: ["Jorge Montes"],
    contactoPreferido: "sms",
    personaVisitar: "Lic. Lorena Vargas",
    fechaHora: "2026-04-07 15:00",
    documentoValidado: false,
    estado: "pendiente",
    comentario: "",
    fechaCreacion: "2026-04-07T06:00:00Z",
    fechaActualizacion: "2026-04-07T06:00:00Z",
  },
  {
    id: "18",
    folio: "FOL-Z2A3B4",
    empresa: "Telecom Express",
    representante: "Héctor Paredes",
    telefono: "5588001122",
    personas: ["Héctor Paredes", "Laura Quintero"],
    contactoPreferido: "whatsapp",
    personaVisitar: "Ing. Catalina Vela",
    fechaHora: "2026-04-03 10:00",
    documentoValidado: true,
    estado: "aprobado",
    comentario: "Mantenimiento de infraestructura",
    fechaCreacion: "2026-04-01T09:00:00Z",
    fechaActualizacion: "2026-04-03T09:45:00Z",
  },
  // ── Abril adicionales (semanas 1-4 completas) ─────────────────────────────────
  {
    id: "19", folio: "FOL-A9B1C2", empresa: "Redes del Pacífico", representante: "Natalia Espinoza",
    telefono: "5511000111", personas: ["Natalia Espinoza"], contactoPreferido: "whatsapp",
    personaVisitar: "Lic. Marco Ibarra", fechaHora: "2026-04-01 09:30", documentoValidado: true,
    estado: "aprobado", comentario: "Revisión contractual", fechaCreacion: "2026-03-30T10:00:00Z", fechaActualizacion: "2026-03-31T08:00:00Z",
  },
  {
    id: "20", folio: "FOL-D3E4F5", empresa: "Soluciones Integrales SA", representante: "Gustavo Ríos",
    telefono: "5522000222", personas: ["Gustavo Ríos", "Paola Nieto"], contactoPreferido: "sms",
    personaVisitar: "Ing. Sandra Peña", fechaHora: "2026-04-02 11:00", documentoValidado: true,
    estado: "pendiente", comentario: "", fechaCreacion: "2026-04-01T09:00:00Z", fechaActualizacion: "2026-04-01T09:00:00Z",
  },
  {
    id: "21", folio: "FOL-G6H7I8", empresa: "Distribuidora Centena", representante: "Elena Palomino",
    telefono: "5533000333", personas: ["Elena Palomino"], contactoPreferido: "whatsapp",
    personaVisitar: "Lic. Raúl Ibáñez", fechaHora: "2026-04-11 10:30", documentoValidado: true,
    estado: "aprobado", comentario: "Entrega de documentación", fechaCreacion: "2026-04-09T12:00:00Z", fechaActualizacion: "2026-04-10T08:00:00Z",
  },
  {
    id: "22", folio: "FOL-J9K0L1", empresa: "Corporativo Nexo", representante: "Fabián Delgado",
    telefono: "5544000444", personas: ["Fabián Delgado", "Irene Castro"], contactoPreferido: "whatsapp",
    personaVisitar: "Dr. Luis Salcedo", fechaHora: "2026-04-13 09:00", documentoValidado: true,
    estado: "aprobado", comentario: "Reunión de planeación", fechaCreacion: "2026-04-11T10:00:00Z", fechaActualizacion: "2026-04-12T08:30:00Z",
  },
  {
    id: "23", folio: "FOL-M2N3O4", empresa: "Textiles Avantex", representante: "Cristina Varela",
    telefono: "5555000555", personas: ["Cristina Varela"], contactoPreferido: "sms",
    personaVisitar: "Arq. Josefina Rueda", fechaHora: "2026-04-14 13:00", documentoValidado: false,
    estado: "rechazado", comentario: "Documentos vencidos", fechaCreacion: "2026-04-13T11:00:00Z", fechaActualizacion: "2026-04-14T12:45:00Z",
  },
  {
    id: "24", folio: "FOL-P5Q6R7", empresa: "Grupo Energético MX", representante: "Rodrigo Fuentes",
    telefono: "5566000666", personas: ["Rodrigo Fuentes", "Alma Rosa León"], contactoPreferido: "whatsapp",
    personaVisitar: "Ing. Tomás Aguilar", fechaHora: "2026-04-15 10:00", documentoValidado: true,
    estado: "aprobado", comentario: "Visita técnica programada", fechaCreacion: "2026-04-14T09:00:00Z", fechaActualizacion: "2026-04-14T10:00:00Z",
  },
  {
    id: "25", folio: "FOL-S8T9U0", empresa: "Inmobiliaria Brisas", representante: "Yolanda Paramo",
    telefono: "5577000777", personas: ["Yolanda Paramo"], contactoPreferido: "sms",
    personaVisitar: "Lic. Emilio Contreras", fechaHora: "2026-04-16 15:00", documentoValidado: true,
    estado: "pendiente", comentario: "", fechaCreacion: "2026-04-15T14:00:00Z", fechaActualizacion: "2026-04-15T14:00:00Z",
  },
  {
    id: "26", folio: "FOL-V1W2X3", empresa: "Servicios Digitales Pro", representante: "Martín Sosa",
    telefono: "5588000888", personas: ["Martín Sosa", "Claudia Vera"], contactoPreferido: "whatsapp",
    personaVisitar: "Dr. Álvaro Quintero", fechaHora: "2026-04-21 09:30", documentoValidado: true,
    estado: "aprobado", comentario: "Seguimiento de contrato", fechaCreacion: "2026-04-19T10:00:00Z", fechaActualizacion: "2026-04-20T08:00:00Z",
  },
  {
    id: "27", folio: "FOL-Y4Z5A6", empresa: "Logística Aries", representante: "Patricia Mondragón",
    telefono: "5599000999", personas: ["Patricia Mondragón", "Sergio Ávila"], contactoPreferido: "sms",
    personaVisitar: "Lic. Gabriela Ponce", fechaHora: "2026-04-22 11:00", documentoValidado: true,
    estado: "reagendado", comentario: "Receptor no disponible, reagendado", fechaCreacion: "2026-04-21T09:00:00Z", fechaActualizacion: "2026-04-22T10:30:00Z",
  },
  {
    id: "28", folio: "FOL-B7C8D9", empresa: "Constructora Nube Azul", representante: "Omar Castellanos",
    telefono: "5500111222", personas: ["Omar Castellanos"], contactoPreferido: "whatsapp",
    personaVisitar: "Arq. Rebeca Flores", fechaHora: "2026-04-23 14:00", documentoValidado: true,
    estado: "aprobado", comentario: "Entrega de avance de obra", fechaCreacion: "2026-04-22T11:00:00Z", fechaActualizacion: "2026-04-22T12:00:00Z",
  },
  {
    id: "29", folio: "FOL-E0F1G2", empresa: "AgroTech del Norte", representante: "Verónica Salas",
    telefono: "5511222333", personas: ["Verónica Salas", "Hernán Mora"], contactoPreferido: "whatsapp",
    personaVisitar: "Ing. Cecilia Torres", fechaHora: "2026-04-28 09:00", documentoValidado: true,
    estado: "aprobado", comentario: "Inspección de cultivos", fechaCreacion: "2026-04-26T10:00:00Z", fechaActualizacion: "2026-04-27T08:00:00Z",
  },
  {
    id: "30", folio: "FOL-H3I4J5", empresa: "Finanzas Seguras SA", representante: "Adrián Lemus",
    telefono: "5522333444", personas: ["Adrián Lemus"], contactoPreferido: "sms",
    personaVisitar: "Lic. Dolores Ramos", fechaHora: "2026-04-29 12:00", documentoValidado: true,
    estado: "pendiente", comentario: "", fechaCreacion: "2026-04-28T11:00:00Z", fechaActualizacion: "2026-04-28T11:00:00Z",
  },
  // ── Enero 2026 ────────────────────────────────────────────────────────────────
  {
    id: "31", folio: "FOL-K6L7M8", empresa: "Corporativo del Valle", representante: "Santiago Heredia",
    telefono: "5533444555", personas: ["Santiago Heredia", "Luz Marina Cruz"], contactoPreferido: "whatsapp",
    personaVisitar: "Dr. Rafael Montes", fechaHora: "2026-01-05 09:00", documentoValidado: true,
    estado: "aprobado", comentario: "Reunión de inicio de año", fechaCreacion: "2026-01-02T10:00:00Z", fechaActualizacion: "2026-01-04T08:00:00Z",
  },
  {
    id: "32", folio: "FOL-N9O0P1", empresa: "Industrias Mexa", representante: "Blanca Estela Romo",
    telefono: "5544555666", personas: ["Blanca Estela Romo"], contactoPreferido: "sms",
    personaVisitar: "Ing. Aurelio Sandoval", fechaHora: "2026-01-06 10:30", documentoValidado: true,
    estado: "aprobado", comentario: "", fechaCreacion: "2026-01-05T09:00:00Z", fechaActualizacion: "2026-01-05T09:00:00Z",
  },
  {
    id: "33", folio: "FOL-Q2R3S4", empresa: "Servicios Médicos Altus", representante: "Manuel Guerrero",
    telefono: "5555666777", personas: ["Manuel Guerrero", "Elena Dávila"], contactoPreferido: "whatsapp",
    personaVisitar: "Dra. Pilar Vega", fechaHora: "2026-01-07 14:00", documentoValidado: false,
    estado: "pendiente", comentario: "", fechaCreacion: "2026-01-06T12:00:00Z", fechaActualizacion: "2026-01-06T12:00:00Z",
  },
  {
    id: "34", folio: "FOL-T5U6V7", empresa: "Comercializadora Plenitud", representante: "Rosa Infante",
    telefono: "5566777888", personas: ["Rosa Infante", "Javier Medina"], contactoPreferido: "sms",
    personaVisitar: "Lic. Héctor Zárate", fechaHora: "2026-01-12 09:00", documentoValidado: true,
    estado: "aprobado", comentario: "Negociación de contrato anual", fechaCreacion: "2026-01-10T10:00:00Z", fechaActualizacion: "2026-01-11T08:30:00Z",
  },
  {
    id: "35", folio: "FOL-W8X9Y0", empresa: "Energía Renovable SLP", representante: "Daniel Flores",
    telefono: "5577888999", personas: ["Daniel Flores"], contactoPreferido: "whatsapp",
    personaVisitar: "Ing. Norma Espejo", fechaHora: "2026-01-13 11:00", documentoValidado: true,
    estado: "rechazado", comentario: "Persona a visitar de vacaciones", fechaCreacion: "2026-01-12T13:00:00Z", fechaActualizacion: "2026-01-13T10:50:00Z",
  },
  {
    id: "36", folio: "FOL-Z1A2B3", empresa: "Software Nexus", representante: "Karla Méndez",
    telefono: "5588999000", personas: ["Karla Méndez", "Óscar Valdés"], contactoPreferido: "whatsapp",
    personaVisitar: "Lic. Concepción Ibarra", fechaHora: "2026-01-19 10:00", documentoValidado: true,
    estado: "aprobado", comentario: "Demo de plataforma", fechaCreacion: "2026-01-17T10:00:00Z", fechaActualizacion: "2026-01-18T08:00:00Z",
  },
  {
    id: "37", folio: "FOL-C4D5E6", empresa: "Transportes Veloce", representante: "Humberto Lara",
    telefono: "5500111000", personas: ["Humberto Lara"], contactoPreferido: "sms",
    personaVisitar: "Arq. Gloria Reséndiz", fechaHora: "2026-01-20 13:00", documentoValidado: true,
    estado: "aprobado", comentario: "", fechaCreacion: "2026-01-19T09:00:00Z", fechaActualizacion: "2026-01-19T09:00:00Z",
  },
  {
    id: "38", folio: "FOL-F7G8H9", empresa: "Consultora Axis", representante: "Raquel Domínguez",
    telefono: "5511222000", personas: ["Raquel Domínguez", "Pablo Serrano"], contactoPreferido: "whatsapp",
    personaVisitar: "Lic. Ernestina Campos", fechaHora: "2026-01-21 09:30", documentoValidado: false,
    estado: "pendiente", comentario: "", fechaCreacion: "2026-01-20T10:00:00Z", fechaActualizacion: "2026-01-20T10:00:00Z",
  },
  {
    id: "39", folio: "FOL-I0J1K2", empresa: "Holding Altagracia", representante: "Fernando Espinosa",
    telefono: "5522333000", personas: ["Fernando Espinosa", "Leticia Bravo"], contactoPreferido: "sms",
    personaVisitar: "Dr. Ignacio Mercado", fechaHora: "2026-01-26 11:00", documentoValidado: true,
    estado: "aprobado", comentario: "Auditoría semestral", fechaCreacion: "2026-01-24T09:00:00Z", fechaActualizacion: "2026-01-25T08:00:00Z",
  },
  {
    id: "40", folio: "FOL-L3M4N5", empresa: "Ingeniería Cenit", representante: "Miriam Estrada",
    telefono: "5533444000", personas: ["Miriam Estrada"], contactoPreferido: "whatsapp",
    personaVisitar: "Ing. Benjamín Solano", fechaHora: "2026-01-27 14:00", documentoValidado: true,
    estado: "rechazado", comentario: "Sin cita registrada", fechaCreacion: "2026-01-26T12:00:00Z", fechaActualizacion: "2026-01-27T13:50:00Z",
  },
  // ── Febrero 2026 ──────────────────────────────────────────────────────────────
  {
    id: "41", folio: "FOL-O6P7Q8", empresa: "Grupo Heliox", representante: "Alicia Pimentel",
    telefono: "5544555000", personas: ["Alicia Pimentel", "Ramón Escobedo"], contactoPreferido: "whatsapp",
    personaVisitar: "Lic. Teresita Orozco", fechaHora: "2026-02-02 09:00", documentoValidado: true,
    estado: "aprobado", comentario: "Entrega de propuesta", fechaCreacion: "2026-01-31T10:00:00Z", fechaActualizacion: "2026-02-01T08:00:00Z",
  },
  {
    id: "42", folio: "FOL-R9S0T1", empresa: "Plásticos Modernos", representante: "Víctor Cabrera",
    telefono: "5555666000", personas: ["Víctor Cabrera"], contactoPreferido: "sms",
    personaVisitar: "Arq. Susana Loera", fechaHora: "2026-02-03 11:00", documentoValidado: true,
    estado: "pendiente", comentario: "", fechaCreacion: "2026-02-02T10:00:00Z", fechaActualizacion: "2026-02-02T10:00:00Z",
  },
  {
    id: "43", folio: "FOL-U2V3W4", empresa: "Consultoría Praxis", representante: "Nancy Zavala",
    telefono: "5566777000", personas: ["Nancy Zavala", "Horacio Pedroza"], contactoPreferido: "whatsapp",
    personaVisitar: "Dr. Isidro Cepeda", fechaHora: "2026-02-09 10:00", documentoValidado: true,
    estado: "aprobado", comentario: "", fechaCreacion: "2026-02-07T09:00:00Z", fechaActualizacion: "2026-02-08T08:00:00Z",
  },
  {
    id: "44", folio: "FOL-X5Y6Z7", empresa: "Minerales del Centro", representante: "Octavio Ríos",
    telefono: "5577888000", personas: ["Octavio Ríos", "Brenda Leal"], contactoPreferido: "sms",
    personaVisitar: "Lic. Catalina Montoya", fechaHora: "2026-02-10 13:00", documentoValidado: true,
    estado: "aprobado", comentario: "Revisión anual de contrato", fechaCreacion: "2026-02-09T11:00:00Z", fechaActualizacion: "2026-02-09T12:00:00Z",
  },
  {
    id: "45", folio: "FOL-A8B9C0", empresa: "TI Soluciones Globales", representante: "Gonzalo Ureña",
    telefono: "5588999111", personas: ["Gonzalo Ureña"], contactoPreferido: "whatsapp",
    personaVisitar: "Ing. Margarita Palacios", fechaHora: "2026-02-11 09:30", documentoValidado: false,
    estado: "rechazado", comentario: "Acceso denegado por falta de identificación", fechaCreacion: "2026-02-10T13:00:00Z", fechaActualizacion: "2026-02-11T09:20:00Z",
  },
  {
    id: "46", folio: "FOL-D1E2F3", empresa: "Editorial Páginas", representante: "Sofía Lozano",
    telefono: "5599000111", personas: ["Sofía Lozano", "Mauricio Téllez"], contactoPreferido: "sms",
    personaVisitar: "Lic. Adela Murillo", fechaHora: "2026-02-17 11:00", documentoValidado: true,
    estado: "aprobado", comentario: "Visita de cortesía editorial", fechaCreacion: "2026-02-15T10:00:00Z", fechaActualizacion: "2026-02-16T08:30:00Z",
  },
  {
    id: "47", folio: "FOL-G4H5I6", empresa: "Automotriz Prestige", representante: "Leonardo Padilla",
    telefono: "5500222333", personas: ["Leonardo Padilla"], contactoPreferido: "whatsapp",
    personaVisitar: "Dr. Felipe Acosta", fechaHora: "2026-02-18 14:00", documentoValidado: true,
    estado: "aprobado", comentario: "", fechaCreacion: "2026-02-17T09:00:00Z", fechaActualizacion: "2026-02-17T09:00:00Z",
  },
  {
    id: "48", folio: "FOL-J7K8L9", empresa: "Bioingeniería Siglo", representante: "Laura Chávez",
    telefono: "5511333444", personas: ["Laura Chávez", "Andrés Soto"], contactoPreferido: "sms",
    personaVisitar: "Ing. Patricia Salinas", fechaHora: "2026-02-23 10:00", documentoValidado: true,
    estado: "pendiente", comentario: "", fechaCreacion: "2026-02-22T10:00:00Z", fechaActualizacion: "2026-02-22T10:00:00Z",
  },
  {
    id: "49", folio: "FOL-M0N1O2", empresa: "Diseño Urbano SA", representante: "Gabriela Cisneros",
    telefono: "5522444555", personas: ["Gabriela Cisneros"], contactoPreferido: "whatsapp",
    personaVisitar: "Arq. Roberto Pedraza", fechaHora: "2026-02-24 13:30", documentoValidado: true,
    estado: "aprobado", comentario: "Presentación de proyecto urbano", fechaCreacion: "2026-02-23T09:00:00Z", fechaActualizacion: "2026-02-23T10:00:00Z",
  },
  // ── Marzo 2026 ────────────────────────────────────────────────────────────────
  {
    id: "50", folio: "FOL-P3Q4R5", empresa: "Energía Limpia MX", representante: "Arturo Peralta",
    telefono: "5533555666", personas: ["Arturo Peralta", "Isabel Mejía"], contactoPreferido: "whatsapp",
    personaVisitar: "Ing. Edmundo Vargas", fechaHora: "2026-03-02 09:00", documentoValidado: true,
    estado: "aprobado", comentario: "Inicio de proyecto eólico", fechaCreacion: "2026-02-28T10:00:00Z", fechaActualizacion: "2026-03-01T08:00:00Z",
  },
  {
    id: "51", folio: "FOL-S6T7U8", empresa: "Seguros Confianza", representante: "Rocío Espinoza",
    telefono: "5544666777", personas: ["Rocío Espinoza"], contactoPreferido: "sms",
    personaVisitar: "Lic. Alfredo Bravo", fechaHora: "2026-03-03 10:30", documentoValidado: true,
    estado: "aprobado", comentario: "", fechaCreacion: "2026-03-02T09:00:00Z", fechaActualizacion: "2026-03-02T09:00:00Z",
  },
  {
    id: "52", folio: "FOL-V9W0X1", empresa: "Farmacéutica Génesis", representante: "Héctor Fuentes",
    telefono: "5555777888", personas: ["Héctor Fuentes", "Marisol Castro"], contactoPreferido: "whatsapp",
    personaVisitar: "Dra. Esperanza Nava", fechaHora: "2026-03-04 14:00", documentoValidado: false,
    estado: "pendiente", comentario: "", fechaCreacion: "2026-03-03T12:00:00Z", fechaActualizacion: "2026-03-03T12:00:00Z",
  },
  {
    id: "53", folio: "FOL-Y2Z3A4", empresa: "Metalúrgica Forja", representante: "Ernesto Tapia",
    telefono: "5566888999", personas: ["Ernesto Tapia", "Sara Guzmán"], contactoPreferido: "sms",
    personaVisitar: "Ing. Nicolás Vidal", fechaHora: "2026-03-09 09:00", documentoValidado: true,
    estado: "rechazado", comentario: "Equipo sin credenciales", fechaCreacion: "2026-03-07T10:00:00Z", fechaActualizacion: "2026-03-09T08:55:00Z",
  },
  {
    id: "54", folio: "FOL-B5C6D7", empresa: "Distribuciones Orión", representante: "Claudia Bustos",
    telefono: "5577999000", personas: ["Claudia Bustos"], contactoPreferido: "whatsapp",
    personaVisitar: "Lic. Cecilia Marmolejo", fechaHora: "2026-03-10 11:00", documentoValidado: true,
    estado: "aprobado", comentario: "Pedido urgente de materiales", fechaCreacion: "2026-03-09T10:00:00Z", fechaActualizacion: "2026-03-09T11:00:00Z",
  },
  {
    id: "55", folio: "FOL-E8F9G0", empresa: "Instituto Avanza", representante: "Jorge Alamillo",
    telefono: "5588000111", personas: ["Jorge Alamillo", "Diana Estrada"], contactoPreferido: "sms",
    personaVisitar: "Dr. Marco Solano", fechaHora: "2026-03-11 13:00", documentoValidado: true,
    estado: "aprobado", comentario: "Convenio académico", fechaCreacion: "2026-03-10T09:00:00Z", fechaActualizacion: "2026-03-10T10:00:00Z",
  },
  {
    id: "56", folio: "FOL-H1I2J3", empresa: "Alimentos Frescos SA", representante: "Beatriz Ibáñez",
    telefono: "5599111222", personas: ["Beatriz Ibáñez"], contactoPreferido: "whatsapp",
    personaVisitar: "Ing. Gregorio Montoya", fechaHora: "2026-03-16 09:30", documentoValidado: true,
    estado: "aprobado", comentario: "Certificación de planta", fechaCreacion: "2026-03-14T10:00:00Z", fechaActualizacion: "2026-03-15T08:00:00Z",
  },
  {
    id: "57", folio: "FOL-K4L5M6", empresa: "Tecnología de Punta", representante: "Mauricio Leal",
    telefono: "5500222111", personas: ["Mauricio Leal", "Pamela Ríos"], contactoPreferido: "sms",
    personaVisitar: "Lic. Daniela Zenteno", fechaHora: "2026-03-17 12:00", documentoValidado: false,
    estado: "pendiente", comentario: "", fechaCreacion: "2026-03-16T11:00:00Z", fechaActualizacion: "2026-03-16T11:00:00Z",
  },
  {
    id: "58", folio: "FOL-N7O8P9", empresa: "Productos Nacionales", representante: "Teresa Velarde",
    telefono: "5511333000", personas: ["Teresa Velarde", "Carlos Adame"], contactoPreferido: "whatsapp",
    personaVisitar: "Dr. Aurelio Garza", fechaHora: "2026-03-23 10:00", documentoValidado: true,
    estado: "aprobado", comentario: "Inspección de inventario", fechaCreacion: "2026-03-21T09:00:00Z", fechaActualizacion: "2026-03-22T08:00:00Z",
  },
  {
    id: "59", folio: "FOL-Q0R1S2", empresa: "Soluciones Marítimas", representante: "Alejandro Huerta",
    telefono: "5522444000", personas: ["Alejandro Huerta"], contactoPreferido: "sms",
    personaVisitar: "Ing. Valentina Reyes", fechaHora: "2026-03-24 14:00", documentoValidado: true,
    estado: "aprobado", comentario: "", fechaCreacion: "2026-03-23T10:00:00Z", fechaActualizacion: "2026-03-23T10:00:00Z",
  },
  {
    id: "60", folio: "FOL-T3U4V5", empresa: "Eventos Élite", representante: "Carolina Bernal",
    telefono: "5533555000", personas: ["Carolina Bernal", "Adriana Torres"], contactoPreferido: "whatsapp",
    personaVisitar: "Lic. Eduardo Palomo", fechaHora: "2026-03-25 11:30", documentoValidado: true,
    estado: "reagendado", comentario: "Cambio de sala por mantenimiento", fechaCreacion: "2026-03-24T09:00:00Z", fechaActualizacion: "2026-03-25T11:00:00Z",
  },
  {
    id: "61", folio: "FOL-W6X7Y8", empresa: "Soluciones Hídric", representante: "Benjamín Prado",
    telefono: "5544666000", personas: ["Benjamín Prado"], contactoPreferido: "sms",
    personaVisitar: "Ing. Francisca Olveda", fechaHora: "2026-03-30 09:00", documentoValidado: true,
    estado: "aprobado", comentario: "Mantenimiento de red hidráulica", fechaCreacion: "2026-03-28T10:00:00Z", fechaActualizacion: "2026-03-29T08:00:00Z",
  },
  {
    id: "62", folio: "FOL-Z9A0B1", empresa: "Editorial Creativa", representante: "Lorena Cárdenas",
    telefono: "5555777000", personas: ["Lorena Cárdenas", "Ernesto Cano"], contactoPreferido: "whatsapp",
    personaVisitar: "Dra. Silvia Quintanar", fechaHora: "2026-03-31 11:00", documentoValidado: true,
    estado: "pendiente", comentario: "", fechaCreacion: "2026-03-30T09:00:00Z", fechaActualizacion: "2026-03-30T09:00:00Z",
  },

   {
    id: "62", folio: "FOL-Z9A0B1", empresa: "Editorial Creativa", representante: "Lorena Cárdenas",
    telefono: "5555777000", personas: ["Lorena Cárdenas", "Ernesto Cano"], contactoPreferido: "whatsapp",
    personaVisitar: "Dra. Silvia Quintanar", fechaHora: "2026-05-31 11:00", documentoValidado: true,
    estado: "pendiente", comentario: "", fechaCreacion: "2026-05-30T09:00:00Z", fechaActualizacion: "2026-05-30T09:00:00Z",
  },
]

// ── Context ─────────────────────────────────────────────────────────────────────

export interface DiaConteo {
  fecha: string
  diaNombre: string
  diaMes: number
  total: number
  esMaximo: boolean
}

export interface MesConteo {
  mes: number
  label: string
  total: number
  esMaximo: boolean
}

export interface KPIs {
  total: number
  totalHoy: number
  aprobadas: number
  rechazadas: number
  pendientes: number
  reagendadas: number
}

export interface TendenciaDia {
  dia: string
  total: number
  aprobadas: number
  rechazadas: number
}

interface VisitasContextValue {
  visitas: Visita[]
  crearVisita: (
    data: Omit<Visita, "id" | "folio" | "estado" | "comentario" | "fechaCreacion" | "fechaActualizacion">
  ) => Visita
  aprobarVisita: (folio: string) => void
  rechazarVisita: (folio: string, comentario: string) => void
  reagendarVisita: (folio: string, nuevaFecha: string, comentario: string) => void
  buscarVisitaPorFolio: (folio: string) => Visita | undefined
  buscarVisitaPorFolioOTelefono: (query: string) => Visita | undefined
  buscarVisitasMultiple: (query: string) => Visita[]
  obtenerKPIs: () => KPIs
  obtenerTendencia: () => TendenciaDia[]
  obtenerDiasPorMes: (año: number, mes: number) => DiaConteo[]
  obtenerMesesPorAño: (año: number) => MesConteo[]
}

const VisitasContext = React.createContext<VisitasContextValue | null>(null)

export function VisitasProvider({ children }: { children: React.ReactNode }) {
  const [visitas, setVisitas] = React.useState<Visita[]>(MOCK_VISITAS)

  const crearVisita = React.useCallback(
    (
      data: Omit<Visita, "id" | "folio" | "estado" | "comentario" | "fechaCreacion" | "fechaActualizacion">
    ): Visita => {
      const now = new Date().toISOString()
      const nueva: Visita = {
        ...data,
        id: crypto.randomUUID(),
        folio: generarFolio(),
        estado: "pendiente",
        comentario: "",
        fechaCreacion: now,
        fechaActualizacion: now,
      }
      setVisitas((prev) => [nueva, ...prev])
      return nueva
    },
    []
  )

  const aprobarVisita = React.useCallback((folio: string) => {
    setVisitas((prev) =>
      prev.map((v) =>
        v.folio === folio
          ? { ...v, estado: "aprobado", fechaActualizacion: new Date().toISOString() }
          : v
      )
    )
  }, [])

  const rechazarVisita = React.useCallback((folio: string, comentario: string) => {
    setVisitas((prev) =>
      prev.map((v) =>
        v.folio === folio
          ? { ...v, estado: "rechazado", comentario, fechaActualizacion: new Date().toISOString() }
          : v
      )
    )
  }, [])

  const reagendarVisita = React.useCallback(
    (folio: string, nuevaFecha: string, comentario: string) => {
      setVisitas((prev) =>
        prev.map((v) =>
          v.folio === folio
            ? {
                ...v,
                estado: "reagendado",
                fechaHora: nuevaFecha,
                comentario,
                fechaActualizacion: new Date().toISOString(),
              }
            : v
        )
      )
    },
    []
  )

  const buscarVisitaPorFolio = React.useCallback(
    (folio: string): Visita | undefined => {
      return visitas.find(
        (v) => v.folio.toLowerCase() === folio.trim().toLowerCase()
      )
    },
    [visitas]
  )

  const obtenerKPIs = React.useCallback((): KPIs => {
    const hoy = "2026-04-07"
    const hoyVisitas = visitas.filter((v) => v.fechaHora.startsWith(hoy))
    return {
      total: visitas.length,
      totalHoy: hoyVisitas.length,
      aprobadas: visitas.filter((v) => v.estado === "aprobado").length,
      rechazadas: visitas.filter((v) => v.estado === "rechazado").length,
      pendientes: visitas.filter((v) => v.estado === "pendiente").length,
      reagendadas: visitas.filter((v) => v.estado === "reagendado").length,
    }
  }, [visitas])

  const buscarVisitaPorFolioOTelefono = React.useCallback(
    (query: string): Visita | undefined => {
      const q = query.trim().toLowerCase()
      return visitas.find(
        (v) =>
          v.folio.toLowerCase() === q ||
          v.telefono.replace(/\D/g, "") === q.replace(/\D/g, "")
      )
    },
    [visitas]
  )

  const buscarVisitasMultiple = React.useCallback(
    (query: string): Visita[] => {
      const q = query.trim().toLowerCase()
      if (!q) return []
      const soloDigitos = q.replace(/\D/g, "")
      // Búsqueda por teléfono (≥8 dígitos)
      if (soloDigitos.length >= 8) {
        return visitas.filter((v) => v.telefono.replace(/\D/g, "").includes(soloDigitos))
      }
      // Búsqueda por nombre: representante o personas a visitar
      return visitas.filter(
        (v) =>
          v.representante.toLowerCase().includes(q) ||
          (v.personas ?? []).some((p) => p.toLowerCase().includes(q))
      )
    },
    [visitas]
  )

  const obtenerTendencia = React.useCallback((): TendenciaDia[] => {
    const dias = [
      "2026-04-01",
      "2026-04-02",
      "2026-04-03",
      "2026-04-04",
      "2026-04-05",
      "2026-04-06",
      "2026-04-07",
    ]
    return dias.map((dia) => {
      const del_dia = visitas.filter((v) => v.fechaHora.startsWith(dia))
      return {
        dia: dia.slice(5),
        total: del_dia.length,
        aprobadas: del_dia.filter((v) => v.estado === "aprobado").length,
        rechazadas: del_dia.filter((v) => v.estado === "rechazado").length,
      }
    })
  }, [visitas])

  const obtenerDiasPorMes = React.useCallback(
    (año: number, mes: number): DiaConteo[] => {
      const diasEnMes = new Date(año, mes + 1, 0).getDate()
      const nombresDia = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

      const conteos: Record<string, number> = {}
      for (const v of visitas) {
        const fecha = v.fechaHora.split(" ")[0]
        conteos[fecha] = (conteos[fecha] ?? 0) + 1
      }

      let maxTotal = 0
      const dias: DiaConteo[] = []
      for (let d = 1; d <= diasEnMes; d++) {
        const fecha = `${año}-${String(mes + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
        const total = conteos[fecha] ?? 0
        if (total > maxTotal) maxTotal = total
        const dow = new Date(año, mes, d).getDay()
        dias.push({ fecha, diaNombre: nombresDia[dow], diaMes: d, total, esMaximo: false })
      }
      if (maxTotal > 0) {
        for (const d of dias) {
          if (d.total === maxTotal) d.esMaximo = true
        }
      }
      return dias
    },
    [visitas]
  )

  const obtenerMesesPorAño = React.useCallback(
    (año: number): MesConteo[] => {
      const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
      const conteos = new Array(12).fill(0)
      for (const v of visitas) {
        const fecha = v.fechaHora.split(" ")[0]
        const [y, m] = fecha.split("-").map(Number)
        if (y === año) conteos[m - 1]++
      }
      const maxTotal = Math.max(...conteos, 0)
      return labels.map((label, mes) => ({
        mes,
        label,
        total: conteos[mes],
        esMaximo: maxTotal > 0 && conteos[mes] === maxTotal,
      }))
    },
    [visitas]
  )

  return (
    <VisitasContext.Provider
      value={{
        visitas,
        crearVisita,
        aprobarVisita,
        rechazarVisita,
        reagendarVisita,
        buscarVisitaPorFolio,
        buscarVisitaPorFolioOTelefono,
        buscarVisitasMultiple,
        obtenerKPIs,
        obtenerTendencia,
        obtenerDiasPorMes,
        obtenerMesesPorAño,
      }}
    >
      {children}
    </VisitasContext.Provider>
  )
}

export function useVisitas(): VisitasContextValue {
  const ctx = React.useContext(VisitasContext)
  if (!ctx) throw new Error("useVisitas debe usarse dentro de VisitasProvider")
  return ctx
}
