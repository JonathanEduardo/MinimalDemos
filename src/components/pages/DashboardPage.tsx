import * as React from "react"
import {
  LayoutDashboard,
  CheckCircle2,
  XCircle,
  Clock,
  CalendarClock,
  TrendingUp,
  Users,
} from "lucide-react"
import { AppLayout } from "@/components/templates"
import { StatCard, Badge } from "@/components/atoms"
import { useVisitas, type Visita } from "@/store/visitas"

/* ========================================
   DASHBOARD PAGE
   KPIs + Tendencia + Actividad reciente
   ======================================== */

function estadoBadge(estado: Visita["estado"]) {
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
  return { fecha, hora: hora ?? "" }
}

export function DashboardPage() {
  const { visitas, obtenerKPIs, obtenerTendencia } = useVisitas()
  const kpis = obtenerKPIs()
  const tendencia = obtenerTendencia()

  const maxTotal = Math.max(...tendencia.map((d) => d.total), 1)

  const recientes = React.useMemo(
    () =>
      [...visitas]
        .sort(
          (a, b) =>
            new Date(b.fechaActualizacion).getTime() -
            new Date(a.fechaActualizacion).getTime()
        )
        .slice(0, 6),
    [visitas]
  )

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* ── Encabezado ─────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[rgb(var(--primary-dark))]">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Métricas en tiempo real de control de accesos institucionales.
            </p>
          </div>
        </div>

        {/* ── KPI Cards ──────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Visitas"
            value={kpis.total}
            variant="primary"
            icon={<LayoutDashboard className="h-5 w-5 text-[rgb(var(--primary-base))]" />}
          />
          <StatCard
            label="Aprobadas"
            value={kpis.aprobadas}
            variant="success"
            icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
          />
          <StatCard
            label="Rechazadas"
            value={kpis.rechazadas}
            variant="danger"
            icon={<XCircle className="h-5 w-5 text-red-500" />}
          />
          <StatCard
            label="Pendientes"
            value={kpis.pendientes}
            variant="warning"
            icon={<Clock className="h-5 w-5 text-yellow-500" />}
          />
        </div>

        {/* ── Gráfica + Actividad ─────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Gráfica de tendencia */}
          <div className="card-base space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[rgb(var(--primary-dark))]">
                  Tendencia de Solicitudes
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Distribución global — últimos 7 días
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-[rgb(var(--primary-base))]" />
            </div>

            {/* Barras */}
            <div className="flex items-end gap-3 h-40 pt-4">
              {tendencia.map((dia) => {
                const pct = maxTotal > 0 ? (dia.total / maxTotal) * 100 : 0
                const pctAprobadas =
                  dia.total > 0 ? (dia.aprobadas / dia.total) * 100 : 0
                const pctRechazadas =
                  dia.total > 0 ? (dia.rechazadas / dia.total) * 100 : 0
                const pctOtras = 100 - pctAprobadas - pctRechazadas

                return (
                  <div
                    key={dia.dia}
                    className="flex flex-1 flex-col items-center gap-1.5"
                  >
                    <span className="text-[10px] font-semibold text-[rgb(var(--base-color))/0.7]">
                      {dia.total}
                    </span>
                    <div
                      className="w-full rounded-t-md overflow-hidden flex flex-col-reverse"
                      style={{ height: `${Math.max(pct * 0.9, dia.total > 0 ? 8 : 4)}%`, minHeight: dia.total > 0 ? "8px" : "4px", transition: "height 0.3s" }}
                    >
                      <div
                        className="w-full"
                        style={{
                          height: `${pctAprobadas}%`,
                          backgroundColor: "rgb(var(--primary-base))",
                        }}
                      />
                      <div
                        className="w-full bg-yellow-400"
                        style={{ height: `${pctOtras}%` }}
                      />
                      <div
                        className="w-full bg-red-400"
                        style={{ height: `${pctRechazadas}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {dia.dia}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Leyenda */}
            <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: "rgb(var(--primary-base))" }}
                />
                <span className="text-xs text-muted-foreground">Aprobadas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-yellow-400" />
                <span className="text-xs text-muted-foreground">Pendientes / Reagendadas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-red-400" />
                <span className="text-xs text-muted-foreground">Rechazadas</span>
              </div>
            </div>
          </div>

          {/* Panel lateral — resumen de estados */}
          <div className="card-base space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[rgb(var(--primary-dark))]">
                Resumen de Estado
              </p>
              <CalendarClock className="h-5 w-5 text-[rgb(var(--primary-base))]" />
            </div>

            {[
              {
                label: "Aprobadas",
                count: kpis.aprobadas,
                total: kpis.total,
                colorClass: "bg-[rgb(var(--primary-base))]",
              },
              {
                label: "Pendientes",
                count: kpis.pendientes,
                total: kpis.total,
                colorClass: "bg-yellow-400",
              },
              {
                label: "Rechazadas",
                count: kpis.rechazadas,
                total: kpis.total,
                colorClass: "bg-red-400",
              },
              {
                label: "Reagendadas",
                count: kpis.reagendadas,
                total: kpis.total,
                colorClass: "bg-gray-300",
              },
            ].map((item) => {
              const pct =
                item.total > 0
                  ? Math.round((item.count / item.total) * 100)
                  : 0
              return (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[rgb(var(--base-color))]">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-[rgb(var(--primary-dark))]">
                      {item.count}{" "}
                      <span className="text-xs font-normal text-muted-foreground">
                        ({pct}%)
                      </span>
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.colorClass}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}

            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span>
                  {kpis.total} solicitudes en total registradas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Actividad Reciente ────────────────────── */}
        <div className="card-base">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-[rgb(var(--primary-dark))]">
              Actividad Reciente
            </p>
            <span className="text-xs text-muted-foreground">
              Últimas {recientes.length} actualizaciones
            </span>
          </div>

          <div className="table-wrapper">
            <table className="table-base">
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell">Folio</th>
                  <th className="table-header-cell">Empresa</th>
                  <th className="table-header-cell">Representante</th>
                  <th className="table-header-cell">Fecha Visita</th>
                  <th className="table-header-cell">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recientes.map((v) => {
                  const { fecha, hora } = formatFecha(v.fechaHora)
                  return (
                    <tr key={v.id} className="table-body-row">
                      <td className="table-body-cell">
                        <span className="font-mono text-xs text-[rgb(var(--primary-base))] font-semibold">
                          {v.folio}
                        </span>
                      </td>
                      <td className="table-body-cell">
                        <span className="datatable-provider-name">{v.empresa}</span>
                      </td>
                      <td className="table-body-cell">
                        <span className="text-sm text-[rgb(var(--base-color))]">
                          {v.representante}
                        </span>
                      </td>
                      <td className="table-body-cell">
                        <span className="datatable-date">{fecha}</span>
                        <span className="datatable-time block">{hora}</span>
                      </td>
                      <td className="table-body-cell">{estadoBadge(v.estado)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
