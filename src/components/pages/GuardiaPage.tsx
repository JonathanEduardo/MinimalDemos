import * as React from "react"
import {
  QrCode,
  Search,
  CheckCircle2,
  Users,
  MessageCircle,
  Phone,
  Clock,
  UserSearch,
  ChevronRight,
} from "lucide-react"
import { AppLayout } from "@/components/templates"
import { Button, Badge, Alert, Card } from "@/components/atoms"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useVisitas, type Visita } from "@/store/visitas"

/* ========================================
   GUARDIA PAGE — QR / Folio / Nombre / Teléfono
   ======================================== */

function EstadoBadge({ estado }: { estado: Visita["estado"] }) {
  const map = {
    aprobado: { variant: "success", label: "Aprobado" },
    rechazado: { variant: "danger", label: "Rechazado" },
    pendiente: { variant: "warning", label: "Pendiente" },
    reagendado: { variant: "secondary", label: "Reagendado" },
  } as const
  const { variant, label } = map[estado]
  return <Badge variant={variant}>{label}</Badge>
}

function detectarModo(query: string): "folio" | "telefono" | "nombre" | "" {
  const q = query.trim()
  if (!q) return ""
  if (/^FOL-/i.test(q)) return "folio"
  const digits = q.replace(/\D/g, "")
  if (digits.length >= 8 && digits.length <= 15) return "telefono"
  return "nombre"
}

function cardVariantByEstado(estado: Visita["estado"]) {
  const map = {
    aprobado: "success",
    rechazado: "danger",
    pendiente: "warning",
    reagendado: "base",
  } as const
  return map[estado]
}

/* ── Tarjeta de resultado completa ── */
function VisitaCard({ visita, onNuevaConsulta }: { visita: Visita; onNuevaConsulta: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[rgb(var(--primary-dark))]">Resultado de Validación</p>
        <Badge variant="success" className="gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Coincidencia verificada
        </Badge>
      </div>

      <Card variant={cardVariantByEstado(visita.estado)} className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/60 text-lg font-bold text-[rgb(var(--primary-dark))]">
              {visita.empresa.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-[rgb(var(--primary-dark))]">{visita.empresa}</p>
              <p className="text-xs text-muted-foreground">{visita.representante}</p>
            </div>
          </div>
          <EstadoBadge estado={visita.estado} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white/50 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Folio ID</p>
            <p className="font-mono text-sm font-bold text-[rgb(var(--primary-base))]">{visita.folio}</p>
          </div>
          <div className="rounded-lg bg-white/50 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Fecha y Hora</p>
            <p className="text-sm font-medium text-[rgb(var(--primary-dark))]">{visita.fechaHora}</p>
          </div>
          <div className="rounded-lg bg-white/50 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Persona a visitar</p>
            <p className="text-sm text-[rgb(var(--base-color))]">{visita.personaVisitar}</p>
          </div>
          <div className="rounded-lg bg-white/50 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Contacto</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {visita.contactoPreferido === "whatsapp" ? (
                <MessageCircle className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Phone className="h-3.5 w-3.5 text-[rgb(var(--primary-base))]" />
              )}
              <p className="text-sm capitalize text-[rgb(var(--base-color))]">{visita.contactoPreferido}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white/50 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Personas visitantes</p>
          <div className="flex items-center gap-2 flex-wrap">
            <Users className="h-4 w-4 text-[rgb(var(--primary-base))]" />
            {visita.personas.map((p) => (
              <span key={p} className="datatable-access-chip">{p}</span>
            ))}
          </div>
        </div>

        {visita.comentario && (
          <Alert variant={visita.estado === "rechazado" ? "danger" : "warning"}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-0.5">Nota del sistema</p>
              <p className="text-sm">{visita.comentario}</p>
            </div>
          </Alert>
        )}
      </Card>

      <Button variant="outline" onClick={onNuevaConsulta} className="w-full">
        Nueva consulta
      </Button>
    </div>
  )
}

/* ── Lista de resultados múltiples ── */
function ListaResultados({ resultados, onSeleccionar }: { resultados: Visita[]; onSeleccionar: (v: Visita) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[rgb(var(--primary-dark))]">
          Resultados encontrados
        </p>
        <span className="text-xs text-muted-foreground">{resultados.length} coincidencia{resultados.length !== 1 ? "s" : ""}</span>
      </div>
      <div className="space-y-2">
        {resultados.map((v) => (
          <button
            key={v.id}
            onClick={() => onSeleccionar(v)}
            className="w-full text-left rounded-xl border border-border bg-card px-4 py-3 hover:border-[rgb(var(--primary-base))/0.4] hover:bg-[rgb(var(--primary-light))/0.05] transition-colors flex items-center gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--primary-base))/0.08] text-sm font-bold text-[rgb(var(--primary-dark))]">
              {v.empresa.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-[rgb(var(--primary-dark))] truncate">{v.empresa}</p>
              <p className="text-xs text-muted-foreground truncate">{v.representante} · {v.fechaHora}</p>
              <p className="text-xs text-muted-foreground font-mono">{v.folio}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <EstadoBadge estado={v.estado} />
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function GuardiaPage() {
  const { buscarVisitaPorFolio, buscarVisitasMultiple } = useVisitas()

  const [query, setQuery] = React.useState("")
  const [modo, setModo] = React.useState<"folio" | "telefono" | "nombre" | "">("")
  const [resultado, setResultado] = React.useState<Visita | null | undefined>(undefined)
  const [multiples, setMultiples] = React.useState<Visita[]>([])
  const [buscando, setBuscando] = React.useState(false)

  // Detectar modo mientras escribe
  React.useEffect(() => {
    setModo(detectarModo(query))
    // Limpiar resultados al editar
    setResultado(undefined)
    setMultiples([])
  }, [query])

  const handleBuscar = (e?: React.FormEvent) => {
    e?.preventDefault()
    const q = query.trim()
    if (!q) return

    setBuscando(true)
    setResultado(undefined)
    setMultiples([])

    setTimeout(() => {
      const m = detectarModo(q)
      if (m === "folio") {
        const found = buscarVisitaPorFolio(q)
        setResultado(found ?? null)
      } else {
        // teléfono o nombre → búsqueda múltiple
        const found = buscarVisitasMultiple(q)
        if (found.length === 1) {
          setResultado(found[0])
        } else if (found.length > 1) {
          setMultiples(found)
          setResultado(undefined)
        } else {
          setResultado(null)
        }
      }
      setBuscando(false)
    }, 600)
  }

  const handleReset = () => {
    setQuery("")
    setResultado(undefined)
    setMultiples([])
  }

  const hintModo = {
    folio: "Búsqueda directa por folio",
    telefono: "Búsqueda por número de teléfono",
    nombre: "Búsqueda por nombre (representante o visitante)",
    "": "",
  }

  return (
    <AppLayout>
      <div className="space-y-8 max-w-2xl mx-auto">
        {/* ── Encabezado ─────────────────────────────── */}
        <div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--primary-dark))]">
            Control de Acceso — Guardia
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Busca por folio, número de teléfono o nombre del representante / visitante.
          </p>
        </div>

        {/* ── Panel de búsqueda ──────────────────────── */}
        <div className="card-base space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--primary-base))/0.1]">
              {modo === "nombre" ? (
                <UserSearch className="h-5 w-5 text-[rgb(var(--primary-base))]" />
              ) : (
                <QrCode className="h-5 w-5 text-[rgb(var(--primary-base))]" />
              )}
            </div>
            <div>
              <p className="font-semibold text-[rgb(var(--primary-dark))]">Verificar Acceso</p>
              <p className="text-xs text-muted-foreground">
                {modo ? hintModo[modo] : "Ingresa folio, teléfono o nombre para buscar"}
              </p>
            </div>
          </div>

          <form onSubmit={handleBuscar} className="space-y-3">
            <div className="form-field">
              <Label className="label-base">Búsqueda</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    className="input-base pl-9"
                    placeholder="FOL-XXXXX · 5512345678 · Nombre…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={buscando}
                    autoComplete="off"
                    spellCheck={false}
                    autoFocus
                  />
                </div>
                <Button variant="primary" type="submit" disabled={!query.trim() || buscando}>
                  {buscando ? (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  {buscando ? "Buscando…" : "Buscar"}
                </Button>
              </div>
              {/* Indicador de modo */}
              {modo && (
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary-base))]" />
                  <span className="text-xs text-[rgb(var(--primary-base))] font-medium">{hintModo[modo]}</span>
                </div>
              )}
            </div>
          </form>

          {/* Área de escaneo simulada */}
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[rgb(var(--primary-base))/0.25] bg-[rgb(var(--primary-light))/0.04] py-8 gap-3">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <QrCode className="h-12 w-12 text-[rgb(var(--primary-base))/0.35]" />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--primary-base))] opacity-30" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[rgb(var(--primary-base))/0.4]" />
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Esperando hardware…
              <br />
              <span className="text-xs">Posiciona el código QR dentro del marco central</span>
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            <p className="text-xs text-green-700 font-medium">
              Sistema Listo —{" "}
              <span className="font-normal">Autenticación biométrica secundaria activa para nivel 4</span>
            </p>
          </div>
        </div>

        {/* ── Sin resultado ──────────────────────────── */}
        {resultado === null && (
          <Alert variant="danger">
            <div>
              <p className="font-semibold">Sin resultados</p>
              <p className="text-sm mt-0.5">
                No se encontraron visitas para{" "}
                <span className="font-mono font-bold">"{query}"</span>. Verifica e intenta nuevamente.
              </p>
            </div>
          </Alert>
        )}

        {/* ── Resultado único ────────────────────────── */}
        {resultado && (
          <VisitaCard visita={resultado} onNuevaConsulta={handleReset} />
        )}

        {/* ── Resultados múltiples ───────────────────── */}
        {multiples.length > 1 && (
          <div className="space-y-4">
            <ListaResultados
              resultados={multiples}
              onSeleccionar={(v) => {
                setResultado(v)
                setMultiples([])
              }}
            />
            <Button variant="outline" onClick={handleReset} className="w-full">
              Limpiar búsqueda
            </Button>
          </div>
        )}

        {/* ── Timer de turno ─────────────────────────── */}
        <div className="card-base flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Turno activo</span>
          </div>
          <ShiftTimer />
        </div>
      </div>
    </AppLayout>
  )
}

// ── Shift Timer ──────────────────────────────────────────────────────────────

function ShiftTimer() {
  const [seconds, setSeconds] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0")
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")

  return (
    <span className="font-mono text-base font-bold text-[rgb(var(--primary-dark))]">
      {hh}:{mm}:{ss}
    </span>
  )
}

