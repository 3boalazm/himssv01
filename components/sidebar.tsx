"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, BarChart3, BookOpen,
  Building2, Mail, GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/org/dashboard",    label: "لوحة التحكم",        icon: LayoutDashboard },
  { href: "/org/members",      label: "أعضاء الفريق",       icon: Users },
  { href: "/org/reports",      label: "التقارير",           icon: BarChart3 },
  { href: "/org/learning",     label: "المسارات التعليمية", icon: BookOpen },
];
const navBottom = [
  { href: "/org/settings",     label: "إعدادات المؤسسة",    icon: Building2 },
  { href: "/org/invites",      label: "الدعوات المعلقة",    icon: Mail, badge: 3 },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed top-0 right-0 h-screen w-[220px] bg-[var(--surface)] border-l border-[var(--border)] flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center gap-2 border-b border-[var(--border)]">
        <div className="animate-floaty size-9 rounded-xl bg-[var(--primary)] text-[var(--primary-fg)] grid place-items-center shadow-primary-glow">
          <GraduationCap className="size-5" />
        </div>
        <div className="leading-tight">
          <div className="font-bold text-[var(--fg)]">HLOS</div>
          <div className="text-[10px] text-[var(--fg-subtle)]">منصة التعلم الصحي</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 stagger overflow-y-auto">
        {nav.map((item) => <NavItem key={item.href} item={item} active={pathname === item.href} />)}
        <div className="my-3 mx-2 h-px bg-[var(--border)]" />
        {navBottom.map((item) => <NavItem key={item.href} item={item} active={pathname === item.href} />)}
      </nav>

      {/* Contract pill */}
      <div className="p-3">
        <div className="text-center text-xs px-3 py-2 rounded-full bg-[var(--warning-soft)] text-[var(--warning)] font-medium">
          العقد ينتهي: يونيو 2026
        </div>
      </div>
    </aside>
  );
}

function NavItem({ item, active }: { item: typeof nav[number] & { badge?: number }; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium pressable mb-0.5 transition-colors",
        active
          ? "bg-[var(--primary-soft)] text-[var(--primary)]"
          : "text-[var(--fg-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--fg)]"
      )}
    >
      {active && (
        <span className="absolute right-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-[var(--primary)]" />
      )}
      <Icon className="size-[18px] shrink-0" />
      <span className="flex-1 text-right">{item.label}</span>
      {item.badge && (
        <span className="num text-[10px] font-semibold size-5 grid place-items-center rounded-full bg-[var(--warning)] text-white">
          {item.badge}
        </span>
      )}
    </Link>
  );
}
