import { AppLayout } from "@/components/templates"
import {
  Button,
  Badge,
  Alert,
  Card,
  StatCard,
} from "@/components/atoms"
import { FormModalExample } from "@/components/organisms"
import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Check, X, AlertTriangle } from "lucide-react"

/* ========================================
   COMPONENTS PAGE - Design System Catalog
   Showcase all design system components
   ======================================== */

export function ComponentsPage() {
  type TableStatus = "APPROVED" | "PENDING" | "REJECTED"

  interface TableDemoRow {
    provider: string
    providerRole: string
    requester: string
    requesterInitials: string
    estado: TableStatus
    accessLevel: string
    date: string
    time: string
    action: string
  }

  const tableData: TableDemoRow[] = [
    {
      provider: "iNTEL Softwares",
      providerRole: "External auditor",
      requester: "Julian Vance",
      requesterInitials: "JV",
      estado: "PENDING",
      accessLevel: "N/A",
      date: "Oct 24, 2023",
      time: "14:22 PM",
      action: "System actioned",
    },
    {
      provider: "SafeGuard Hub",
      providerRole: "Security provider",
      requester: "Sarah Jenkins",
      requesterInitials: "SJ",
      estado: "APPROVED",
      accessLevel: "Read only",
      date: "Oct 23, 2023",
      time: "09:15 AM",
      action: "System actioned",
    },
    {
      provider: "DataStream API",
      providerRole: "Integration",
      requester: "Marcus Knight",
      requesterInitials: "MK",
      estado: "REJECTED",
      accessLevel: "Write access",
      date: "Oct 22, 2023",
      time: "11:40 AM",
      action: "Re-evaluate",
    },
    {
      provider: "CloudBox",
      providerRole: "Storage",
      requester: "Andrea Lopez",
      requesterInitials: "AL",
      estado: "APPROVED",
      accessLevel: "Read only",
      date: "Oct 21, 2023",
      time: "10:05 AM",
      action: "System actioned",
    },
  ]

  const tableColumns: DataTableColumn<TableDemoRow>[] = [
    {
      header: "Provider",
      accessorKey: "provider",
      cell: (row) => (
        <div>
          <p className="datatable-provider-name">{row.provider}</p>
          <p className="datatable-provider-role">{row.providerRole}</p>
        </div>
      ),
      searchable: true,
    },
    {
      header: "Requesting person",
      accessorKey: "requester",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="datatable-requester-avatar">
            {row.requesterInitials}
          </div>
          <p className="datatable-requester-name">{row.requester}</p>
        </div>
      ),
      searchable: true,
    },
    {
      header: "Date/Time",
      accessorKey: "date",
      cell: (row) => (
        <div>
          <p className="datatable-date">{row.date}</p>
          <p className="datatable-time">{row.time}</p>
        </div>
      ),
      searchable: false,
    },
    {
      header: "Access level",
      accessorKey: "accessLevel",
      cell: (row) => (
        <span className="datatable-access-chip">
          {row.accessLevel}
        </span>
      ),
      searchable: false,
    },
    {
      header: "Status",
      accessorKey: "estado",
      cell: (row) => {
        const variant =
          row.estado === "APPROVED"
            ? "success"
            : row.estado === "PENDING"
              ? "warning"
              : "danger"

        return <Badge variant={variant} className="px-3 py-1 text-[11px] tracking-wide">{row.estado}</Badge>
      },
      searchable: false,
    },
    {
      header: "Actions",
      accessorKey: "action",
      cell: (row) =>
        row.action === "Re-evaluate" ? (
          <Button
            variant="outline"
            size="sm"
            className="datatable-action-btn uppercase tracking-wide"
          >
            {row.action}
          </Button>
        ) : (
          <span className="datatable-action-muted">{row.action}</span>
        ),
      className: "text-right",
      headerClassName: "text-right pr-6",
      searchable: false,
    },
  ]

  const formSelectOptions = [
    { value: "admin", label: "Administrador" },
    { value: "analyst", label: "Analista" },
    { value: "operator", label: "Operador" },
  ]

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[rgb(var(--neutral-900))]">
            Design System
          </h1>
          <p className="text-muted mt-2">
            Catálogo de componentes del sistema de diseño Bene Access
          </p>
        </div>

        <div className="divider-horizontal" />

        {/* Color Palette */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Paleta de Colores</h2>
          
          <div className="space-y-6">
            {/* Primary */}
            <div>
              <h3 className="text-lg font-medium mb-3">Primary (Azul) - #4267B2</h3>
              <p className="text-sm text-muted mb-3">Usado en sidebar, dashboard y acciones principales</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div
                    className="h-20 rounded-md border border-gray-300"
                    style={{ backgroundColor: 'rgb(var(--primary-light))' }}
                  />
                  <p className="text-xs text-center">Light</p>
                  <p className="text-xs text-center text-muted font-mono">--primary-light</p>
                </div>
                <div className="space-y-2">
                  <div
                    className="h-20 rounded-md border border-gray-300"
                    style={{ backgroundColor: 'rgb(var(--primary-base))' }}
                  />
                  <p className="text-xs text-center font-semibold">Base</p>
                  <p className="text-xs text-center text-muted font-mono">--primary-base</p>
                </div>
                <div className="space-y-2">
                  <div
                    className="h-20 rounded-md border border-gray-300"
                    style={{ backgroundColor: 'rgb(var(--primary-dark))' }}
                  />
                  <p className="text-xs text-center">Dark</p>
                  <p className="text-xs text-center text-muted font-mono">--primary-dark</p>
                </div>
              </div>
            </div>

            {/* Secondary */}
            <div>
              <h3 className="text-lg font-medium mb-3">Secondary (Amarillo/Mostaza) - #F0AD4E</h3>
              <p className="text-sm text-muted mb-3">Usado para acciones secundarias y alertas</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div
                    className="h-20 rounded-md border border-gray-300"
                    style={{ backgroundColor: 'rgb(var(--secondary-light))' }}
                  />
                  <p className="text-xs text-center">Light</p>
                  <p className="text-xs text-center text-muted font-mono">--secondary-light</p>
                </div>
                <div className="space-y-2">
                  <div
                    className="h-20 rounded-md border border-gray-300"
                    style={{ backgroundColor: 'rgb(var(--secondary-base))' }}
                  />
                  <p className="text-xs text-center font-semibold">Base</p>
                  <p className="text-xs text-center text-muted font-mono">--secondary-base</p>
                </div>
                <div className="space-y-2">
                  <div
                    className="h-20 rounded-md border border-gray-300"
                    style={{ backgroundColor: 'rgb(var(--secondary-dark))' }}
                  />
                  <p className="text-xs text-center">Dark</p>
                  <p className="text-xs text-center text-muted font-mono">--secondary-dark</p>
                </div>
              </div>
            </div>

             {/* Tertiary */}
            <div>
              <h3 className="text-lg font-medium mb-3">Tertiary (Rojo/España) - #E30613</h3>
              <p className="text-sm text-muted mb-3">Usado para acciones terciarias y alertas</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div
                    className="h-20 rounded-md border border-gray-300"
                    style={{ backgroundColor: 'rgb(var(--terciary-light))' }}
                  />
                  <p className="text-xs text-center">Light</p>
                  <p className="text-xs text-center text-muted font-mono">--terciary-light</p>
                </div>
                <div className="space-y-2">
                  <div
                    className="h-20 rounded-md border border-gray-300"
                    style={{ backgroundColor: 'rgb(var(--terciary-base))' }}
                  />
                  <p className="text-xs text-center font-semibold">Base</p>
                  <p className="text-xs text-center text-muted font-mono">--terciary-base</p>
                </div>
                <div className="space-y-2">
                  <div
                    className="h-20 rounded-md border border-gray-300"
                    style={{ backgroundColor: 'rgb(var(--terciary-dark))' }}
                  />
                  <p className="text-xs text-center">Dark</p>
                  <p className="text-xs text-center text-muted font-mono">--terciary-dark</p>
                </div>
              </div>
            </div>

            {/* Tailwind Colors */}
            <div>
              <h3 className="text-lg font-medium mb-3">Estados (Tailwind Colors)</h3>
              <p className="text-sm text-muted mb-3">Usamos los colores de Tailwind directamente</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="h-20 rounded-md bg-green-700" />
                  <p className="text-xs text-center font-semibold">Success</p>
                  <p className="text-xs text-center text-muted font-mono">green-700</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 rounded-md bg-yellow-500" />
                  <p className="text-xs text-center font-semibold">Warning</p>
                  <p className="text-xs text-center text-muted font-mono">yellow-500</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 rounded-md bg-red-500" />
                  <p className="text-xs text-center font-semibold">Danger</p>
                  <p className="text-xs text-center text-muted font-mono">red-500</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider-horizontal" />

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
          
          <div className="space-y-6">
            {/* Variants */}
            <div>
              <h3 className="text-lg font-medium mb-3">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-medium mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="text-lg font-medium mb-3">With Icons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">
                  <Check className="h-4 w-4" />
                  Aprobar
                </Button>
                <Button variant="danger">
                  <X className="h-4 w-4" />
                  Rechazar
                </Button>
                <Button variant="success">
                  <Calendar className="h-4 w-4" />
                  Agendar
                </Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h3 className="text-lg font-medium mb-3">States</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Normal</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        <div className="divider-horizontal" />

        {/* Badges */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Badges</h2>
          
          <div className="space-y-6">
            {/* Variants */}
            <div>
              <h3 className="text-lg font-medium mb-3">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Aprobado</Badge>
                <Badge variant="warning">Pendiente</Badge>
                <Badge variant="danger">Rechazado</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="text-lg font-medium mb-3">With Icons</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="success">
                  <Check className="h-3 w-3" />
                  Aprobado
                </Badge>
                <Badge variant="warning">
                  <AlertTriangle className="h-3 w-3" />
                  Pendiente
                </Badge>
                <Badge variant="danger">
                  <X className="h-3 w-3" />
                  Rechazado
                </Badge>
              </div>
            </div>
          </div>
        </section>

        <div className="divider-horizontal" />

        {/* Cards */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Cards</h2>
          
          <div className="space-y-6">
            {/* Basic Cards */}
            <div>
              <h3 className="text-lg font-medium mb-3">Basic Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card variant="base">
                  <h4 className="font-semibold mb-2">Base Card</h4>
                  <p className="text-sm text-muted">Default card style</p>
                </Card>
                <Card variant="primary">
                  <h4 className="font-semibold mb-2">Primary Card</h4>
                  <p className="text-sm text-muted">Primary variant</p>
                </Card>
                <Card variant="secondary">
                  <h4 className="font-semibold mb-2">Secondary Card</h4>
                  <p className="text-sm text-muted">Secondary variant</p>
                </Card>
                <Card variant="success">
                  <h4 className="font-semibold mb-2">Success Card</h4>
                  <p className="text-sm text-muted">Success variant</p>
                </Card>
                <Card variant="warning">
                  <h4 className="font-semibold mb-2">Warning Card</h4>
                  <p className="text-sm text-muted">Warning variant</p>
                </Card>
              </div>
            </div>

            {/* Stat Cards */}
            <div>
              <h3 className="text-lg font-medium mb-3">Stat Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                  variant="primary"
                  label="Permisos Hoy"
                  value="12"
                  icon={<Calendar className="h-8 w-8 text-blue-600" />}
                />
                <StatCard
                  variant="secondary"
                  label="Pendientes"
                  value="3"
                  icon={<AlertTriangle className="h-8 w-8 text-yellow-600" />}
                />
                <StatCard
                  variant="success"
                  label="Aprobados"
                  value="8"
                  icon={<Check className="h-8 w-8 text-green-700" />}
                />
                <StatCard
                  variant="warning"
                  label="En Revisión"
                  value="2"
                  icon={<AlertTriangle className="h-8 w-8 text-yellow-600" />}
                />
                <StatCard
                  variant="danger"
                  label="Rechazados"
                  value="1"
                  icon={<X className="h-8 w-8 text-red-600" />}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="divider-horizontal" />

        {/* Tables */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Tables</h2>
          <p className="text-sm text-muted mb-4">
            Tabla para catalogo visual con busqueda y paginacion simulada en frontend.
          </p>

          <DataTable
            columns={tableColumns}
            data={tableData}
            filterPlaceholder="Search by provider or requester..."
            pageSize={3}
            statusLabel="All Status"
            dateRangeLabel="Oct 12 - Oct 19, 2023"
          />
        </section>

        <div className="divider-horizontal" />

        {/* Form Classes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Form Classes (shadcn + palette)</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card variant="base" className="space-y-4">
              <h3 className="text-lg font-medium">Inputs</h3>
              <div className="form-field">
                <Label className="label-base">Nombre</Label>
                <Input className="input-base" placeholder="Nombre completo" />
              </div>
              <div className="form-field">
                <Label className="label-base">Correo</Label>
                <Input className="input-base" type="email" placeholder="correo@bene-access.com" />
              </div>
            </Card>

            <Card variant="base" className="space-y-4">
              <h3 className="text-lg font-medium">Select</h3>
              <div className="form-field">
                <Label className="label-base">Rol</Label>
             

                    <Select>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                


              </div>
            </Card>


            

            <Card variant="base" className="space-y-4 lg:col-span-2">
              <h3 className="text-lg font-medium">Textarea</h3>
              <div className="form-field">
                <Label className="label-base">Notas</Label>
                <Textarea className="textarea-base" placeholder="Describe una observacion o comentario..." />
              </div>
            </Card>
          </div>
        </section>

        <div className="divider-horizontal" />

        {/* Complete Form + Modal */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Complete Form + Modal</h2>
          <p className="text-sm text-muted mb-4">
            El boton para abrir modal y guardar usa estilo primary. El cierre usa danger rojo.
          </p>

          <div className="flex items-center gap-3">
            <FormModalExample />
          </div>
        </section>

        <div className="divider-horizontal" />

        {/* Alerts */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
          
          <div className="space-y-4">
            <Alert variant="primary">
              <div>
                <h4 className="font-semibold mb-1">Información</h4>
                <p className="text-sm">Esta es una alerta informativa para el usuario.</p>
              </div>
            </Alert>

            <Alert variant="secondary">
              <div>
                <h4 className="font-semibold mb-1">Secundaria</h4>
                <p className="text-sm">Esta es una alerta secundaria para información adicional.</p>
              </div>
            </Alert>

            <Alert variant="success">
              <div>
                <h4 className="font-semibold mb-1">Éxito</h4>
                <p className="text-sm">La operación se completó exitosamente.</p>
              </div>
            </Alert>

            <Alert variant="warning">
              <div>
                <h4 className="font-semibold mb-1">Advertencia</h4>
                <p className="text-sm">Ten cuidado con esta acción, puede tener consecuencias.</p>
              </div>
            </Alert>

            <Alert variant="danger">
              <div>
                <h4 className="font-semibold mb-1">Error</h4>
                <p className="text-sm">Ocurrió un error al procesar la solicitud.</p>
              </div>
            </Alert>
          </div>
        </section>

        <div className="divider-horizontal" />

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Typography</h2>
          
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <p className="text-sm text-muted">text-4xl font-bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold">Heading 2</h2>
              <p className="text-sm text-muted">text-3xl font-semibold</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Heading 3</h3>
              <p className="text-sm text-muted">text-2xl font-semibold</p>
            </div>
            <div>
              <h4 className="text-xl font-medium">Heading 4</h4>
              <p className="text-sm text-muted">text-xl font-medium</p>
            </div>
            <div>
              <p className="text-base">Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p className="text-sm text-muted">text-base</p>
            </div>
            <div>
              <p className="text-sm text-muted">Small text - Lorem ipsum dolor sit amet.</p>
              <p className="text-xs text-muted">text-sm</p>
            </div>
          </div>
        </section>

        <div className="divider-horizontal" />

        {/* Utility Classes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Utility Classes</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Text Colors</h3>
              <div className="space-y-2">
                <p className="text-primary">Primary text color</p>
                <p className="text-secondary">Secondary text color</p>
                <p className="text-base-color">Base text color (#364153)</p>
                <p className="text-success">Success text color</p>
                <p className="text-warning">Warning text color</p>
                <p className="text-danger">Danger text color</p>
                <p className="text-muted">Muted text color</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Dividers</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted mb-2">Horizontal</p>
                  <div className="divider-horizontal" />
                </div>
                <div className="flex gap-4 items-center">
                  <p className="text-sm text-muted">Vertical</p>
                  <div className="divider-vertical h-12" />
                  <p className="text-sm text-muted">Example</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
