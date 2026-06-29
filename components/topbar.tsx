"use client";
import { Search, Bell, UserPlus } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Topbar({ title, onInvite }: { title: string; onInvite?: () => void }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[var(--bg)]/85 backdrop-blur border-b border-[var(--border)] px-6 flex items-center gap-4">
      <h1 className="text-lg font-bold flex-1">{title}</h1>

      <div className="relative w-72 max-w-[36vw] hidden md:block">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[var(--fg-subtle)]" />
        <input
          aria-label="بحث"
          placeholder="ابحث في المنصة..."
          className="w-full h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] pr-9 pl-3 text-sm placeholder:text-[var(--fg-subtle)] focus:border-[var(--primary)]"
        />
      </div>

      <button
        aria-label="الإشعارات"
        className="pressable relative size-9 grid place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
      >
        <Bell className="size-4" />
        <span className="absolute top-1.5 left-1.5 size-2 rounded-full bg-[var(--warning)] animate-pulse-ring" />
      </button>

      <ThemeToggle />

      <button
        onClick={onInvite}
        className="pressable inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-fg)] text-sm font-semibold shadow-primary-glow"
      >
        <UserPlus className="size-4" />
        دعوة أعضاء
      </button>
    </header>
  );
}
