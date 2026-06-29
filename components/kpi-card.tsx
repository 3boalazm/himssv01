"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CountUp } from "./count-up";

type Variant = "primary" | "default";
type DeltaTone = "success" | "warning" | "danger" | "muted";

export function KpiCard({
  label, value, suffix = "", progress, delta, deltaTone = "muted", icon, variant = "default",
}: {
  label: string;
  value: number;
  suffix?: string;
  progress?: number;
  delta?: string;
  deltaTone?: DeltaTone;
  icon?: ReactNode;
  variant?: Variant;
}) {
  const isPrimary = variant === "primary";
  return (
    <div
      className={cn(
        "lift lift-hover relative overflow-hidden p-5 rounded-xl border",
        isPrimary
          ? "bg-[var(--primary)] text-[var(--primary-fg)] border-transparent shadow-primary-glow"
          : "card-surface"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("text-eyebrow", isPrimary && "text-white/75")}>{label}</div>
        {icon && (
          <div className={cn(
            "size-9 rounded-lg grid place-items-center",
            isPrimary ? "bg-white/15 text-white" : "bg-[var(--primary-soft)] text-[var(--primary)]"
          )}>{icon}</div>
        )}
      </div>

      <div className={cn("text-display num", isPrimary && "text-white")}>
        <CountUp to={value} suffix={suffix} />
      </div>

      {progress !== undefined && (
        <div className={cn("mt-3 h-1.5 rounded-full overflow-hidden", isPrimary ? "bg-white/20" : "bg-[var(--surface-2)]")}>
          <div
            className={cn("h-full rounded-full", isPrimary ? "bg-white" : "bg-[var(--primary)]")}
            style={{ width: `${progress}%`, transition: "width 800ms cubic-bezier(.2,.7,.2,1)" }}
          />
        </div>
      )}

      {delta && (
        <div className={cn(
          "mt-3 text-xs font-medium",
          deltaTone === "success" && "text-[var(--success)]",
          deltaTone === "warning" && "text-[var(--warning)]",
          deltaTone === "danger"  && "text-[var(--danger)]",
          deltaTone === "muted"   && (isPrimary ? "text-white/80" : "text-[var(--fg-muted)]"),
        )}>{delta}</div>
      )}
    </div>
  );
}
