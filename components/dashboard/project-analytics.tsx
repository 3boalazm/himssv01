"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const domainData = [
  { domain: "نظم المعلومات",    score: 78, full: "نظم المعلومات الصحية" },
  { domain: "التشغيل والحوكمة", score: 65, full: "التشغيل والحوكمة" },
  { domain: "التوافقية",         score: 54, full: "التوافقية والمعايير" },
  { domain: "التحليلات",         score: 42, full: "التحليلات والذكاء" },
  { domain: "القيادة",           score: 69, full: "القيادة والتحول الرقمي" },
]

function getColor(score: number) {
  if (score >= 70) return "var(--success)"
  if (score >= 50) return "var(--warning)"
  return "var(--danger)"
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0].payload
    return (
      <div className="bg-popover border border-border px-3 py-2.5 rounded-lg text-xs shadow-pop animate-scale-in">
        <p className="font-semibold text-foreground mb-1">{d.full}</p>
        <p className="font-bold text-lg num" style={{ color: getColor(d.score) }}>{d.score}%</p>
      </div>
    )
  }
  return null
}

export function ProjectAnalytics() {
  const [hovered, setHovered] = useState<number | null>(null)
  const avg = Math.round(domainData.reduce((a, d) => a + d.score, 0) / domainData.length)

  return (
    <div className="card-surface lift p-6 animate-fade-in">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-eyebrow mb-1">أداء المجالات</p>
          <h2 className="text-base font-semibold text-foreground">أداء الفريق حسب المجال</h2>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block bg-success" />≥70%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block bg-warning" />50-69%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block bg-danger" />&lt;50%
          </span>
        </div>
      </div>

      <div className="h-52 chart-animate">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={domainData} layout="vertical" margin={{ top: 0, right: 48, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="domain" axisLine={false} tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} width={115} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.3 }} />
            <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={20}
              onMouseEnter={(_, i) => setHovered(i)}
              onMouseLeave={() => setHovered(null)}>
              {domainData.map((entry, i) => (
                <Cell key={i} fill={getColor(entry.score)}
                  opacity={hovered !== null && hovered !== i ? 0.5 : 1}
                  style={{ filter: hovered === i ? "brightness(1.15) drop-shadow(0 2px 6px rgba(0,0,0,.3))" : "none",
                           transition: "opacity .2s, filter .2s" }} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-4 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          متوسط الفريق: <span className="num font-bold text-foreground">{avg}%</span>
        </p>
        <a href="/analytics" className="text-xs text-primary hover:underline transition-colors">
          تفاصيل كاملة ←
        </a>
      </div>
    </div>
  )
}
