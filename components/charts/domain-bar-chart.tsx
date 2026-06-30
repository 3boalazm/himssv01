"use client";
import { domainPerformance } from "@/lib/mock-data";

function scoreColor(score: number) {
  if (score >= 70) return "var(--primary)";
  if (score >= 55) return "var(--warning)";
  return "var(--danger)";
}
function scoreBg(score: number) {
  if (score >= 70) return "var(--primary-soft)";
  if (score >= 55) return "var(--warning-soft)";
  return "var(--danger-soft)";
}

export function DomainBarChart() {
  return (
    <div className="space-y-3">
      {domainPerformance.map((d, i) => (
        <div key={d.domain} className="flex items-center gap-3" style={{ animationDelay: `${i * .07}s` }}>
          <p className="text-xs text-[var(--fg-muted)] w-[170px] flex-shrink-0 text-right truncate">{d.domain}</p>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
            <div
              className="h-full rounded-full animate-bar-grow"
              style={{ width: `${d.score}%`, background: scoreColor(d.score), transformOrigin: "right center", animationDelay: `${i * .07 + .1}s` }}
            />
          </div>
          <span className="text-xs font-semibold w-10 text-right flex-shrink-0" style={{ color: scoreColor(d.score) }}>
            {d.score}%
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: scoreBg(d.score), color: scoreColor(d.score) }}>
            {d.score >= 70 ? "ممتاز" : d.score >= 55 ? "متوسط" : "يحتاج تحسين"}
          </span>
        </div>
      ))}
    </div>
  );
}
