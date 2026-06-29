"use client";
import { Mail, FileDown, FileSpreadsheet, BookOpen, BellRing } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { label: "دعوة أعضاء جدد",       icon: Mail,            tone: "primary" },
  { label: "تصدير تقرير PDF",      icon: FileDown,        tone: "info" },
  { label: "تصدير بيانات Excel",   icon: FileSpreadsheet, tone: "success" },
  { label: "تعيين مسار تعليمي",    icon: BookOpen,        tone: "purple" },
  { label: "تذكير غير النشطين",    icon: BellRing,        tone: "warning", badge: 8 },
] as const;

const TONE = {
  primary: { bg: "bg-[var(--primary-soft)]",  fg: "text-[var(--primary)]" },
  info:    { bg: "bg-[var(--info-soft)]",     fg: "text-[var(--info)]" },
  success: { bg: "bg-[var(--success-soft)]",  fg: "text-[var(--success)]" },
  purple:  { bg: "bg-[var(--purple-soft)]",   fg: "text-[var(--purple)]" },
  warning: { bg: "bg-[var(--warning-soft)]",  fg: "text-[var(--warning)]" },
} as const;

export function QuickActions() {
  return (
    <div className="card-surface">
      <div className="px-5 py-4 border-b border-[var(--border)]">
        <h3 className="font-bold">إجراءات سريعة</h3>
      </div>
      <div className="p-3 stagger">
        {actions.map((a) => {
          const Icon = a.icon;
          const t = TONE[a.tone];
          return (
            <button
              key={a.label}
              className="pressable w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-2)] text-right text-sm font-medium"
            >
              <div className={cn("size-9 rounded-lg grid place-items-center shrink-0", t.bg, t.fg)}>
                <Icon className="size-4" />
              </div>
              <span className="flex-1">{a.label}</span>
              {"badge" in a && a.badge && (
                <span className="num text-[10px] font-semibold size-5 grid place-items-center rounded-full bg-[var(--warning)] text-white">
                  {a.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
