"use client"

import { LayoutDashboard, Users, BarChart3, BookOpen, Building2, Mail, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم",        href: "/" },
  { icon: Users,           label: "أعضاء الفريق",       href: "/team" },
  { icon: BarChart3,       label: "التقارير",            href: "/analytics" },
  { icon: BookOpen,        label: "المسارات التعليمية",  href: "/tasks" },
]

const generalItems = [
  { icon: Building2, label: "إعدادات المؤسسة", href: "/settings", badge: null },
  { icon: Mail,      label: "الدعوات المعلقة", href: "/help",     badge: "3" },
  { icon: LogOut,    label: "تسجيل الخروج",    href: "/logout",   badge: null },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 right-0 w-56 bg-sidebar border-l border-sidebar-border h-screen overflow-y-auto hidden lg:flex flex-col shadow-card">
      {/* Brand */}
      <div className="flex items-center gap-3 p-5 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-primary animate-float">
          <span className="text-primary-foreground font-bold text-sm">H</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-sidebar-foreground truncate">مستشفى الملك فهد</p>
          <p className="text-[10px] text-muted-foreground">org_admin · 36 / 50 seat</p>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 p-3 space-y-5">
        <div>
          <p className="text-eyebrow px-2 mb-2">القائمة</p>
          <nav className="stagger space-y-0.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.label} href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 pressable",
                    isActive
                      ? "bg-primary/15 text-primary border-r-[3px] border-primary shadow-sm"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div>
          <p className="text-eyebrow px-2 mb-2">عام</p>
          <nav className="stagger space-y-0.5">
            {generalItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.label} href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 pressable",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-warning/20 text-warning text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Contract expiry */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="bg-warning/10 border border-warning/20 rounded-lg px-3 py-2">
          <p className="text-[10px] text-warning font-medium">العقد ينتهي: يونيو 2026</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">12 شهراً متبقية</p>
        </div>
      </div>
    </aside>
  )
}
