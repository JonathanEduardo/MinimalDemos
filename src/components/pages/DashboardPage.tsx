import * as React from "react"
import {
  LayoutDashboard,
  CheckCircle2,
  XCircle,
  Clock,
  CalendarClock,
  CalendarDays,
  Users,
} from "lucide-react"
import { AppLayout } from "@/components/templates"
import { StatCard, Badge } from "@/components/atoms"
import { useVisitas, type Visita, type DiaConteo } from "@/store/visitas"

/* ========================================
   DASHBOARD PAGE
   KPIs + Gráficas + Actividad reciente
   ======================================== */

const MESES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
]

// Semanas domingo→sábado, colores únicos por día de semana
const DIA_CORTOS  = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"]
const DIA_NOMBRES = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
const DIA_COLORS  = ["#9ca3af","#ef4444","#4f46e5","#10b981","#0d9488","#3b82f6","#f59e0b"]

// Agrupa días del mes en semanas Dom-Sáb, comenzando en el primer día del mes
function agruparEnSemanasCalendario(dias: DiaConteo[]) {
  if (dias.length === 0) return []
  const semanas: { label: string; dias: (DiaConteo | null)[] }[] = []
  let semActual: (DiaConteo | null)[] | null = null
  let semNum = 0

  for (const dia of dias) {
    const dow = new Date(dia.fecha + "T12:00:00").getDay() // 0=Dom…6=Sáb
    if (semActual === null || dow === 0) {
      semActual = Array(7).fill(null)
      semNum++
      semanas.push({ label: `Sem ${semNum}`, dias: semActual })
    }
    semActual[dow] = dia
  }
  return semanas
}

function calcYTicks(maxVal: number): number[] {
  if (maxVal === 0) return [0]
  const step = maxVal <= 4 ? 1 : maxVal <= 10 ? 2 : 5
  const top  = Math.ceil(maxVal / step) * step
  const ticks: number[] = []
  for (let i = 0; i <= top; i += step) ticks.push(i)
  return ticks
}

const COLOR_YEAR_NORMAL = "#6898d8"
const COLOR_YEAR_MAX    = "#1a3a6e"
const COLOR_YEAR_VACIO  = "#e8eef5"
const CHART_H = 100

// Mini chart de una semana
function MiniSemChart({
  label, dias, topTick, ticks,
}: {
  label:    string
  dias:     (DiaConteo | null)[]
  topTick:  number
  ticks:    number[]
}) {
  const presentDias = dias.map((d, dow) => ({ dia: d, dow })).filter(x => x.dia !== null)

  return (
    <div className="flex-1 min-w-[110px]">
      <p className="text-sm font-semibold text-[rgb(var(--primary-dark))] mb-2">{label}</p>
      <div className="flex gap-1">
        {/* Y-axis */}
        <div className="relative shrink-0" style={{ width: 16, height: CHART_H }}>
          {[...ticks].reverse().map(tick => (
            <span
              key={tick}
              className="absolute right-0 text-[9px] text-gray-400 leading-none"
              style={{ top: `${((topTick - tick) / topTick) * CHART_H - 4}px` }}
            >
              {tick}
            </span>
          ))}
        </div>
        {/* Chart + labels */}
        <div className="flex-1">
          {/* Barras + grid */}
          <div className="relative" style={{ height: CHART_H }}>
            {ticks.filter(t => t > 0).map(tick => (
              <div
                key={tick}
                className="absolute left-0 right-0 border-t border-dashed border-gray-200 pointer-events-none"
                style={{ bottom: `${(tick / topTick) * CHART_H}px` }}
              />
            ))}
            <div className="absolute inset-0 flex items-end gap-1">
              {presentDias.map(({ dia, dow }) => {
                const barH = dia!.total > 0
                  ? Math.max((dia!.total / topTick) * CHART_H * 0.9, 4)
                  : 0
                return (
                  <div
                    key={dow}
                    className="flex-1 flex flex-col items-center justify-end h-full"
                    title={`${DIA_NOMBRES[dow]}: ${dia!.total} visita${dia!.total !== 1 ? "s" : ""}`}
                  >
                    {dia!.total > 0 && (
                      <span className="text-[9px] font-semibold mb-0.5" style={{ color: DIA_COLORS[dow] }}>
                        {dia!.total}
                      </span>
                    )}
                    {barH > 0 && (
                      <div
                        className="w-full rounded-t-md transition-all duration-500"
                        style={{ height: barH, backgroundColor: DIA_COLORS[dow] }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          {/* Day labels */}
          <div className="flex gap-1 mt-1">
            {presentDias.map(({ dow }) => (
              <div key={dow} className="flex-1 text-center">
                <span className="text-[9px] text-muted-foreground">{DIA_CORTOS[dow]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function estadoBadge(estado: Visita["estado"]) {
  const map = {
    aprobado:   { variant: "success",   label: "Aprobado" },
    rechazado:  { variant: "danger",    label: "Rechazado" },
    pendiente:  { variant: "warning",   label: "Pendiente" },
    reagendado: { variant: "secondary", label: "Reagendado" },
  } as const
  const { variant, label } = map[estado]
  return <Badge variant={variant}>{label}</Badge>
}

function formatFecha(fechaHora: string) {
  const [fecha, hora] = fechaHora.split(" ")
  return { fecha, hora: hora ?? "" }
}

function FilterSelect({
  value, onChange, children,
}: { value: number; onChange: (v: number) => void; children: React.ReactNode }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white text-[rgb(var(--base-color))] focus:outline-none focus:ring-1 focus:ring-[rgb(var(--primary-base))] cursor-pointer"
    >
      {children}
    </select>
  )
}

export function DashboardPage() {
  const { visitas, obtenerKPIs, obtenerDiasPorMes, obtenerMesesPorAño } = useVisitas()
  const kpis = obtenerKPIs()

  const [mesSem,   setMesSem]   = React.useState(3)
  const [añoSem,   setAñoSem]   = React.useState(2026)
  const [añoAnual, setAñoAnual] = React.useState(2026)

  const diasMes  = obtenerDiasPorMes(añoSem, mesSem)
  const semanas  = React.useMemo(() => agruparEnSemanasCalendario(diasMes), [diasMes])
  const mesesAño = obtenerMesesPorAño(añoAnual)
  const maxMes   = Math.max(...mesesAño.map(m => m.total), 1)

  const maxDiaGlobal = React.useMemo(() => Math.max(...diasMes.map(d => d.total), 0), [diasMes])
  const yTicks  = React.useMemo(() => calcYTicks(maxDiaGlobal), [maxDiaGlobal])
  const topTick = yTicks[yTicks.length - 1] || 1

  const recientes = React.useMemo(
    () =>
      [...visitas]
        .sort((a, b) => new Date(b.fechaActualizacion).getTime() - new Date(a.fechaActualizacion).getTime())
        .slice(0, 6),
    [visitas]
  )

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* ── Encabezado ─────────────────────────────── */}
        <div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--primary-dark))]">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Métricas en tiempo real de control de accesos institucionales.
          </p>
        </div>

        {/* ── KPI Cards ──────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total Visitas"  value={kpis.total}      variant="primary" icon={<LayoutDashboard className="h-5 w-5 text-[rgb(var(--primary-base))]" />} />
          <StatCard label="Aprobadas"      value={kpis.aprobadas}  variant="success" icon={<CheckCircle2 className="h-5 w-5 text-green-600" />} />
          <StatCard label="Rechazadas"     value={kpis.rechazadas} variant="danger"  icon={<XCircle className="h-5 w-5 text-red-500" />} />
          <StatCard label="Pendientes"     value={kpis.pendientes} variant="warning" icon={<Clock className="h-5 w-5 text-yellow-500" />} />
        </div>

        {/* ── Gráfica semanal (full width) ───────────── */}
        <div className="card-base space-y-5">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <p className="font-semibold text-[rgb(var(--primary-dark))]">Visitas por Semana</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {MESES[mesSem]} {añoSem} — {semanas.length} semana{semanas.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FilterSelect value={mesSem} onChange={setMesSem}>
                  {MESES.map((m, i) => <option key={i} value={i}>{m}</option>)}
                </FilterSelect>
                <FilterSelect value={añoSem} onChange={setAñoSem}>
                  <option value={2026}>2026</option>
                </FilterSelect>
              </div>
            </div>

            {/* Mini charts por semana */}
            <div className="overflow-x-auto">
              <div className="flex gap-5 pb-1 divide-x divide-gray-100" style={{ minWidth: semanas.length * 130 }}>
                {semanas.map((sem, i) => (
                  <div key={sem.label} className={i > 0 ? "pl-5 flex-1" : "flex-1"}>
                    <MiniSemChart
                      label={sem.label}
                      dias={sem.dias}
                      topTick={topTick}
                      ticks={yTicks}
                    />
                  </div>
                ))}
                {semanas.length === 0 && (
                  <p className="text-sm text-muted-foreground py-8 w-full text-center">Sin datos para este mes</p>
                )}
              </div>
            </div>

            {/* Leyenda días */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 border-t border-gray-100">
              {DIA_NOMBRES.map((nombre, dow) => (
                <div key={dow} className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: DIA_COLORS[dow] }} />
                  <span className="text-xs text-muted-foreground font-medium">{nombre}</span>
                </div>
              ))}
            </div>
          </div>

        {/* ── Año + Resumen de Estado ─────────────────── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Gráfica Anual */}
          <div className="card-base space-y-4">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <p className="font-semibold text-[rgb(var(--primary-dark))]">Visitas por Año</p>
              <p className="text-xs text-muted-foreground mt-0.5">Total de visitas mes a mes</p>
            </div>
            <FilterSelect value={añoAnual} onChange={setAñoAnual}>
              <option value={2026}>2026</option>
            </FilterSelect>
          </div>
          <div className="flex items-end gap-2 h-40 pt-2">
            {mesesAño.map((m) => {
              const pct   = maxMes > 0 ? (m.total / maxMes) * 100 : 0
              const color = m.esMaximo ? COLOR_YEAR_MAX : COLOR_YEAR_NORMAL
              const barH  = Math.max(pct * 0.85, m.total > 0 ? 8 : 3)
              return (
                <div key={m.mes} className="flex flex-col flex-1 items-center gap-1 justify-end h-full">
                  {m.total > 0 && (
                    <span className="text-[10px] font-semibold" style={{ color }}>{m.total}</span>
                  )}
                  <div
                    className="w-full rounded-t-md transition-all duration-500"
                    style={{ height: `${barH}%`, backgroundColor: m.total > 0 ? color : COLOR_YEAR_VACIO }}
                    title={`${m.label}: ${m.total} visita${m.total !== 1 ? "s" : ""}`}
                  />
                  <span className="text-[10px] text-muted-foreground">{m.label}</span>
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: COLOR_YEAR_NORMAL }} />
              <span className="text-xs text-muted-foreground">Visitas mensuales</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: COLOR_YEAR_MAX }} />
              <span className="text-xs text-muted-foreground">Mes con más visitas</span>
            </div>
            <CalendarDays className="ml-auto h-4 w-4 text-muted-foreground/40" />
          </div>
        </div>

          {/* Panel — Resumen de Estado */}
          <div className="card-base space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[rgb(var(--primary-dark))]">Resumen de Estado</p>
              <CalendarClock className="h-5 w-5 text-[rgb(var(--primary-base))]" />
            </div>
            {[
              { label: "Aprobadas",   count: kpis.aprobadas,   colorClass: "bg-[rgb(var(--primary-base))]" },
              { label: "Pendientes",  count: kpis.pendientes,  colorClass: "bg-yellow-400" },
              { label: "Rechazadas",  count: kpis.rechazadas,  colorClass: "bg-red-400" },
              { label: "Reagendadas", count: kpis.reagendadas, colorClass: "bg-gray-300" },
            ].map((item) => {
              const pct = kpis.total > 0 ? Math.round((item.count / kpis.total) * 100) : 0
              return (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[rgb(var(--base-color))]">{item.label}</span>
                    <span className="text-sm font-semibold text-[rgb(var(--primary-dark))]">
                      {item.count}{" "}
                      <span className="text-xs font-normal text-muted-foreground">({pct}%)</span>
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
                <span>{kpis.total} solicitudes en total registradas</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Actividad Reciente ────────────────────── */}
        <div className="card-base">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-[rgb(var(--primary-dark))]">Actividad Reciente</p>
            <span className="text-xs text-muted-foreground">Últimas {recientes.length} actualizaciones</span>
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
                        <span className="font-mono text-xs text-[rgb(var(--primary-base))] font-semibold">{v.folio}</span>
                      </td>
                      <td className="table-body-cell">
                        <span className="datatable-provider-name">{v.empresa}</span>
                      </td>
                      <td className="table-body-cell">
                        <span className="text-sm text-[rgb(var(--base-color))]">{v.representante}</span>
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
