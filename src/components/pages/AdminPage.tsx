import * as React from "react"
import {
  CheckCircle2,
  XCircle,
  CalendarClock,
  Eye,
  Plus,
  Trash2,
  MessageCircle,
  Phone,
} from "lucide-react"
import { AppLayout } from "@/components/templates"
import { Button, Badge, Alert } from "@/components/atoms"
import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useVisitas, type Visita } from "@/store/visitas"

/* ========================================
   ADMIN PAGE
   DataTable de visitas + todos los modales de acción
   + modal de registro de nueva visita
   ======================================== */

// ── Helpers ────────────────────────────────────────────────────────────────────

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

function formatFecha(fechaHora: string) {
  const [fecha, hora] = fechaHora.split(" ")
  return { fecha: fecha ?? "", hora: hora ?? "" }
}

// ── Modal: Detalle ─────────────────────────────────────────────────────────────

function ModalDetalle({
  visita,
  onClose,
}: {
  visita: Visita | null
  onClose: () => void
}) {
  return (
    <Dialog open={visita !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="form-modal-content max-w-xl" showCloseButton={false}>
        <DialogHeader className="form-modal-header">
          <DialogTitle className="form-modal-title">Detalle de Visita</DialogTitle>
          <DialogDescription className="form-modal-description">
            Información completa del registro de acceso.
          </DialogDescription>
        </DialogHeader>

        {visita && (
          <div className="form-modal-body space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-[rgb(var(--primary-base))]">
                {visita.folio}
              </span>
              <EstadoBadge estado={visita.estado} />
            </div>

            <div className="form-grid">
              <div>
                <p className="label-base mb-0">Empresa</p>
                <p className="text-sm font-medium text-[rgb(var(--primary-dark))]">{visita.empresa}</p>
              </div>
              <div>
                <p className="label-base mb-0">Representante</p>
                <p className="text-sm text-[rgb(var(--base-color))]">{visita.representante}</p>
              </div>
              <div>
                <p className="label-base mb-0">Persona a visitar</p>
                <p className="text-sm text-[rgb(var(--base-color))]">{visita.personaVisitar}</p>
              </div>
              <div>
                <p className="label-base mb-0">Fecha y Hora</p>
                <p className="text-sm text-[rgb(var(--base-color))]">{visita.fechaHora}</p>
              </div>
              <div>
                <p className="label-base mb-0">Contacto preferido</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {visita.contactoPreferido === "whatsapp" ? (
                    <MessageCircle className="h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <Phone className="h-3.5 w-3.5 text-[rgb(var(--primary-base))]" />
                  )}
                  <p className="text-sm capitalize text-[rgb(var(--base-color))]">
                    {visita.contactoPreferido}
                  </p>
                </div>
              </div>
              <div>
                <p className="label-base mb-0">Documento validado</p>
                <p className="text-sm text-[rgb(var(--base-color))]">
                  {visita.documentoValidado ? "✔ Sí" : "✘ No"}
                </p>
              </div>
            </div>

            <div>
              <p className="label-base mb-1">Personas visitantes</p>
              <div className="flex flex-wrap gap-1.5">
                {visita.personas.map((p) => (
                  <span
                    key={p}
                    className="datatable-access-chip"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {visita.comentario && (
              <div>
                <p className="label-base mb-1">Comentario</p>
                <p className="text-sm text-[rgb(var(--base-color))]">{visita.comentario}</p>
              </div>
            )}
          </div>
        )}

        <div className="form-modal-footer">
          <DialogClose render={<Button variant="outline" type="button">Cerrar</Button>} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── Modal: Aprobar ─────────────────────────────────────────────────────────────

function ModalAprobar({
  visita,
  onClose,
  onConfirm,
}: {
  visita: Visita | null
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <Dialog open={visita !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="form-modal-content max-w-md" showCloseButton={false}>
        <DialogHeader className="form-modal-header">
          <DialogTitle className="form-modal-title">Aprobar Visita</DialogTitle>
          <DialogDescription className="form-modal-description">
            Confirma que deseas aprobar el acceso para esta solicitud.
          </DialogDescription>
        </DialogHeader>

        {visita && (
          <div className="form-modal-body">
            <Alert variant="success">
              <div>
                <p className="font-medium">
                  {visita.empresa} — {visita.folio}
                </p>
                <p className="text-sm mt-0.5">
                  {visita.representante} · {visita.fechaHora}
                </p>
              </div>
            </Alert>
          </div>
        )}

        <div className="form-modal-footer">
          <DialogClose render={<Button variant="outline" type="button">Cancelar</Button>} />
          <Button variant="success" type="button" onClick={onConfirm}>
            <CheckCircle2 className="h-4 w-4" />
            Aprobar Acceso
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── Modal: Rechazar ────────────────────────────────────────────────────────────

function ModalRechazar({
  visita,
  onClose,
  onConfirm,
}: {
  visita: Visita | null
  onClose: () => void
  onConfirm: (comentario: string) => void
}) {
  const [comentario, setComentario] = React.useState("")

  React.useEffect(() => {
    if (!visita) setComentario("")
  }, [visita])

  return (
    <Dialog open={visita !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="form-modal-content max-w-md" showCloseButton={false}>
        <DialogHeader className="form-modal-header">
          <DialogTitle className="form-modal-title">Rechazar Visita</DialogTitle>
          <DialogDescription className="form-modal-description">
            Indica el motivo del rechazo. Se notificará al representante.
          </DialogDescription>
        </DialogHeader>

        {visita && (
          <div className="form-modal-body space-y-4">
            <Alert variant="danger">
              <div>
                <p className="font-medium">
                  {visita.empresa} — {visita.folio}
                </p>
                <p className="text-sm mt-0.5">{visita.representante}</p>
              </div>
            </Alert>

            <div className="form-field">
              <Label className="label-base">
                Motivo de rechazo <span className="text-red-500">*</span>
              </Label>
              <Textarea
                className="textarea-base"
                placeholder="Describe el motivo del rechazo..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="form-modal-footer">
          <DialogClose render={<Button variant="outline" type="button">Cancelar</Button>} />
          <Button
            variant="danger"
            type="button"
            onClick={() => onConfirm(comentario)}
            disabled={!comentario.trim()}
          >
            <XCircle className="h-4 w-4" />
            Rechazar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── Modal: Reagendar ──────────────────────────────────────────────────────────

function ModalReagendar({
  visita,
  onClose,
  onConfirm,
}: {
  visita: Visita | null
  onClose: () => void
  onConfirm: (nuevaFecha: string, comentario: string) => void
}) {
  const [nuevaFecha, setNuevaFecha] = React.useState("")
  const [nuevaHora, setNuevaHora] = React.useState("")
  const [comentario, setComentario] = React.useState("")

  React.useEffect(() => {
    if (!visita) {
      setNuevaFecha("")
      setNuevaHora("")
      setComentario("")
    }
  }, [visita])

  const handleConfirm = () => {
    const fechaHora = `${nuevaFecha} ${nuevaHora}`
    onConfirm(fechaHora, comentario)
  }

  return (
    <Dialog open={visita !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="form-modal-content max-w-lg" showCloseButton={false}>
        <DialogHeader className="form-modal-header">
          <DialogTitle className="form-modal-title">Reagendar Visita</DialogTitle>
          <DialogDescription className="form-modal-description">
            Selecciona una nueva fecha y hora para la visita.
          </DialogDescription>
        </DialogHeader>

        {visita && (
          <div className="form-modal-body space-y-4">
            <Alert variant="warning">
              <div>
                <p className="font-medium">
                  {visita.empresa} — {visita.folio}
                </p>
                <p className="text-sm mt-0.5">Fecha actual: {visita.fechaHora}</p>
              </div>
            </Alert>

            <div className="form-grid">
              <div className="form-field">
                <Label className="label-base">
                  Nueva fecha <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  className="input-base"
                  value={nuevaFecha}
                  onChange={(e) => setNuevaFecha(e.target.value)}
                />
              </div>

              <div className="form-field">
                <Label className="label-base">
                  Nueva hora <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="time"
                  className="input-base"
                  value={nuevaHora}
                  onChange={(e) => setNuevaHora(e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <Label className="label-base">Comentario</Label>
              <Textarea
                className="textarea-base"
                style={{ minHeight: "80px" }}
                placeholder="Motivo del reagendamiento..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="form-modal-footer">
          <DialogClose render={<Button variant="outline" type="button">Cancelar</Button>} />
          <Button
            variant="warning"
            type="button"
            onClick={handleConfirm}
            disabled={!nuevaFecha.trim() || !nuevaHora.trim()}
          >
            <CalendarClock className="h-4 w-4" />
            Reagendar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── Modal: Nueva Visita ────────────────────────────────────────────────────────

function ModalNuevaVisita({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean
  onClose: () => void
  onSuccess: (folio: string) => void
}) {
  const { crearVisita } = useVisitas()

  const [empresa, setEmpresa] = React.useState("")
  const [representante, setRepresentante] = React.useState("")
  const [personas, setPersonas] = React.useState<string[]>([""])
  const [contactoPreferido, setContactoPreferido] = React.useState<"whatsapp" | "sms">("whatsapp")
  const [personaVisitar, setPersonaVisitar] = React.useState("")
  const [fecha, setFecha] = React.useState("")
  const [hora, setHora] = React.useState("")
  const [documentoValidado, setDocumentoValidado] = React.useState(false)
  const [errors, setErrors] = React.useState<string[]>([])
  const [success, setSuccess] = React.useState<{ folio: string; contacto: string } | null>(null)

  const resetForm = () => {
    setEmpresa("")
    setRepresentante("")
    setPersonas([""])
    setContactoPreferido("whatsapp")
    setPersonaVisitar("")
    setFecha("")
    setHora("")
    setDocumentoValidado(false)
    setErrors([])
    setSuccess(null)
  }

  React.useEffect(() => {
    if (!open) resetForm()
  }, [open])

  const handleAddPersona = () => setPersonas((prev) => [...prev, ""])

  const handleRemovePersona = (index: number) => {
    setPersonas((prev) => prev.filter((_, i) => i !== index))
  }

  const handlePersonaChange = (index: number, value: string) => {
    setPersonas((prev) => prev.map((p, i) => (i === index ? value : p)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: string[] = []
    if (!empresa.trim()) errs.push("El nombre de la empresa es requerido.")
    if (!representante.trim()) errs.push("El representante es requerido.")
    if (!personaVisitar.trim()) errs.push("La persona a visitar es requerida.")
    if (!fecha.trim()) errs.push("La fecha es requerida.")
    if (!hora.trim()) errs.push("La hora es requerida.")
    const personasFilled = personas.filter((p) => p.trim())
    if (personasFilled.length === 0) errs.push("Agrega al menos una persona visitante.")

    if (errs.length > 0) {
      setErrors(errs)
      return
    }

    const nueva = crearVisita({
      empresa: empresa.trim(),
      representante: representante.trim(),
      personas: personasFilled,
      contactoPreferido,
      personaVisitar: personaVisitar.trim(),
      fechaHora: `${fecha} ${hora}`,
      documentoValidado,
    })

    setSuccess({
      folio: nueva.folio,
      contacto: contactoPreferido,
    })
  }

  const handleClose = () => {
    if (success) onSuccess(success.folio)
    else onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="form-modal-content max-w-2xl" showCloseButton={false}>
        <DialogHeader className="form-modal-header">
          <DialogTitle className="form-modal-title">Registrar Nueva Visita</DialogTitle>
          <DialogDescription className="form-modal-description">
            Completa los datos del proveedor o visitante institucional.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="form-modal-body space-y-4">
            <Alert variant="success">
              <div>
                <p className="font-semibold">Visita registrada exitosamente</p>
                <p className="text-sm mt-0.5">
                  Se ha generado el folio de acceso.
                </p>
              </div>
            </Alert>

            <div className="card-base space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[rgb(var(--base-color))]">Folio asignado</span>
                <span className="font-mono text-lg font-bold text-[rgb(var(--primary-base))]">
                  {success.folio}
                </span>
              </div>

              {/* QR simulado */}
              <div className="flex justify-center py-4">
                <div
                  className="flex h-28 w-28 items-center justify-center rounded-lg border-2 border-dashed border-[rgb(var(--primary-base))/0.4] bg-[rgb(var(--primary-light))/0.05]"
                  aria-label="QR Code simulado"
                >
                  <div className="grid grid-cols-5 gap-0.5">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 rounded-[1px]"
                        style={{
                          backgroundColor:
                            Math.random() > 0.4
                              ? "rgb(var(--primary-base))"
                              : "transparent",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Alert variant={success.contacto === "whatsapp" ? "success" : "primary"}>
                <div className="flex items-center gap-2">
                  {success.contacto === "whatsapp" ? (
                    <MessageCircle className="h-4 w-4" />
                  ) : (
                    <Phone className="h-4 w-4" />
                  )}
                  <p className="text-sm">
                    QR y folio enviados por{" "}
                    <span className="font-semibold capitalize">{success.contacto}</span>
                  </p>
                </div>
              </Alert>
            </div>
          </div>
        ) : (
          <form
            id="form-nueva-visita"
            className="form-modal-body space-y-4"
            onSubmit={handleSubmit}
          >
            {errors.length > 0 && (
              <Alert variant="danger">
                <ul className="list-disc pl-4 space-y-0.5">
                  {errors.map((e) => (
                    <li key={e} className="text-sm">
                      {e}
                    </li>
                  ))}
                </ul>
              </Alert>
            )}

            <div className="form-grid">
              <div className="form-field">
                <Label className="label-base">
                  Empresa <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="input-base"
                  placeholder="Nombre de la empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                />
              </div>

              <div className="form-field">
                <Label className="label-base">
                  Representante <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="input-base"
                  placeholder="Nombre del representante"
                  value={representante}
                  onChange={(e) => setRepresentante(e.target.value)}
                />
              </div>

              <div className="form-field">
                <Label className="label-base">
                  Persona a visitar <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="input-base"
                  placeholder="Nombre del receptor"
                  value={personaVisitar}
                  onChange={(e) => setPersonaVisitar(e.target.value)}
                />
              </div>

              <div className="form-field">
                <Label className="label-base">Contacto preferido</Label>
                <Select
                  value={contactoPreferido}
                  onValueChange={(val) =>
                    setContactoPreferido(val as "whatsapp" | "sms")
                  }
                >
                  <SelectTrigger className="select-trigger-base">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent className="select-content-base">
                    <SelectItem value="whatsapp" className="select-item-base">
                      WhatsApp
                    </SelectItem>
                    <SelectItem value="sms" className="select-item-base">
                      SMS
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-field">
                <Label className="label-base">
                  Fecha <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  className="input-base"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>

              <div className="form-field">
                <Label className="label-base">
                  Hora <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="time"
                  className="input-base"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                />
              </div>
            </div>

            {/* Personas visitantes (dinámico) */}
            <div className="form-field">
              <Label className="label-base">
                Personas visitantes <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-2">
                {personas.map((persona, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      className="input-base flex-1"
                      placeholder={`Visitante ${index + 1}`}
                      value={persona}
                      onChange={(e) =>
                        handlePersonaChange(index, e.target.value)
                      }
                    />
                    {personas.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePersona(index)}
                        className="btn-ghost btn-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-2"
                        aria-label="Eliminar visitante"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddPersona}
                className="btn-ghost btn-sm mt-1 text-[rgb(var(--primary-base))]"
              >
                <Plus className="h-3.5 w-3.5" />
                Agregar visitante
              </button>
            </div>

            {/* Documento */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={documentoValidado}
                onChange={(e) => setDocumentoValidado(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm text-[rgb(var(--base-color))]">
                Documento de identidad validado
              </span>
            </label>
          </form>
        )}

        <div className="form-modal-footer">
          <DialogClose
            render={
              <Button variant={success ? "primary" : "outline"} type="button">
                {success ? "Cerrar" : "Cancelar"}
              </Button>
            }
          />
          {!success && (
            <Button variant="primary" type="submit" form="form-nueva-visita">
              <Plus className="h-4 w-4" />
              Registrar Visita
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── Admin Page ─────────────────────────────────────────────────────────────────

export function AdminPage() {
  const { visitas, aprobarVisita, rechazarVisita, reagendarVisita } = useVisitas()

  const [modalDetalle, setModalDetalle] = React.useState<Visita | null>(null)
  const [modalAprobar, setModalAprobar] = React.useState<Visita | null>(null)
  const [modalRechazar, setModalRechazar] = React.useState<Visita | null>(null)
  const [modalReagendar, setModalReagendar] = React.useState<Visita | null>(null)
  const [modalNueva, setModalNueva] = React.useState(false)
  const [alertMsg, setAlertMsg] = React.useState<{ type: "success" | "danger" | "warning"; msg: string } | null>(null)

  const showAlert = (type: "success" | "danger" | "warning", msg: string) => {
    setAlertMsg({ type, msg })
    setTimeout(() => setAlertMsg(null), 3500)
  }

  const handleAprobar = () => {
    if (!modalAprobar) return
    aprobarVisita(modalAprobar.folio)
    showAlert("success", `Visita ${modalAprobar.folio} aprobada correctamente.`)
    setModalAprobar(null)
  }

  const handleRechazar = (comentario: string) => {
    if (!modalRechazar) return
    rechazarVisita(modalRechazar.folio, comentario)
    showAlert("danger", `Visita ${modalRechazar.folio} rechazada.`)
    setModalRechazar(null)
  }

  const handleReagendar = (nuevaFecha: string, comentario: string) => {
    if (!modalReagendar) return
    reagendarVisita(modalReagendar.folio, nuevaFecha, comentario)
    showAlert("warning", `Visita ${modalReagendar.folio} reagendada para ${nuevaFecha}.`)
    setModalReagendar(null)
  }

  const handleNuevaSuccess = (folio: string) => {
    setModalNueva(false)
    showAlert("success", `Visita ${folio} registrada y en revisión pendiente.`)
  }

  const columns: DataTableColumn<Visita>[] = [
    {
      header: "Folio",
      accessorKey: "folio",
      searchable: true,
      cell: (row) => (
        <span className="font-mono text-xs font-semibold text-[rgb(var(--primary-base))]">
          {row.folio}
        </span>
      ),
    },
    {
      header: "Empresa / Representante",
      accessorKey: "empresa",
      searchable: true,
      cell: (row) => (
        <div>
          <p className="datatable-provider-name">{row.empresa}</p>
          <p className="datatable-provider-role">{row.representante}</p>
        </div>
      ),
    },
    {
      header: "Persona a visitar",
      accessorKey: "personaVisitar",
      searchable: true,
      cell: (row) => (
        <span className="text-sm text-[rgb(var(--base-color))]">{row.personaVisitar}</span>
      ),
    },
    {
      header: "Fecha / Hora",
      accessorKey: "fechaHora",
      cell: (row) => {
        const { fecha, hora } = formatFecha(row.fechaHora)
        return (
          <div>
            <p className="datatable-date">{fecha}</p>
            <p className="datatable-time">{hora}</p>
          </div>
        )
      },
    },
    {
      header: "Estado",
      accessorKey: "estado",
      cell: (row) => <EstadoBadge estado={row.estado} />,
    },
    {
      header: "Acciones",
      cell: (row) => (
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setModalDetalle(row)}
            className="btn-ghost btn-sm"
            title="Ver detalle"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>

          {row.estado === "pendiente" && (
            <>
              <button
                type="button"
                onClick={() => setModalAprobar(row)}
                className="btn-success btn-sm"
                title="Aprobar"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setModalRechazar(row)}
                className="btn-danger btn-sm"
                title="Rechazar"
              >
                <XCircle className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setModalReagendar(row)}
                className="btn-warning btn-sm"
                title="Reagendar"
              >
                <CalendarClock className="h-3.5 w-3.5" />
              </button>
            </>
          )}

          {row.estado === "rechazado" && (
            <button
              type="button"
              onClick={() => setModalReagendar(row)}
              className="btn-outline btn-sm"
              title="Re-evaluar / Reagendar"
            >
              <CalendarClock className="h-3.5 w-3.5" />
              <span className="text-xs">Re-evaluar</span>
            </button>
          )}
        </div>
      ),
    },
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* ── Encabezado ─────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[rgb(var(--primary-dark))]">
              Gestión de Permisos
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Audita y aprueba solicitudes de acceso institucional en todos los nodos activos.
            </p>
          </div>
          <Button variant="primary" onClick={() => setModalNueva(true)}>
            <Plus className="h-4 w-4" />
            Nueva Visita
          </Button>
        </div>

        {/* ── Alerta de estado ──────────────────────── */}
        {alertMsg && (
          <Alert variant={alertMsg.type}>
            {alertMsg.msg}
          </Alert>
        )}

        {/* ── DataTable ─────────────────────────────── */}
        <DataTable
          columns={columns}
          data={visitas}
          filterPlaceholder="Buscar por empresa, folio o representante..."
          pageSize={8}
          emptyMessage="No se encontraron solicitudes."
          statusLabel="Todos los estados"
          dateRangeLabel="Abr 01 – Abr 10, 2026"
        />

        {/* ── Modales ───────────────────────────────── */}
        <ModalDetalle
          visita={modalDetalle}
          onClose={() => setModalDetalle(null)}
        />
        <ModalAprobar
          visita={modalAprobar}
          onClose={() => setModalAprobar(null)}
          onConfirm={handleAprobar}
        />
        <ModalRechazar
          visita={modalRechazar}
          onClose={() => setModalRechazar(null)}
          onConfirm={handleRechazar}
        />
        <ModalReagendar
          visita={modalReagendar}
          onClose={() => setModalReagendar(null)}
          onConfirm={handleReagendar}
        />
        <ModalNuevaVisita
          open={modalNueva}
          onClose={() => setModalNueva(false)}
          onSuccess={handleNuevaSuccess}
        />
      </div>
    </AppLayout>
  )
}
