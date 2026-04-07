import * as React from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Ellipsis,
  KeyRound,
  Map,
  Plane,
  Settings2,
  ShieldCheck,
  UserCircle2,
  Users,
  type LucideIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ── Tipos ─────────────────────────────────────────────────────────────────────

type CatalogItem = {
  title: string
  icon?: LucideIcon
  href?: string
  items?: CatalogItem[]
}

// ── Datos de menú ──────────────────────────────────────────────────────────────

const menuPrincipal: CatalogItem[] = [
  { title: "Algo",        icon: Plane,     href: "/viajes" },
  { title: "Configuración", icon: Settings2, href: "/configuracion" },
  {
    title: "Más",
    icon: Ellipsis,
    items: [
      { title: "Almacenamiento", icon: BookOpen },
      { title: "Planes",         icon: BookOpen },
      {
        title: "Etiquetas",
        icon: BookOpen,
        items: [
          { title: "Etiquetas de viaje",   icon: BookOpen },
          { title: "Etiquetas de usuario", icon: BookOpen },
        ],
      },
    ],
  },
]

const catalogos: CatalogItem[] = [
  { title: "Usuarios",    icon: Users,       href: "/catalogs/users" },
  { title: "Permisos", icon: Map,         href: "/catalogs/airports" },
  { title: "Proveedores", icon: Plane,       href: "/catalogs/providers" },
  {
    title: "Accesos",
    icon: Ellipsis,
    items: [
      { title: "Roles",    icon: ShieldCheck, href: "/catalogs/roles" },
      { title: "Permisos", icon: KeyRound,    href: "/catalogs/permissions" },
      {
        title: "Más",
        icon: BookOpen,
        items: [
          { title: "Etiquetas de viaje",   icon: BookOpen },
          { title: "Etiquetas de usuario", icon: BookOpen },
        ],
      },
    ],
  },
]

// ── Componente ────────────────────────────────────────────────────────────────

export function AppSidebar() {
  const { pathname } = useLocation()
  const [expandedPaths, setExpandedPaths] = React.useState<Set<string>>(new Set())

  const togglePath = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  const isDescendantActive = React.useCallback(
    (item: CatalogItem): boolean => {
      if (item.href && pathname === item.href) return true
      return item.items?.some(isDescendantActive) ?? false
    },
    [pathname]
  )

  React.useEffect(() => {
    const autoExpand = (items: CatalogItem[], parentPath: string) => {
      for (const item of items) {
        const itemPath = `${parentPath}/${item.title}`
        if (item.items?.length) {
          if (item.items.some((child) => isDescendantActive(child))) {
            setExpandedPaths((prev) => new Set([...prev, itemPath]))
          }
          autoExpand(item.items, itemPath)
        }
      }
    }
    autoExpand(menuPrincipal, "principal")
    autoExpand(catalogos, "catalogos")
  }, [pathname, isDescendantActive])

  const renderNode = (item: CatalogItem, level = 1, path = item.title): React.ReactNode => {
    const Icon = item.icon ?? BookOpen
    const hasChildren = Boolean(item.items?.length) && level < 3
    const isOpen = hasChildren && expandedPaths.has(path)
    const isExactActive = item.href ? pathname === item.href : false
    const isAncestorActive = hasChildren && isDescendantActive(item)

    if (level === 1) {
      return (
        <SidebarMenuItem key={path}>
          {item.href && !hasChildren ? (
            <SidebarMenuButton
              render={<NavLink to={item.href} />}
              isActive={isExactActive}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton
              isActive={isExactActive || isAncestorActive}
              onClick={() => togglePath(path)}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
              {hasChildren && (
                <ChevronRight
                  className={`ml-auto h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
                />
              )}
            </SidebarMenuButton>
          )}

          {isOpen && (
            <SidebarMenuSub>
              {item.items?.map((child) =>
                renderNode(child, level + 1, `${path}/${child.title}`)
              )}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      )
    }

    return (
      <SidebarMenuSubItem key={path}>
        {item.href && !hasChildren ? (
          <SidebarMenuSubButton
            render={<NavLink to={item.href} />}
            isActive={isExactActive}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </SidebarMenuSubButton>
        ) : (
          <SidebarMenuSubButton
            render={<button type="button" onClick={hasChildren ? () => togglePath(path) : undefined} />}
            isActive={isExactActive}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
            {hasChildren && (
              <ChevronRight
                className={`ml-auto h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
              />
            )}
          </SidebarMenuSubButton>
        )}

        {isOpen && (
          <SidebarMenuSub>
            {item.items?.map((child) =>
              renderNode(child, level + 1, `${path}/${child.title}`)
            )}
          </SidebarMenuSub>
        )}
      </SidebarMenuSubItem>
    )
  }

  return (
    <Sidebar>
      <SidebarHeader className="my-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <UserCircle2 className="h-4 w-4" />
                <span>Bene Access</span>
                <ChevronDown className="ml-auto h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>Enterprise</DropdownMenuItem>
                <DropdownMenuItem>Beneficencia</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuPrincipal.map((item) =>
                renderNode(item, 1, `principal/${item.title}`)
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Catálogos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {catalogos.map((item) =>
                renderNode(item, 1, `catalogos/${item.title}`)
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <UserCircle2 className="h-4 w-4" />
                <span>Usuario</span>
                <ChevronUp className="ml-auto h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <p className="text-sm font-medium">Usuario</p>
                    <p className="text-xs text-muted-foreground font-normal">usuario@ejemplo.com</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Facturación</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
