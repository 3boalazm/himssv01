"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserPlus } from "lucide-react"

const members = [
  { name: "سارة المطيري",    initials: "سم", score: 84, lessons: 12, lastActive: "اليوم",       status: "مكتمل",  statusStyle: "bg-success/15 text-success" },
  { name: "خالد العتيبي",    initials: "خع", score: 71, lessons: 8,  lastActive: "أمس",          status: "مكتمل",  statusStyle: "bg-success/15 text-success" },
  { name: "نورة الحربي",     initials: "نح", score: 58, lessons: 3,  lastActive: "منذ 3 أيام",  status: "جارٍ",   statusStyle: "bg-warning/15 text-warning" },
  { name: "فيصل القحطاني",   initials: "فق", score: 0,  lessons: 0,  lastActive: "منذ أسبوع",   status: "جديد",   statusStyle: "bg-info/15 text-info" },
  { name: "ريم الشمري",      initials: "رش", score: 92, lessons: 18, lastActive: "اليوم",       status: "مكتمل",  statusStyle: "bg-success/15 text-success" },
  { name: "عبدالله الدوسري", initials: "عد", score: 38, lessons: 2,  lastActive: "منذ 5 أيام",  status: "جارٍ",   statusStyle: "bg-warning/15 text-warning" },
]

function scoreColor(s: number) {
  if (s === 0)  return "text-muted-foreground"
  if (s >= 70)  return "text-success"
  if (s >= 50)  return "text-warning"
  return "text-danger"
}

export function TeamCollaboration() {
  return (
    <div className="card-surface lift p-6 animate-fade-in" style={{ animationDelay: ".1s" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-eyebrow mb-1">الفريق</p>
          <h2 className="text-base font-semibold text-foreground">آخر نشاط الفريق</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="pressable flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-card text-xs text-foreground hover:border-primary/40 transition-colors shadow-card">
            <UserPlus className="w-3.5 h-3.5 text-primary" />
            دعوة أعضاء
          </button>
          <a href="/team" className="text-xs text-primary hover:underline">عرض الكل</a>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 px-3 pb-2 border-b border-border">
        {["العضو","الدرجة","الدروس","آخر نشاط","الحالة"].map((h,i) => (
          <div key={h} className={`text-eyebrow ${i===0?"col-span-4":i===4?"col-span-2 text-center":"col-span-2 text-center"}`}>{h}</div>
        ))}
      </div>

      <div className="stagger mt-1">
        {members.map((m) => (
          <div key={m.name}
            className="grid grid-cols-12 gap-2 items-center px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors duration-150 cursor-pointer group">
            <div className="col-span-4 flex items-center gap-2.5">
              <Avatar className="w-8 h-8 flex-shrink-0 ring-2 ring-border group-hover:ring-primary/30 transition-all duration-200">
                <AvatarFallback className="bg-primary/15 text-primary text-[10px] font-bold">
                  {m.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground truncate">{m.name}</span>
            </div>
            <div className={`col-span-2 text-center num text-sm font-semibold ${scoreColor(m.score)}`}>
              {m.score === 0 ? "—" : `${m.score}%`}
            </div>
            <div className="col-span-2 text-center text-sm text-muted-foreground num">{m.lessons}</div>
            <div className="col-span-2 text-center text-xs text-muted-foreground">{m.lastActive}</div>
            <div className="col-span-2 flex justify-center">
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${m.statusStyle}`}>
                {m.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
