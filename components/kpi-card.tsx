"use client";

type Tone = "primary" | "peach" | "lavender" | "cream";

const variants: Record<Tone, { bg: string; fg: string; border?: string; deltaBg: string; deltaFg: string }> = {
  primary:  { bg: "var(--kpi-green-bg)",    fg: "var(--kpi-green-fg)",    deltaBg: "rgba(255,255,255,.2)",       deltaFg: "#fff" },
  peach:    { bg: "var(--kpi-peach-bg)",    fg: "var(--kpi-peach-fg)",    border: "var(--kpi-peach-bd)",    deltaBg: "var(--kpi-peach-bd)",    deltaFg: "var(--coral)" },
  lavender: { bg: "var(--kpi-lavender-bg)", fg: "var(--kpi-lavender-fg)", border: "var(--kpi-lavender-bd)", deltaBg: "var(--kpi-lavender-bd)", deltaFg: "var(--purple)" },
  cream:    { bg: "var(--kpi-cream-bg)",    fg: "var(--kpi-cream-fg)",    border: "var(--kpi-cream-bd)",    deltaBg: "var(--kpi-cream-bd)",    deltaFg: "var(--amber)" },
};

type Props = {
  label: string;
  value: number | string;
  suffix?: string;
  delta?: string;
  icon?: React.ReactNode;
  progress?: number;
  variant?: Tone;
};

export function KpiCard({ label, value, suffix, delta, icon, progress, variant = "peach" }: Props) {
  const v = variants[variant];
  return (
    <div className="lift rounded-[var(--radius)] p-5 border" style={{
      background: v.bg,
      borderColor: v.border ?? v.bg,
      boxShadow: variant === "primary" ? "var(--shadow-primary)" : "var(--shadow-sm)",
    }}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-eyebrow" style={{ color: variant === "primary" ? "rgba(255,255,255,.65)" : "inherit" }}>{label}</p>
        <div className="size-8 rounded-full flex items-center justify-center pressable"
          style={{ background: variant === "primary" ? "rgba(255,255,255,.2)" : "rgba(255,255,255,.6)", border: "0.5px solid " + (v.border ?? "rgba(255,255,255,.3)"), color: v.fg }}>
          {icon}
        </div>
      </div>

      <p className="font-cooper text-3xl font-bold mb-2 leading-none" style={{ color: v.fg }}>
        {value}{suffix}
      </p>

      {progress !== undefined && (
        <div className="h-1.5 rounded-full mb-2 overflow-hidden" style={{ background: "rgba(255,255,255,.25)" }}>
          <div className="h-full rounded-full animate-bar-grow" style={{ width: `${progress}%`, background: variant === "primary" ? "#fff" : v.fg, transformOrigin: "right center" }} />
        </div>
      )}

      {delta && (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: v.deltaBg, color: v.deltaFg }}>
          {delta}
        </span>
      )}
    </div>
  );
}
