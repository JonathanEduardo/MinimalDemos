import * as React from "react"

import { Button } from "@/components/atoms"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const roleOptions = [
  { value: "admin", label: "Administrador" },
  { value: "analyst", label: "Analista" },
  { value: "operator", label: "Operador" },
]

const statusOptions = [
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" },
]

export function FormModalExample() {
  const [fullName, setFullName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [role, setRole] = React.useState("")
  const [status, setStatus] = React.useState("")
  const [notes, setNotes] = React.useState("")

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="primary">Abrir modal</Button>} />

      <DialogContent className="form-modal-content" showCloseButton={false}>
        <DialogHeader className="form-modal-header">
          <DialogTitle className="form-modal-title">Formulario de Usuario</DialogTitle>
          <DialogDescription className="form-modal-description">
            Ejemplo de formulario compuesto por moleculas y atomos del design system.
          </DialogDescription>
        </DialogHeader>

        <form className="form-modal-body" onSubmit={(event) => event.preventDefault()}>
          <div className="form-grid">
            <div className="form-field">
              <Label htmlFor="fullName" className="label-base">Nombre completo <span className="text-red-500">*</span></Label>
              <Input
                id="fullName"
                className="input-base"
                placeholder="Escribe el nombre"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>

            <div className="form-field">
              <Label htmlFor="email" className="label-base">Correo <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                type="email"
                className="input-base"
                placeholder="correo@bene-access.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-field">
              <Label className="label-base">Rol <span className="text-red-500">*</span></Label>
              <Select value={role || null} onValueChange={(nextValue) => setRole(nextValue ?? "")}>
                <SelectTrigger className="select-trigger-base">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent className="select-content-base">
                  {roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="select-item-base">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="form-field">
              <Label className="label-base">Estado <span className="text-red-500">*</span></Label>
              <Select value={status || null} onValueChange={(nextValue) => setStatus(nextValue ?? "")}>
                <SelectTrigger className="select-trigger-base">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent className="select-content-base">
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="select-item-base">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <div className="form-field">
              <Label htmlFor="notes" className="label-base">Notas</Label>
              <Textarea
                id="notes"
                className="textarea-base"
                placeholder="Escribe un comentario breve..."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
              <p className="form-field-hint">Campo para observaciones internas.</p>
            </div>
          </div>
        </form>

        <div className="form-modal-footer">
          <DialogClose render={<Button variant="danger" type="button">Cerrar</Button>} />
          <Button variant="primary" type="button">
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
