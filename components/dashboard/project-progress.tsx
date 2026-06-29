"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "مستخدمة", value: 36, color: "var(--primary)" },
  { name: "متاحة",   value: 14, color: "var(--border)" },
]

const teamStats = [
  { label: "أكملوا التقييم",      value: 24, colorClass: "bg-success" },
  { label: "نشطون هذا الأسبوع",  value: 20, colorClass: "bg-info" },
  { label: "لم يبدأوا",           value: 8,  colorClass: "bg-warning" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-popover border border-border px-2.5 py-2 rounded-lg text-xs shadow-pop animate-scale-in">
        <p className="text-foreground font-medium">{payload[0].name}: <span className="num font-bold">{payload[0].value}</span></p>
      </div>
    )
  }
  return null
}

export function ProjectProgress() {
  return (
    <div className="card-surface lift p-5 animate-fade-in" style={{ animationDelay: ".08s" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-eyebrow mb-1">المقاعد</p>
          <h2 className="text-base font-semibold text-foreground">استخدام المقاعد</h2>
        </div>
        <a href="/team" className="text-xs text-primary hover:underline transition-colors">دعوة أعضاء</a>
      </div>

      <div className="relative h-36 chart-animate">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={42} outerRadius={62}
              startAngle={90} endAngle={-270} dataKey="value" strokeWidth={0} paddingAngle={2}>
              {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="num text-2xl font-bold text-foreground">36/50</span>
          <span className="text-[10px] text-muted-foreground">مستخدم</span>
        </div>
      </div>

      <div className="space-y-2 mt-4 pt-4 border-t border-border stagger">
        {teamStats.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${s.colorClass}`} />
              <span className="text-muted-foreground">{s.label}</span>
            </div>
            <span className="num font-semibold text-foreground">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
