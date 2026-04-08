import * as React from "react"
import {
  ClipboardList,
  Search,
  Plus,
  Trash2,
  CheckCircle2,
  MessageCircle,
  Phone,
  FileText,
  ArrowRight,
  Users,
  Building2,
  CalendarDays,
  ShieldCheck,
  QrCode,
  ChevronDown,
  Sparkles,
  AlertCircle,
  Upload,
  X,
} from "lucide-react"
import { Button, Badge, Alert, Card } from "@/components/atoms"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useVisitas, type Visita, type ContactoPreferido } from "@/store/visitas"
import logoFull from "@/assets/logos/logo_full.png"

/* ========================================
   PROVEEDOR PAGE — Vista pública sin sidebar
   /provider/access/
   ======================================== */

type Mode = "idle" | "crear" | "consultar"

type IAStatus = "idle" | "scanning" | "ok" | "warn"

// ── Helpers ───────────────────────────────────────────────────────────────────

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

// ── Pantalla inicio ───────────────────────────────────────────────────────────

function PantallaInicio({ onSelect }: { onSelect: (m: Mode) => void }) {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="text-center space-y-3 max-w-xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--primary-base))] bg-[rgb(var(--primary-base))] px-4 py-1.5 text-xs font-semibold text-white uppercase tracking-wider">
          <ShieldCheck className="h-3.5 w-3.5 text-[rgb(var(--secondary-base))]" />
          Portal de Acceso Institucional
        </div>
        <h2 className="text-2xl font-semibold text-[rgb(var(--primary-dark))] leading-snug">
          Bienvenido, ¿qué deseas hacer hoy?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Registra tu visita institucional de forma anticipada o consulta el estado
          de un permiso ya solicitado usando tu folio o número de teléfono.
        </p>
      </div>

      {/* Tarjetas de acción */}
      <div className="grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => onSelect("crear")}
          className="group text-left rounded-2xl border shadow-[3px_3px_0_rgb(var(--terciary-base))]  bg-white p-6  border-gray-200 hover:scale-105 transition-transform duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--terciary-base))]"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl  transition-colors bg-[rgba(var(--terciary-base),0.08)] group-hover:bg-[rgba(var(--terciary-base),0.15)]">
            <ClipboardList className="h-6 w-6 text-[rgb(var(--terciary-base))]" />
          </div>
          <p className="font-semibold text-[rgb(var(--terciary-dark))] text-base mb-1.5">
            Registrar Visita
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Solicita un permiso de acceso para tu empresa. Recibirás un folio único y
            código QR directamente en tu teléfono.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold w-fit text-white px-2.5 py-1.5 float-right rounded-md bg-[rgb(var(--primary-base))]">
            Comenzar registro
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelect("consultar")}
          className="group text-left rounded-2xl border shadow-[3px_3px_0_rgb(var(--secondary-base))]  bg-white p-6  border-gray-200 hover:scale-105 transition-transform duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--secondary-base))]"
        >
<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl  transition-colors bg-yellow-50 group-hover:bg-yellow-100">
                   <Search className="h-6 w-6 text-[rgb(var(--secondary-dark))]" />
          </div>
          <p className="font-semibold text-[rgb(var(--secondary-dark))] text-base mb-1.5">
            Consultar mi Permiso
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ingresa tu folio (Ej. FOL-A1B2C3) o número de teléfono para ver
            el estado actual de tu solicitud de acceso.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold w-fit text-white px-2.5 py-1.5 float-right rounded-md bg-[rgb(var(--primary-base))]">
            Ver estado
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </button>
      </div>

      {/* Instrucciones del proceso */}
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 text-center">
          ¿Cómo funciona el proceso?
        </p>
        <div className="grid gap-3 sm:grid-cols-3 mt-2">
          {[
            {
              step: "01",
              Icon: FileText,
              title: "Llena el formulario",
              desc: "Ingresa los datos de tu empresa, representante, visitantes y carga tu identificación oficial.",
            },
            {
              step: "02",
              Icon: Sparkles,
              title: "Validación automática",
              desc: "Nuestro sistema revisa tu información y documento. En minutos recibirás confirmación.",
            },
            {
              step: "03",
              Icon: QrCode,
              title: "Presenta tu QR",
              desc: "El día de tu visita, el guardia escaneará tu código QR o verificará tu folio de acceso.",
            },
          ].map(({ step, Icon, title, desc }) => (
            <div
              key={step}
              className="flex flex-col gap-2 rounded-xl border-4 border-dotted border-gray-200 bg-gray-50 p-5 cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[rgb(var(--primary-base))/0.4]">{step}</span>
                <Icon className="h-4 w-4 text-[rgb(var(--primary-base))]" />
              </div>
              <p className="text-sm font-semibold text-[rgb(var(--primary-dark))]">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info notice */}
      <div className="max-w-2xl mx-auto">
        <Alert variant="secondary">
          <div>
            <p className="text-sm font-medium">Información importante</p>
            <p className="text-xs mt-1 leading-relaxed">
              Todos los visitantes deben registrarse con al menos <strong>24 horas de anticipación</strong>.
              La aprobación final está sujeta a revisión administrativa y políticas institucionales vigentes.
            </p>
          </div>
        </Alert>
      </div>
    </div>
  )
}

// ── Simulador de validación IA ─────────────────────────────────────────────────

function IADocumentChecker({
  fileName,
  status,
}: {
  fileName: string | null
  status: IAStatus
}) {
  if (!fileName) return null

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-2">
      <div className="flex items-center gap-2">
        <Upload className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
        <span className="text-xs text-[rgb(var(--base-color))] truncate flex-1">{fileName}</span>
      </div>

      {status === "scanning" && (
        <div className="flex items-center gap-2">
          <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-[rgb(var(--primary-base))] border-t-transparent flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="h-3 w-3 text-[rgb(var(--primary-base))]" />
              <span className="text-xs font-medium text-[rgb(var(--primary-base))]">
                IA analizando documento…
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full rounded-full bg-[rgb(var(--primary-base))] animate-pulse w-2/3" />
            </div>
          </div>
        </div>
      )}

      {status === "ok" && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-green-700">Documento válido</p>
            <p className="text-[10px] text-green-600">
              La IA verificó: datos legibles · vigencia correcta · sin alteraciones
            </p>
          </div>
        </div>
      )}

      {status === "warn" && (
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-yellow-700">Documento con observaciones</p>
            <p className="text-[10px] text-yellow-600">
              La IA detectó posibles problemas. Un administrador revisará manualmente.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Formulario de creación ────────────────────────────────────────────────────

function FormularioCrear({ onBack }: { onBack: () => void }) {
  const { crearVisita } = useVisitas()

  const [empresa, setEmpresa] = React.useState("")
  const [representante, setRepresentante] = React.useState("")
  const [telefono, setTelefono] = React.useState("")
  const [personas, setPersonas] = React.useState<string[]>([""])
  const [contactoPreferido, setContactoPreferido] = React.useState<ContactoPreferido>("whatsapp")
  const [personaVisitar, setPersonaVisitar] = React.useState("")
  const [fecha, setFecha] = React.useState("")
  const [hora, setHora] = React.useState("")
  const [docFileName, setDocFileName] = React.useState<string | null>(null)
  const [docStatus, setDocStatus] = React.useState<IAStatus>("idle")
  const [errors, setErrors] = React.useState<string[]>([])
  const [success, setSuccess] = React.useState<{
    folio: string
    contacto: ContactoPreferido
    empresa: string
  } | null>(null)

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setDocFileName(file.name)
    setDocStatus("scanning")
    // Simulate IA check
    setTimeout(() => {
      setDocStatus(Math.random() > 0.15 ? "ok" : "warn")
    }, 2200)
  }

  const handleRemoveDoc = () => {
    setDocFileName(null)
    setDocStatus("idle")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleAddPersona = () => setPersonas((p) => [...p, ""])
  const handleRemovePersona = (i: number) => setPersonas((p) => p.filter((_, idx) => idx !== i))
  const handlePersonaChange = (i: number, v: string) =>
    setPersonas((p) => p.map((x, idx) => (idx === i ? v : x)))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: string[] = []
    if (!empresa.trim()) errs.push("El nombre de la empresa es requerido.")
    if (!representante.trim()) errs.push("El nombre del representante es requerido.")
    if (telefono.replace(/\D/g, "").length < 10)
      errs.push("Ingresa un teléfono válido de 10 dígitos.")
    if (!personaVisitar.trim()) errs.push("Indica la persona a visitar.")
    if (!fecha.trim()) errs.push("Selecciona la fecha de visita.")
    if (!hora.trim()) errs.push("Selecciona la hora de visita.")
    if (personas.filter((p) => p.trim()).length === 0)
      errs.push("Agrega al menos una persona visitante.")
    if (!docFileName) errs.push("Adjunta tu identificación oficial.")

    if (errs.length > 0) {
      setErrors(errs)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const nueva = crearVisita({
      empresa: empresa.trim(),
      representante: representante.trim(),
      telefono: telefono.trim(),
      personas: personas.filter((p) => p.trim()),
      contactoPreferido,
      personaVisitar: personaVisitar.trim(),
      fechaHora: `${fecha} ${hora}`,
      documentoValidado: docStatus === "ok",
    })

    setSuccess({ folio: nueva.folio, contacto: contactoPreferido, empresa: empresa.trim() })
    setErrors([])
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (success) {
    return (
      <div className="space-y-6 max-w-lg mx-auto">
        <div className="text-center space-y-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 mx-auto mb-2">
            <CheckCircle2 className="h-7 w-7 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-[rgb(var(--primary-dark))]">
            ¡Solicitud enviada!
          </h2>
          <p className="text-sm text-muted-foreground">
            Tu permiso está en revisión. Guarda tu folio.
          </p>
        </div>

        <Card variant="base" className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="text-sm font-medium text-[rgb(var(--base-color))]">Empresa</span>
            <span className="text-sm font-semibold text-[rgb(var(--primary-dark))]">{success.empresa}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[rgb(var(--base-color))]">Folio de acceso</span>
            <span className="font-mono text-xl font-bold text-[rgb(var(--primary-base))]">
              {success.folio}
            </span>
          </div>

          {/* QR simulado */}
          <div className="flex flex-col items-center gap-3 py-4 border-t border-b border-gray-100">
            <div
              className="flex h-36 w-36 items-center justify-center rounded-xl border-2 border-dashed border-[rgb(var(--primary-base))/0.35] bg-[rgb(var(--primary-light))/0.04]"
              aria-label="Código QR simulado"
            >
              <div className="grid grid-cols-6 gap-[2px] p-1">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 rounded-[1px]"
                    style={{
                      backgroundColor:
                        [0, 1, 5, 6, 7, 11, 12, 17, 18, 23, 24, 29, 30, 35].includes(i) ||
                        Math.random() > 0.4
                          ? "rgb(var(--primary-base))"
                          : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Presenta este código QR al guardia el día de tu visita
            </p>
          </div>

          <Alert variant={success.contacto === "whatsapp" ? "success" : "primary"}>
            <div className="flex items-center gap-2">
              {success.contacto === "whatsapp" ? (
                <MessageCircle className="h-4 w-4 flex-shrink-0" />
              ) : (
                <Phone className="h-4 w-4 flex-shrink-0" />
              )}
              <p className="text-sm">
                Folio y QR enviados por{" "}
                <span className="font-semibold capitalize">{success.contacto}</span>
              </p>
            </div>
          </Alert>

          <Badge variant="warning" className="w-full justify-center py-2">
            Estado: En revisión — el administrador revisará tu solicitud
          </Badge>
        </Card>

        <div className="flex flex-col gap-2">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              setSuccess(null)
              setEmpresa(""); setRepresentante(""); setTelefono("")
              setPersonas([""]); setPersonaVisitar(""); setFecha(""); setHora("")
              setDocFileName(null); setDocStatus("idle")
            }}
          >
            <Plus className="h-4 w-4" /> Registrar otra visita
          </Button>
          <Button variant="outline" className="w-full" onClick={onBack}>
            Volver al inicio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack} className="btn-ghost btn-sm text-muted-foreground">
          ← Regresar
        </button>
        <div className="h-4 w-px bg-gray-200" />
        <div>
          <p className="font-semibold text-[rgb(var(--primary-dark))]">Registrar nueva visita</p>
          <p className="text-xs text-muted-foreground">Campos con * son obligatorios</p>
        </div>
      </div>

      {errors.length > 0 && (
        <Alert variant="danger">
          <ul className="list-disc pl-4 space-y-0.5">
            {errors.map((e) => <li key={e} className="text-sm">{e}</li>)}
          </ul>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Empresa */}
        <fieldset className="card-base space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-4 w-4 text-[rgb(var(--primary-base))]" />
            <p className="text-sm font-semibold text-[rgb(var(--primary-dark))]">Datos de la empresa</p>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <Label className="label-base">Empresa <span className="text-red-500">*</span></Label>
              <Input className="input-base" placeholder="Nombre de tu empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
            </div>
            <div className="form-field">
              <Label className="label-base">Representante <span className="text-red-500">*</span></Label>
              <Input className="input-base" placeholder="Nombre completo del representante" value={representante} onChange={(e) => setRepresentante(e.target.value)} />
            </div>
            <div className="form-field">
              <Label className="label-base">Teléfono de contacto <span className="text-red-500">*</span></Label>
              <Input type="tel" className="input-base" placeholder="10 dígitos — para recibir tu QR" value={telefono} maxLength={15} onChange={(e) => setTelefono(e.target.value)} />
              <p className="form-field-hint">Con este número podrás consultar tu permiso.</p>
            </div>
            <div className="form-field">
              <Label className="label-base">Medio de contacto</Label>
              <Select value={contactoPreferido} onValueChange={(v) => setContactoPreferido(v as ContactoPreferido)}>
                <SelectTrigger className="select-trigger-base"><SelectValue /></SelectTrigger>
                <SelectContent className="select-content-base">
                  <SelectItem value="whatsapp" className="select-item-base">WhatsApp</SelectItem>
                  <SelectItem value="sms" className="select-item-base">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </fieldset>

        {/* Visita */}
        <fieldset className="card-base space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays className="h-4 w-4 text-[rgb(var(--primary-base))]" />
            <p className="text-sm font-semibold text-[rgb(var(--primary-dark))]">Detalles de la visita</p>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <Label className="label-base">Persona a visitar <span className="text-red-500">*</span></Label>
              <Input className="input-base" placeholder="Nombre de quien te recibirá" value={personaVisitar} onChange={(e) => setPersonaVisitar(e.target.value)} />
            </div>
            <div className="form-field col-span-1" />
            <div className="form-field">
              <Label className="label-base">Fecha <span className="text-red-500">*</span></Label>
              <Input type="date" className="input-base" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>
            <div className="form-field">
              <Label className="label-base">Hora <span className="text-red-500">*</span></Label>
              <Input type="time" className="input-base" value={hora} onChange={(e) => setHora(e.target.value)} />
            </div>
          </div>
        </fieldset>

        {/* Visitantes */}
        <fieldset className="card-base space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-[rgb(var(--primary-base))]" />
            <p className="text-sm font-semibold text-[rgb(var(--primary-dark))]">
              Personas que visitarán las instalaciones
            </p>
          </div>
          <p className="text-xs text-muted-foreground -mt-2">
            Agrega el nombre completo de cada persona que ingresará contigo.
          </p>
          <div className="space-y-2">
            {personas.map((p, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  className="input-base flex-1"
                  placeholder={`Visitante ${idx + 1} — nombre completo`}
                  value={p}
                  onChange={(e) => handlePersonaChange(idx, e.target.value)}
                />
                {personas.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePersona(idx)}
                    className="btn-ghost btn-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-2"
                    aria-label="Eliminar visitante"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddPersona} className="btn-ghost btn-sm text-[rgb(var(--primary-base))]">
            <Plus className="h-3.5 w-3.5" /> Agregar visitante
          </button>
        </fieldset>

        {/* Documento */}
        <fieldset className="card-base space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Upload className="h-4 w-4 text-[rgb(var(--primary-base))]" />
            <p className="text-sm font-semibold text-[rgb(var(--primary-dark))]">
              Identificación oficial <span className="text-red-500">*</span>
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Adjunta una imagen o PDF de tu INE, pasaporte o credencial oficial vigente.
            Nuestro sistema la revisará automáticamente.
          </p>

          {!docFileName ? (
            <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[rgb(var(--primary-base))/0.25] bg-[rgb(var(--primary-light))/0.03] py-8 cursor-pointer hover:border-[rgb(var(--primary-base))/0.5] hover:bg-[rgb(var(--primary-light))/0.06] transition-colors">
              <Upload className="h-8 w-8 text-[rgb(var(--primary-base))/0.4]" />
              <span className="text-sm font-medium text-[rgb(var(--primary-dark))]">
                Haz clic para subir tu documento
              </span>
              <span className="text-xs text-muted-foreground">JPG, PNG o PDF · Máx. 5 MB</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Documento cargado</span>
                <button
                  type="button"
                  onClick={handleRemoveDoc}
                  className="btn-ghost btn-sm text-muted-foreground px-1.5"
                  aria-label="Quitar documento"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <IADocumentChecker fileName={docFileName} status={docStatus} />
            </div>
          )}
        </fieldset>

        <Button variant="primary" type="submit" size="lg" className="w-full">
          <ShieldCheck className="h-4 w-4" />
          Enviar solicitud de acceso
        </Button>
      </form>
    </div>
  )
}

// ── Consulta de permiso ───────────────────────────────────────────────────────

function ConsultarPermiso({ onBack }: { onBack: () => void }) {
  const { buscarVisitaPorFolioOTelefono } = useVisitas()

  const [query, setQuery] = React.useState("")
  const [resultado, setResultado] = React.useState<Visita | null | undefined>(undefined)
  const [buscando, setBuscando] = React.useState(false)

  const handleBuscar = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!query.trim()) return
    setBuscando(true)
    setResultado(undefined)
    setTimeout(() => {
      setResultado(buscarVisitaPorFolioOTelefono(query.trim()) ?? null)
      setBuscando(false)
    }, 700)
  }

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack} className="btn-ghost btn-sm text-muted-foreground">
          ← Regresar
        </button>
        <div className="h-4 w-px bg-gray-200" />
        <div>
          <p className="font-semibold text-[rgb(var(--primary-dark))]">Consultar mi permiso</p>
          <p className="text-xs text-muted-foreground">
            Busca por folio (FOL-XXXXXX) o número de teléfono registrado
          </p>
        </div>
      </div>

      {/* Buscador */}
      <div className="card-base space-y-4">
        <div className="flex items-center gap-2">
          <QrCode className="h-4 w-4 text-[rgb(var(--primary-base))]" />
          <p className="text-sm font-semibold text-[rgb(var(--primary-dark))]">
            Ingresa tu folio o número de teléfono
          </p>
        </div>

        <form onSubmit={handleBuscar} className="flex gap-2">
          <Input
            className="input-base flex-1 font-mono tracking-wider"
            placeholder="FOL-A1B2C3 ó 5512345678"
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
            autoComplete="off"
            spellCheck={false}
            disabled={buscando}
          />
          <Button type="submit" variant="primary" disabled={!query.trim() || buscando}>
            {buscando
              ? <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              : <Search className="h-4 w-4" />}
          </Button>
        </form>

        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          <p>Ejemplos de búsqueda válidos:</p>
          <div className="flex flex-wrap gap-2">
            {["FOL-A1B2C3", "FOL-P6Q7R8", "5512345678", "5598765432"].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setQuery(ex)}
                className="font-mono rounded border border-gray-200 bg-gray-50 px-2 py-0.5 hover:bg-gray-100 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sin resultado */}
      {resultado === null && (
        <Alert variant="danger">
          <div>
            <p className="font-semibold">Sin resultados</p>
            <p className="text-sm mt-0.5">
              No encontramos ningún permiso asociado a{" "}
              <span className="font-mono font-bold">{query}</span>. Verifica el
              folio o el número de teléfono con el que te registraste.
            </p>
          </div>
        </Alert>
      )}

      {/* Resultado */}
      {resultado && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[rgb(var(--primary-dark))]">
              Resultado de tu consulta
            </p>
            <EstadoBadge estado={resultado.estado} />
          </div>

          <Card variant="base" className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(var(--primary-base))/0.08] font-bold text-[rgb(var(--primary-dark))]">
                {resultado.empresa.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-[rgb(var(--primary-dark))]">{resultado.empresa}</p>
                <p className="text-xs text-muted-foreground">{resultado.representante}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">Folio</p>
                <p className="font-mono font-bold text-[rgb(var(--primary-base))]">{resultado.folio}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">Fecha y hora</p>
                <p className="font-medium text-[rgb(var(--base-color))]">{resultado.fechaHora}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">Persona a visitar</p>
                <p className="text-[rgb(var(--base-color))]">{resultado.personaVisitar}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">Contacto</p>
                <div className="flex items-center gap-1.5">
                  {resultado.contactoPreferido === "whatsapp"
                    ? <MessageCircle className="h-3.5 w-3.5 text-green-600" />
                    : <Phone className="h-3.5 w-3.5 text-[rgb(var(--primary-base))]" />}
                  <span className="capitalize text-[rgb(var(--base-color))]">{resultado.contactoPreferido}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                Visitantes registrados
              </p>
              <div className="flex flex-wrap gap-1.5">
                {resultado.personas.map((p) => (
                  <span key={p} className="datatable-access-chip">{p}</span>
                ))}
              </div>
            </div>

            {resultado.comentario && (
              <Alert variant={resultado.estado === "rechazado" ? "danger" : "warning"}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Nota del administrador
                  </p>
                  <p className="text-sm">{resultado.comentario}</p>
                </div>
              </Alert>
            )}
          </Card>

          <button
            type="button"
            onClick={() => { setQuery(""); setResultado(undefined) }}
            className="btn-ghost btn-sm text-muted-foreground w-full justify-center"
          >
            Realizar otra búsqueda
          </button>
        </div>
      )}
    </div>
  )
}

// ── Page principal ────────────────────────────────────────────────────────────

export function ProveedorPage() {
  const [mode, setMode] = React.useState<Mode>("idle")

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      {/* Header público */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setMode("idle")}
            className="flex items-center gap-2 focus-visible:outline-none"
          >
            <img src={logoFull} alt="Bene Access" className="h-8 w-auto object-contain" />
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-700">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
              Portal activo
            </div>
            {mode !== "idle" && (
              <button
                type="button"
                onClick={() => setMode("idle")}
                className="btn-ghost btn-sm text-xs text-muted-foreground"
              >
                Inicio
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => setMode("idle")}
            className={
              mode === "idle"
                ? "font-semibold text-base text-[rgb(var(--primary-base))]"
                : "hover:underline"
            }
          >
            Portal de Acceso
          </button>
          {mode !== "idle" && (
            <>
              <ChevronDown className="h-3 w-3 -rotate-90" />
              <span className="font-semibold text-[rgb(var(--primary-dark))]">
                {mode === "crear" ? "Registrar visita" : "Consultar permiso"}
              </span>
            </>
          )}
        </nav>

        {mode === "idle" && <PantallaInicio onSelect={setMode} />}
        {mode === "crear" && <FormularioCrear onBack={() => setMode("idle")} />}
        {mode === "consultar" && <ConsultarPermiso onBack={() => setMode("idle")} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="mx-auto max-w-4xl px-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2026 Bene Access — Control de Accesos Institucional</span>
          <span className="hidden sm:block">Plataforma segura · Uso autorizado únicamente</span>
        </div>
      </footer>
    </div>
  )
}
