"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { weeklyActivity } from "@/lib/mock-data";

export function WeeklyActivityChart({ height = 260 }: { height?: number }) {
  return (
    <div className="chart-animate" style={{ width: "100%", height }} dir="rtl">
      <ResponsiveContainer>
        <BarChart data={weeklyActivity} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="day" reversed tick={{ fill: "var(--fg-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis orientation="right" tick={{ fill: "var(--fg-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip cursor={{ fill: "var(--surface-2)" }} contentStyle={{ direction: "rtl" }} formatter={(v: number) => [`${v} درس`, ""]} />
          <Bar dataKey="lessons" radius={[6, 6, 0, 0]} fill="var(--primary)" animationDuration={800} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
