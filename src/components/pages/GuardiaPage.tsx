import * as React from "react"
import {
  QrCode,
  Search,
  CheckCircle2,
  Users,
  MessageCircle,
  Phone,
  Clock,
} from "lucide-react"
import { AppLayout } from "@/components/templates"
import { Button, Badge, Alert, Card } from "@/components/atoms"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useVisitas, type Visita } from "@/store/visitas"

/* ========================================
   GUARDIA PAGE — QR / Folio Check
   Búsqueda de visita por folio
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

export function GuardiaPage() {
  const { buscarVisitaPorFolio } = useVisitas()

  const [folio, setFolio] = React.useState("")
  const [resultado, setResultado] = React.useState<Visita | null | undefined>(undefined)
  const [buscando, setBuscando] = React.useState(false)

  const handleBuscar = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!folio.trim()) return

    setBuscando(true)
    setResultado(undefined)

    // Simular latencia de consulta
    setTimeout(() => {
      const found = buscarVisitaPorFolio(folio.trim())
      setResultado(found ?? null)
      setBuscando(false)
    }, 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleBuscar()
  }

  const handleReset = () => {
    setFolio("")
    setResultado(undefined)
  }

  const cardVariantByEstado = (estado: Visita["estado"]) => {
    const map = {
      aprobado: "success",
      rechazado: "danger",
      pendiente: "warning",
      reagendado: "base",
    } as const
    return map[estado]
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
            Ingresa el folio de visita manualmente o escanea el código QR.
          </p>
        </div>

        {/* ── Panel de búsqueda ──────────────────────── */}
        <div className="card-base space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--primary-base))/0.1]">
              <QrCode className="h-5 w-5 text-[rgb(var(--primary-base))]" />
            </div>
            <div>
              <p className="font-semibold text-[rgb(var(--primary-dark))]">
                Inicializar Escaneo
              </p>
              <p className="text-xs text-muted-foreground">
                Ingresa el Folio ID o usa el escáner de proximidad.
              </p>
            </div>
          </div>

          <form onSubmit={handleBuscar} className="space-y-3">
            <div className="form-field">
              <Label className="label-base">Número de Folio</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-mono">
                    #
                  </span>
                  <Input
                    className="input-base pl-7 font-mono"
                    placeholder="Ej. FOL-A1B2C3"
                    value={folio}
                    onChange={(e) => setFolio(e.target.value.toUpperCase())}
                    onKeyDown={handleKeyDown}
                    disabled={buscando}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!folio.trim() || buscando}
                >
                  {buscando ? (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  {buscando ? "Buscando..." : "Ejecutar Escaneo"}
                </Button>
              </div>
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
              <span className="text-xs">
                Posiciona el código QR dentro del marco central
              </span>
            </p>
          </div>

          {/* Indicador de estado del sistema */}
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            <p className="text-xs text-green-700 font-medium">
              Sistema Listo —{" "}
              <span className="font-normal">
                Autenticación biométrica secundaria activa para nivel 4
              </span>
            </p>
          </div>
        </div>

        {/* ── Resultado ─────────────────────────────── */}
        {resultado === null && (
          <Alert variant="danger">
            <div>
              <p className="font-semibold">Folio no encontrado</p>
              <p className="text-sm mt-0.5">
                No existe ninguna visita registrada con el folio{" "}
                <span className="font-mono font-bold">{folio}</span>. Verifica
                e intenta nuevamente.
              </p>
            </div>
          </Alert>
        )}

        {resultado && (
          <div className="space-y-4">
            {/* Tarjeta de resultado */}
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[rgb(var(--primary-dark))]">
                Resultado de Validación
              </p>
              <Badge variant="success" className="gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Coincidencia verificada
              </Badge>
            </div>

            <Card variant={cardVariantByEstado(resultado.estado)} className="space-y-4">
              {/* Header de la tarjeta */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/60 text-lg font-bold text-[rgb(var(--primary-dark))]">
                    {resultado.empresa.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-[rgb(var(--primary-dark))]">
                      {resultado.empresa}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {resultado.representante}
                    </p>
                  </div>
                </div>
                <EstadoBadge estado={resultado.estado} />
              </div>

              {/* Metadatos */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white/50 px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Folio ID
                  </p>
                  <p className="font-mono text-sm font-bold text-[rgb(var(--primary-base))]">
                    {resultado.folio}
                  </p>
                </div>
                <div className="rounded-lg bg-white/50 px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Fecha y Hora
                  </p>
                  <p className="text-sm font-medium text-[rgb(var(--primary-dark))]">
                    {resultado.fechaHora}
                  </p>
                </div>
                <div className="rounded-lg bg-white/50 px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Persona a visitar
                  </p>
                  <p className="text-sm text-[rgb(var(--base-color))]">
                    {resultado.personaVisitar}
                  </p>
                </div>
                <div className="rounded-lg bg-white/50 px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Contacto
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {resultado.contactoPreferido === "whatsapp" ? (
                      <MessageCircle className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <Phone className="h-3.5 w-3.5 text-[rgb(var(--primary-base))]" />
                    )}
                    <p className="text-sm capitalize text-[rgb(var(--base-color))]">
                      {resultado.contactoPreferido}
                    </p>
                  </div>
                </div>
              </div>

              {/* Nivel de acceso */}
              <div className="rounded-lg bg-white/50 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Personas visitantes
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Users className="h-4 w-4 text-[rgb(var(--primary-base))]" />
                  {resultado.personas.map((p) => (
                    <span key={p} className="datatable-access-chip">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comentario si existe */}
              {resultado.comentario && (
                <Alert
                  variant={
                    resultado.estado === "rechazado" ? "danger" : "warning"
                  }
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5">
                      Nota del sistema
                    </p>
                    <p className="text-sm">{resultado.comentario}</p>
                  </div>
                </Alert>
              )}
            </Card>

            <Button variant="outline" onClick={handleReset} className="w-full">
              Nueva consulta
            </Button>
          </div>
        )}

        {/* ── Timer de turno (decorativo) ──────────── */}
        <div className="card-base flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Turno activo
            </span>
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
