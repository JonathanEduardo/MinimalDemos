import * as React from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  BookOpen,
  ChevronRight,
  LayoutDashboard,
  QrCode,
  Settings2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
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
import logoFull from "@/assets/logos/logo_full.png"
import logoSm from "@/assets/logos/logo_sm.png"


// ── Tipos ─────────────────────────────────────────────────────────────────────

type CatalogItem = {
  title: string
  icon?: LucideIcon
  href?: string
  items?: CatalogItem[]
}

// ── Datos de menú ──────────────────────────────────────────────────────────────

const menuPrincipal: CatalogItem[] = [
  { title: "Dashboard",     icon: LayoutDashboard, href: "/" },
  { title: "Permisos",      icon: ShieldCheck,     href: "/admin" },
  { title: "QR Check",      icon: QrCode,          href: "/guardia" },
  { title: "Componentes", icon: Settings2,       href: "/components" },
]

const catalogos: CatalogItem[] = []

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
    const iconClassName = "h-5 w-5"
    const menuInteractiveTextClass = "hover:text-white active:text-white data-[active=true]:text-white data-[open=true]:hover:text-white"
    const hasChildren = Boolean(item.items?.length) && level < 3
    const isOpen = hasChildren && expandedPaths.has(path)
    const isExactActive = item.href ? pathname === item.href : false
    const isAncestorActive = hasChildren && isDescendantActive(item)

    if (level === 1) {
      return (
        <SidebarMenuItem key={path}>
          {item.href && !hasChildren ? (
            <SidebarMenuButton
              render={<NavLink to={item.href} end />} 
              isActive={isExactActive}
              className={menuInteractiveTextClass}
            >
              <Icon className={iconClassName} />
              <span>{item.title}</span>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton
              isActive={isExactActive || isAncestorActive}
              onClick={() => togglePath(path)}
              className={menuInteractiveTextClass}
            >
              <Icon className={iconClassName} />
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
            render={<NavLink to={item.href} end />}
            isActive={isExactActive}
            className={menuInteractiveTextClass}
          >
            <Icon className={iconClassName} />
            <span>{item.title}</span>
          </SidebarMenuSubButton>
        ) : (
          <SidebarMenuSubButton
            render={<button type="button" onClick={hasChildren ? () => togglePath(path) : undefined} />}
            isActive={isExactActive}
            className={menuInteractiveTextClass}
          >
            <Icon className={iconClassName} />
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
    <Sidebar collapsible="icon">
      <SidebarHeader className="my-5 group-data-[collapsible=icon]:my-2 group-data-[collapsible=icon]:py-1">
        <div className="flex items-center justify-center px-2">
          <img
            src={logoFull}
            alt="Bene Access"
            className="h-14 md:h-10 w-auto object-contain group-data-[collapsible=icon]:hidden"
          />
          <img
            src={logoSm}
            alt="Bene Access"
            className="hidden h-10 w-10 object-contain group-data-[collapsible=icon]:block"
          />
        </div>
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

        {catalogos.length > 0 && (
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
        )}
      </SidebarContent>
    </Sidebar>
  )
}
