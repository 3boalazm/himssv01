"use client";
import { members } from "@/lib/mock-data";
import { arabicInitials, scoreColor, cn } from "@/lib/utils";
import { StatusPill } from "./status-pill";

const STATUS = {
  completed:   { tone: "success" as const, label: "مكتمل" },
  in_progress: { tone: "warning" as const, label: "جارٍ" },
  new:         { tone: "info" as const,    label: "جديد" },
};

export function TeamTable({ rows = members }: { rows?: typeof members }) {
  return (
    <div className="card-surface overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <h3 className="font-bold">أعضاء الفريق</h3>
        <a href="/org/members" className="text-xs text-[var(--primary)] font-medium hover:underline">عرض الكل ←</a>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-eyebrow border-b border-[var(--border)] bg-[var(--surface-2)]/40">
            <th className="text-right px-5 py-3 font-medium">العضو</th>
            <th className="text-right px-3 py-3 font-medium">الدرجة</th>
            <th className="text-right px-3 py-3 font-medium">الدروس</th>
            <th className="text-right px-3 py-3 font-medium">آخر نشاط</th>
            <th className="text-right px-5 py-3 font-medium">الحالة</th>
          </tr>
        </thead>
        <tbody className="stagger">
          {rows.map((m) => {
            const tone = scoreColor(m.score);
            return (
              <tr key={m.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-2)]/60 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] grid place-items-center text-xs font-bold">
                      {arabicInitials(m.name)}
                    </div>
                    <div className="leading-tight">
                      <div className="font-medium text-[var(--fg)]">{m.name}</div>
                      <div className="text-xs text-[var(--fg-subtle)]">{m.email}</div>
                    </div>
                  </div>
                </td>
                <td className={cn(
                  "px-3 py-3 num font-semibold",
                  tone === "success" && "text-[var(--success)]",
                  tone === "warning" && "text-[var(--warning)]",
                  tone === "danger"  && "text-[var(--danger)]",
                )}>{m.score > 0 ? `${m.score}%` : "—"}</td>
                <td className="px-3 py-3 num text-[var(--fg-muted)]">{m.lessons}</td>
                <td className="px-3 py-3 text-[var(--fg-muted)] text-xs">{m.lastActive}</td>
                <td className="px-5 py-3">
                  <StatusPill tone={STATUS[m.status].tone}>{STATUS[m.status].label}</StatusPill>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
