"use client";
import { members, type Member } from "@/lib/mock-data";

const avatarColors = [
  { bg: "#e8f5ee", fg: "#1a6b3c" },
  { bg: "#EEEDFE", fg: "#534AB7" },
  { bg: "#1a1a1a", fg: "#ffffff" },
  { bg: "#FAEEDA", fg: "#854F0B" },
  { bg: "#FAECE7", fg: "#993C1D" },
  { bg: "#e6f2f2", fg: "#0F6B6B" },
];

function statusConfig(status: Member["status"]) {
  if (status === "completed")  return { label: "مكتمل",  bg: "#e8f5ee",   fg: "#1a6b3c" };
  if (status === "in_progress") return { label: "جارٍ",   bg: "#FAEEDA",   fg: "#854F0B" };
  return                               { label: "جديد",   bg: "#EEEDFE",   fg: "#534AB7" };
}

function scoreColor(score: number) {
  if (score === 0)   return "var(--fg-subtle)";
  if (score >= 70)   return "var(--primary)";
  if (score >= 55)   return "var(--warning)";
  return "var(--danger)";
}

function initials(name: string) {
  const parts = name.replace(/^[دمأ]\. /, "").split(" ");
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export function TeamTable({ data = members }: { data?: Member[] }) {
  return (
    <div className="space-y-0.5">
      <div className="grid grid-cols-12 gap-2 px-3 pb-2 border-b border-[var(--border)]">
        {["العضو", "الإيميل", "الدرجة", "الدروس", "آخر نشاط", "الحالة"].map((h, i) => (
          <div key={h} className={`text-eyebrow ${i === 0 ? "col-span-3" : i === 1 ? "col-span-3" : "col-span-1"}`}>{h}</div>
        ))}
        <div className="col-span-2" />
      </div>
      {data.map((m, i) => {
        const av = avatarColors[i % avatarColors.length];
        const st = statusConfig(m.status);
        return (
          <div key={m.id} className="grid grid-cols-12 gap-2 items-center px-3 py-2.5 rounded-xl hover:bg-[var(--surface-2)] transition-colors group pressable" style={{ animationDelay: `${i * .05}s` }}>
            <div className="col-span-3 flex items-center gap-2.5">
              <div className="size-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ring-2 ring-[var(--border)] group-hover:ring-[var(--primary)] transition-all"
                style={{ background: av.bg, color: av.fg }}>
                {initials(m.name)}
              </div>
              <span className="text-sm font-medium text-[var(--fg)] truncate">{m.name}</span>
            </div>
            <div className="col-span-3 text-[11px] text-[var(--fg-subtle)] truncate">{m.email}</div>
            <div className="col-span-1 text-sm font-semibold text-center" style={{ color: scoreColor(m.score) }}>
              {m.score === 0 ? "—" : `${m.score}%`}
            </div>
            <div className="col-span-1 text-sm text-center text-[var(--fg-muted)]">{m.lessons}</div>
            <div className="col-span-2 text-[11px] text-[var(--fg-subtle)] text-center">{m.lastActive}</div>
            <div className="col-span-2 flex justify-center">
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: st.bg, color: st.fg }}>
                {st.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
