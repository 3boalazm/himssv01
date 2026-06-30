"use client";
import { Mail, Download, FileSpreadsheet, BookOpen, Bell } from "lucide-react";

const actions = [
  { icon: Mail,             label: "دعوة أعضاء جدد",     badge: null, color: "var(--primary)", bg: "var(--primary-soft)",  onClick: "invite" },
  { icon: Download,         label: "تصدير تقرير PDF",     badge: null, color: "var(--teal)",    bg: "var(--teal-soft)"     },
  { icon: FileSpreadsheet,  label: "تصدير بيانات Excel",  badge: null, color: "var(--purple)",  bg: "var(--purple-soft)"   },
  { icon: BookOpen,         label: "تعيين مسار تعليمي",   badge: null, color: "var(--amber)",   bg: "var(--amber-soft)"    },
  { icon: Bell,             label: "تذكير غير النشطين",   badge: 4,    color: "var(--warning)", bg: "var(--warning-soft)"  },
];

export function QuickActions({ onInvite }: { onInvite?: () => void }) {
  return (
    <div className="space-y-2 stagger">
      {actions.map((a) => {
        const Icon = a.icon;
        return (
          <button
            key={a.label}
            onClick={a.onClick === "invite" ? onInvite : undefined}
            className="pressable w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-2)] hover:border-[var(--border-strong)] transition-all text-right group"
          >
            <div className="size-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-200" style={{ background: a.bg, color: a.color }}>
              <Icon className="size-4" />
            </div>
            <span className="text-sm text-[var(--fg)] flex-1">{a.label}</span>
            {a.badge && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "var(--warning-soft)", color: "var(--warning)" }}>
                {a.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
