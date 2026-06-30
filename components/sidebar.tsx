"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BarChart3, BookOpen, Building2, Mail, GraduationCap, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORG } from "@/lib/mock-data";

const nav = [
  { href: "/org/dashboard", label: "لوحة التحكم",        icon: LayoutDashboard },
  { href: "/org/members",   label: "أعضاء الفريق",       icon: Users },
  { href: "/org/reports",   label: "التقارير",            icon: BarChart3 },
  { href: "/org/learning",  label: "المسارات التعليمية",  icon: BookOpen },
];
const navBottom = [
  { href: "/org/settings",  label: "الإعدادات",           icon: Settings, badge: null },
  { href: "/org/invites",   label: "الدعوات المعلقة",     icon: Mail,     badge: 3    },
];

function NavItem({ href, label, icon: Icon, badge, active }: { href: string; label: string; icon: React.ElementType; badge?: number | null; active: boolean }) {
  return (
    <Link href={href} className={cn(
      "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium pressable mb-1 transition-all duration-200",
      active
        ? "bg-[var(--primary-soft)] text-[var(--primary)] border-r-[3px] border-[var(--primary)]"
        : "text-[var(--fg-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--fg)]"
    )}>
      <Icon className="size-4 flex-shrink-0" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--warning-soft)] text-[var(--warning)]">{badge}</span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed top-0 right-0 h-screen w-[220px] bg-[var(--surface)] border-l border-[var(--border)] flex flex-col z-40 shadow-[var(--shadow-sm)]">
      <div className="h-16 px-5 flex items-center gap-3 border-b border-[var(--border)]">
        <div className="animate-floaty size-9 rounded-xl bg-[var(--primary)] text-[var(--primary-fg)] grid place-items-center shadow-primary-glow flex-shrink-0">
          <GraduationCap className="size-5" />
        </div>
        <div className="leading-tight min-w-0">
          <div className="font-cooper font-bold text-[var(--fg)] text-sm">HLOS</div>
          <div className="text-[10px] text-[var(--fg-subtle)] truncate">{ORG.name}</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-eyebrow px-3 mb-2">القائمة</p>
        {nav.map(item => <NavItem key={item.href} {...item} badge={null} active={pathname === item.href} />)}
        <div className="my-3 mx-2 h-px bg-[var(--border)]" />
        <p className="text-eyebrow px-3 mb-2">عام</p>
        {navBottom.map(item => <NavItem key={item.href} {...item} active={pathname === item.href} />)}
        <Link href="/logout" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--fg-muted)] hover:bg-[var(--danger-soft)] hover:text-[var(--danger)] transition-all duration-200 pressable mt-1">
          <LogOut className="size-4" />تسجيل الخروج
        </Link>
      </nav>

      <div className="p-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--primary-soft)]">
          <div className="size-7 rounded-full bg-[var(--primary)] text-[var(--primary-fg)] grid place-items-center text-[10px] font-bold flex-shrink-0">
            {ORG.adminInitials}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-[var(--fg)] truncate">{ORG.adminName}</div>
            <div className="text-[10px] text-[var(--fg-subtle)]">org_admin</div>
          </div>
        </div>
        <div className="mt-2 text-center text-[10px] px-3 py-1.5 rounded-full bg-[var(--warning-soft)] text-[var(--warning)] font-medium">
          العقد ينتهي: {ORG.contractEndLabel}
        </div>
      </div>
    </aside>
  );
}
