"use client"

import { Bell, UserPlus, Search, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "./mobile-nav"
import { useState } from "react"

export function Header() {
  const [showInvite, setShowInvite] = useState(false)
  const [emails, setEmails] = useState<string[]>(["s.ali@kfh.sa"])
  const [input, setInput] = useState("")
  const [role, setRole] = useState<"member"|"manager">("member")

  function addEmail(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault()
      setEmails(prev => [...prev, input.trim()])
      setInput("")
    }
  }

  return (
    <>
      <header className="flex items-center justify-between gap-4 mb-5 animate-slide-in-up">
        <div className="flex items-center gap-3">
          <MobileNav />
          <div>
            <h1 className="text-xl font-bold text-foreground leading-tight">لوحة التحكم</h1>
            <p className="text-xs text-muted-foreground">مستشفى الملك فهد · العقد حتى يونيو 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="pressable h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all shadow-card">
            <Search className="w-4 h-4" />
          </button>

          <button className="pressable relative h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all shadow-card">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-warning rounded-full animate-pulse-ring" />
          </button>

          <ThemeToggle />

          <button
            onClick={() => setShowInvite(true)}
            className="pressable animate-pulse-ring flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium shadow-primary hover:bg-primary-hover transition-all"
          >
            <UserPlus className="w-4 h-4" />
            دعوة أعضاء
          </button>

          <div className="flex items-center gap-2 pr-3 border-r border-border">
            <Avatar className="w-8 h-8 ring-2 ring-primary/20">
              <AvatarFallback className="bg-primary/15 text-primary text-xs font-bold">م.ع</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Alert banner */}
      <div className="flex items-center justify-between bg-warning/10 border border-warning/25 rounded-xl px-4 py-2.5 mb-5 animate-slide-in-up" style={{ animationDelay: ".05s" }}>
        <p className="text-sm text-warning font-medium">
          ⚠️ <span className="font-bold">8 أعضاء</span> لم يبدأوا التقييم بعد
        </p>
        <button className="pressable h-7 px-3 rounded-lg bg-warning text-black text-xs font-semibold hover:opacity-90 transition-opacity">
          إرسال تذكير
        </button>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}>
          <div className="card-surface shadow-pop w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-base font-semibold text-foreground">دعوة أعضاء إلى مستشفى الملك فهد</h3>
              <button onClick={() => setShowInvite(false)}
                className="pressable w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <label className="text-eyebrow block mb-2">البريد الإلكتروني</label>
                <div className="flex flex-wrap gap-2 bg-secondary border border-input rounded-lg p-2.5 min-h-[44px] focus-within:ring-2 focus-within:ring-ring transition-shadow">
                  {emails.map((e) => (
                    <span key={e} className="flex items-center gap-1.5 bg-primary/15 text-primary text-xs px-2.5 py-1 rounded-full font-medium">
                      {e}
                      <button onClick={() => setEmails(prev => prev.filter(x => x !== e))}
                        className="opacity-60 hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={addEmail}
                    className="bg-transparent text-sm text-foreground outline-none flex-1 min-w-[140px] placeholder:text-muted-foreground"
                    placeholder="أضف بريد إلكتروني ثم Enter..." />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5">14 مقعد متاح · اضغط Enter لإضافة آخر</p>
              </div>

              <div>
                <label className="text-eyebrow block mb-2">الدور</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "member",  label: "عضو",  desc: "يتعلم ويكمل التقييمات" },
                    { value: "manager", label: "مدير", desc: "يرى تقارير فريقه" },
                  ].map((r) => (
                    <button key={r.value}
                      onClick={() => setRole(r.value as any)}
                      className={`pressable text-right p-3 rounded-lg border transition-all ${
                        role === r.value
                          ? "border-primary bg-primary/10 shadow-primary"
                          : "border-border hover:border-primary/40"
                      }`}>
                      <p className={`text-sm font-semibold ${role === r.value ? "text-primary" : "text-foreground"}`}>
                        {r.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{r.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-border bg-secondary/40 rounded-b-xl">
              <p className="text-[11px] text-muted-foreground">سيصل بريد الدعوة خلال دقائق</p>
              <div className="flex gap-2">
                <button onClick={() => setShowInvite(false)}
                  className="pressable h-8 px-3 rounded-lg border border-border text-xs text-foreground hover:bg-secondary transition-colors">
                  إلغاء
                </button>
                <button className="pressable h-8 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-primary hover:bg-primary-hover transition-all">
                  إرسال الدعوة ({emails.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
