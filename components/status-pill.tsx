import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "info" | "muted";

export function StatusPill({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  const map: Record<Tone, string> = {
    success: "bg-[var(--success-soft)] text-[var(--success)]",
    warning: "bg-[var(--warning-soft)] text-[var(--warning)]",
    danger:  "bg-[var(--danger-soft)] text-[var(--danger)]",
    info:    "bg-[var(--info-soft)] text-[var(--info)]",
    muted:   "bg-[var(--surface-2)] text-[var(--fg-muted)]",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full text-xs font-medium", map[tone])}>
      <span className={cn("size-1.5 rounded-full bg-current opacity-80")} />
      {children}
    </span>
  );
}
