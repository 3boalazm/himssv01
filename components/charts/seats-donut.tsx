"use client";
import { seatsData } from "@/lib/mock-data";

export function SeatsDonut() {
  const { used, total } = seatsData;
  const pct = Math.round((used / total) * 100);
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[110px] h-[110px]">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="13" />
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--teal)" strokeWidth="13"
            strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray .8s cubic-bezier(.2,.7,.2,1)" }} />
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--primary-soft)" strokeWidth="13"
            strokeDasharray={`${circ - dash - 4} ${dash + 4}`}
            strokeDashoffset={-(dash + 2)} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-cooper text-xl font-bold text-[var(--fg)]">{used}/{total}</span>
          <span className="text-[10px] text-[var(--fg-subtle)]">مستخدم</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 w-full">
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--fg-muted)]">
          <span className="size-2 rounded-full bg-[var(--teal)] flex-shrink-0" />مستخدمة
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--fg-muted)]">
          <span className="size-2 rounded-full bg-[var(--primary-soft)] border border-[var(--border)] flex-shrink-0" />متاحة ({total - used})
        </div>
      </div>
    </div>
  );
}
