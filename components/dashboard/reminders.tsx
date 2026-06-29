"use client"

import { Mail, Download, FileSpreadsheet, BookMarked, Bell } from "lucide-react"

const actions = [
  { icon: Mail,            label: "دعوة أعضاء جدد",     badge: null, color: "text-primary", bg: "bg-primary/10" },
  { icon: Download,        label: "تصدير تقرير PDF",     badge: null, color: "text-info",    bg: "bg-info/10" },
  { icon: FileSpreadsheet, label: "تصدير بيانات Excel",  badge: null, color: "text-success", bg: "bg-success/10" },
  { icon: BookMarked,      label: "تعيين مسار تعليمي",   badge: null, color: "text-accent-foreground", bg: "bg-accent" },
  { icon: Bell,            label: "تذكير غير النشطين",   badge: "8",  color: "text-warning", bg: "bg-warning/10" },
]

export function Reminders() {
  return (
    <div className="card-surface lift p-5 animate-fade-in" style={{ animationDelay: ".15s" }}>
      <p className="text-eyebrow mb-1">أدوات</p>
      <h2 className="text-base font-semibold text-foreground mb-4">إجراءات سريعة</h2>
      <div className="stagger space-y-1.5">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button key={action.label}
              className="pressable w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border hover:bg-secondary hover:border-primary/25 transition-all text-right group">
              <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${action.bg} transition-transform group-hover:scale-110 duration-200`}>
                <Icon className={`w-3.5 h-3.5 ${action.color}`} />
              </div>
              <span className="text-sm text-foreground flex-1">{action.label}</span>
              {action.badge && (
                <span className="bg-warning/20 text-warning text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {action.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
