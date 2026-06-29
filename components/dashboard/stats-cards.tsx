"use client"

import { Users, ClipboardCheck, BarChart3, BookOpen } from "lucide-react"
import { useState } from "react"

const stats = [
  {
    title: "إجمالي الـ Seats",
    value: "36",
    subtitle: "من 50 مقعداً متاحاً",
    delta: "72% مستخدم",
    deltaColor: "text-muted-foreground",
    progress: 72,
    icon: Users,
    primary: true,
  },
  {
    title: "أكملوا التقييم",
    value: "24",
    subtitle: "12 لم يبدأوا بعد",
    delta: "67% من الفريق",
    deltaColor: "text-warning",
    icon: ClipboardCheck,
    primary: false,
  },
  {
    title: "متوسط درجة الفريق",
    value: "71%",
    subtitle: "أعلى من الشهر الماضي",
    delta: "↑ 6% تحسّن",
    deltaColor: "text-success",
    icon: BarChart3,
    primary: false,
  },
  {
    title: "دروس مكتملة",
    value: "148",
    subtitle: "هذا الشهر",
    delta: "↓ 12 عن الشهر الماضي",
    deltaColor: "text-danger",
    icon: BookOpen,
    primary: false,
  },
]

export function StatsCards() {
  return (
    <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <article
            key={stat.title}
            className={`lift pressable rounded-xl border p-5 cursor-pointer ${
              stat.primary
                ? "bg-primary border-primary/20 shadow-primary"
                : "bg-card border-border shadow-card"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <p className={`text-eyebrow ${stat.primary ? "text-primary-foreground/70" : ""}`}>
                {stat.title}
              </p>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                stat.primary ? "bg-white/20" : "bg-primary/10"
              }`}>
                <Icon className={`w-4 h-4 ${stat.primary ? "text-white" : "text-primary"}`} />
              </div>
            </div>

            <p className={`num text-3xl font-bold mb-2 ${stat.primary ? "text-white" : "text-foreground"}`}>
              {stat.value}
            </p>

            {stat.progress && (
              <div className="w-full h-1.5 rounded-full mb-2 bg-white/20">
                <div
                  className="h-full rounded-full bg-white transition-all duration-700"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            )}

            <p className={`text-xs mb-1 ${stat.primary ? "text-white/60" : "text-muted-foreground"}`}>
              {stat.subtitle}
            </p>
            <p className={`text-xs font-medium ${stat.primary ? "text-white/90" : stat.deltaColor}`}>
              {stat.delta}
            </p>
          </article>
        )
      })}
    </div>
  )
}
