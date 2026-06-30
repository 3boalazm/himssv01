"use client";
import { weeklyActivity } from "@/lib/mock-data";

export function WeeklyActivityChart() {
  const max = Math.max(...weeklyActivity.map(d => d.sessions));
  const avg = Math.round(weeklyActivity.reduce((a, d) => a + d.sessions, 0) / weeklyActivity.length);
  return (
    <div>
      <div className="flex items-end gap-2 h-[90px] mb-2">
        {weeklyActivity.map((d, i) => {
          const h = Math.round((d.sessions / max) * 100);
          const isMax = d.sessions === max;
          return (
            <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
              {isMax && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)]">{d.sessions}</span>
              )}
              <div className="flex-1 w-full flex items-end">
                <div
                  className="w-full rounded-t-lg pressable animate-bar-grow"
                  style={{
                    height: `${h}%`,
                    background: isMax ? "var(--primary)" : d.sessions > avg ? "color-mix(in oklab, var(--primary) 50%, var(--surface-2))" : "var(--surface-2)",
                    border: "0.5px solid " + (isMax ? "var(--primary)" : "var(--border)"),
                    animationDelay: `${i * .06}s`,
                    transformOrigin: "bottom center",
                  }}
                />
              </div>
              <span className="text-[10px] text-[var(--fg-subtle)]">{d.day.slice(0, 2)}</span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-[var(--fg-subtle)] mt-1">
        <span>متوسط: {avg} جلسة/يوم</span>
        <span>هذا الأسبوع</span>
      </div>
    </div>
  );
}
