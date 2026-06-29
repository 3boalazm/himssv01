import type { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { MobileNav } from "./mobile-nav"

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:mr-56 min-h-screen">
        <main className="px-4 py-5 lg:px-6">
          <header className="flex items-center gap-3 mb-5 animate-slide-in-up">
            <MobileNav />
            <div>
              <h1 className="text-xl font-bold text-foreground leading-tight">{title}</h1>
              {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  )
}
