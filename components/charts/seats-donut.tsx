"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { seatsData } from "@/lib/mock-data";

export function SeatsDonut() {
  const data = [
    { name: "مستخدمة", value: seatsData.used,                   color: "var(--primary)" },
    { name: "متاحة",   value: seatsData.total - seatsData.used, color: "var(--surface-2)" },
  ];
  return (
    <div className="relative" style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data} dataKey="value" cx="50%" cy="50%"
            innerRadius={70} outerRadius={100} stroke="none"
            startAngle={90} endAngle={-270}
            animationDuration={900}
          >
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center">
          <div className="text-display num">{seatsData.used}<span className="text-[var(--fg-muted)]">/{seatsData.total}</span></div>
          <div className="text-xs text-[var(--fg-muted)] mt-1">مستخدم</div>
        </div>
      </div>
    </div>
  );
}
