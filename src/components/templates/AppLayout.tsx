import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/organisms/AppSidebar"
import { AppHeaderbar } from "@/components/organisms/AppHeaderbar"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider style={{ "--sidebar-width-icon": "4rem" } as React.CSSProperties}>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen">
        <AppHeaderbar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
