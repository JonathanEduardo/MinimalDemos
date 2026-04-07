import * as React from "react"
import { CalendarDays, ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface DataTableColumn<TData> {
  header: React.ReactNode
  accessorKey?: keyof TData
  cell?: (row: TData) => React.ReactNode
  className?: string
  headerClassName?: string
  searchable?: boolean
}

export interface DataTableProps<TData extends object> {
  columns: DataTableColumn<TData>[]
  data: TData[]
  filterPlaceholder?: string
  pageSize?: number
  emptyMessage?: string
  className?: string
  statusLabel?: string
  dateRangeLabel?: string
}

function normalizeValue(value: unknown): string {
  if (value === null || value === undefined) return ""
  return String(value).toLowerCase()
}

export function DataTable<TData extends object>({
  columns,
  data,
  filterPlaceholder = "Buscar...",
  pageSize = 5,
  emptyMessage = "Sin resultados",
  className,
  statusLabel = "All Status",
  dateRangeLabel = "Oct 12 - Oct 19, 2023",
}: DataTableProps<TData>) {
  const [query, setQuery] = React.useState("")
  const [page, setPage] = React.useState(1)

  const searchableColumns = React.useMemo(
    () => columns.filter((column) => column.searchable !== false && column.accessorKey),
    [columns]
  )

  const filteredRows = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) return data

    return data.filter((row) => {
      return searchableColumns.some((column) => {
        if (!column.accessorKey) return false
        const value = row[column.accessorKey]
        return normalizeValue(value).includes(normalizedQuery)
      })
    })
  }, [data, query, searchableColumns])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))

  React.useEffect(() => {
    setPage(1)
  }, [query, pageSize, data.length])

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const start = (page - 1) * pageSize
  const end = start + pageSize
  const rows = filteredRows.slice(start, end)

  const firstRow = filteredRows.length ? start + 1 : 0
  const lastRow = Math.min(start + rows.length, filteredRows.length)

  return (
    <div className={cn("datatable-root", className)}>
      <div className="datatable-toolbar">
        <div className="datatable-toolbar-grid">
          <div className="datatable-search-wrap">
            <Search className="datatable-search-icon" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={filterPlaceholder}
              className="datatable-search-input"
            />
          </div>

          <Button
            variant="outline"
            className="datatable-toolbar-btn justify-between"
            type="button"
          >
            <span>{statusLabel}</span>
            <ChevronRight className="h-4 w-4 rotate-90" />
          </Button>

          <Button
            variant="outline"
            className="datatable-toolbar-btn justify-start gap-2"
            type="button"
          >
            <CalendarDays className="h-4 w-4" />
            <span>{dateRangeLabel}</span>
          </Button>

          <Button
            variant="outline"
            className="datatable-toolbar-btn"
            type="button"
            aria-label="Configurar filtros"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="datatable-card">
        <Table className="text-sm">
          <TableHeader className="datatable-head-bg">
            <TableRow className="datatable-header-row">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={cn("datatable-head-cell", column.headerClassName)}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row, rowIndex) => {
                const rowId = (row as { id?: unknown }).id
                const rowKey =
                  typeof rowId === "string" || typeof rowId === "number"
                    ? String(rowId)
                    : `${start + rowIndex}`

                return (
                  <TableRow key={rowKey} className="datatable-row">
                    {columns.map((column, columnIndex) => {
                      const content = column.cell
                        ? column.cell(row)
                        : column.accessorKey
                          ? String(row[column.accessorKey] ?? "-")
                          : "-"

                      return (
                        <TableCell
                          key={`${rowKey}-${columnIndex}`}
                          className={cn("datatable-cell", column.className)}
                        >
                          {content}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="datatable-empty">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="datatable-footer">
        <span className="datatable-footer-count">
          Showing {firstRow}-{lastRow} of {filteredRows.length} requests
        </span>
        <div className="datatable-pagination">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page <= 1}
            aria-label="Pagina anterior"
            className="datatable-pagination-icon"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).slice(0, 5).map((pageItem) => (
            <Button
              key={pageItem}
              variant="ghost"
              size="sm"
              onClick={() => setPage(pageItem)}
              className={cn(
                "datatable-pagination-page",
                pageItem === page ? "datatable-pagination-page-active" : "datatable-pagination-page-inactive"
              )}
              aria-label={`Ir a pagina ${pageItem}`}
            >
              {pageItem}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page >= totalPages}
            aria-label="Pagina siguiente"
            className="datatable-pagination-icon"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
