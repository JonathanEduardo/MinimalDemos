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
    personas: ["María García"],
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
]

// ── Context ─────────────────────────────────────────────────────────────────────

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
  obtenerKPIs: () => KPIs
  obtenerTendencia: () => TendenciaDia[]
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
        dia: dia.slice(5), // "04-01"
        total: del_dia.length,
        aprobadas: del_dia.filter((v) => v.estado === "aprobado").length,
        rechazadas: del_dia.filter((v) => v.estado === "rechazado").length,
      }
    })
  }, [visitas])

  return (
    <VisitasContext.Provider
      value={{
        visitas,
        crearVisita,
        aprobarVisita,
        rechazarVisita,
        reagendarVisita,
        buscarVisitaPorFolio,
        obtenerKPIs,
        obtenerTendencia,
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
