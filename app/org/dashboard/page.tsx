"use client";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { KpiCard } from "@/components/kpi-card";
import { TeamTable } from "@/components/team-table";
import { QuickActions } from "@/components/quick-actions";
import { DomainBarChart } from "@/components/charts/domain-bar-chart";
import { SeatsDonut } from "@/components/charts/seats-donut";
import { WeeklyActivityChart } from "@/components/charts/weekly-activity";
import { InviteModal } from "@/components/invite-modal";
import { Users, CheckCircle2, TrendingUp, BookOpen, AlertTriangle, X, Calendar } from "lucide-react";
import { kpiStats, members } from "@/lib/mock-data";

export default function OrgDashboard() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const pending = members.filter(m => m.status === "new").length;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Sidebar />
      <div className="lg:mr-[220px]">
        <Topbar title="لوحة التحكم" onInvite={() => setInviteOpen(true)} />

        <main className="p-4 lg:p-6 space-y-5">

          {alertVisible && (
            <div className="animate-slide-up flex items-center gap-3 p-3.5 rounded-xl border bg-[var(--warning-soft)] border-[var(--warning)] text-[var(--warning)]">
              <AlertTriangle className="size-4 flex-shrink-0" />
              <p className="flex-1 text-sm font-medium">{pending} أعضاء لم يبدأوا التقييم بعد</p>
              <button onClick={() => setAlertVisible(false)} aria-label="إغلاق" className="pressable p-1 rounded-lg hover:bg-[var(--warning)]/10">
                <X className="size-4" />
              </button>
            </div>
          )}

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
            <KpiCard variant="primary"  label="إجمالي الـ Seats"  value={kpiStats.seatsUsed}        suffix={`/${kpiStats.seatsTotal}`} progress={(kpiStats.seatsUsed/kpiStats.seatsTotal)*100} icon={<Users className="size-4"/>}        delta="72% من السعة" />
            <KpiCard variant="peach"    label="أكملوا التقييم"   value={kpiStats.completedAssess}                                                                                                  icon={<CheckCircle2 className="size-4"/>}  delta="67% من الفريق" />
            <KpiCard variant="lavender" label="متوسط الدرجة"     value={kpiStats.avgScore}          suffix="%"                                                                                     icon={<TrendingUp className="size-4"/>}    delta="↑ 6% تحسّن" />
            <KpiCard variant="cream"    label="دروس مكتملة"      value={kpiStats.lessonsCompleted}                                                                                                 icon={<BookOpen className="size-4"/>}      delta="↓ 12 عن الشهر" />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 card-surface p-5 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-cooper font-bold text-[var(--fg)]">نشاط الفريق الأسبوعي</h3>
                <span className="text-[11px] bg-[var(--primary-soft)] text-[var(--primary)] font-semibold px-3 py-1 rounded-full">آخر 7 أيام</span>
              </div>
              <WeeklyActivityChart />
            </div>

            <div className="card-surface p-5 animate-slide-up" style={{ animationDelay: ".08s" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-cooper font-bold text-[var(--fg)]">التقييم القادم</h3>
              </div>
              <div className="rounded-xl p-4 mb-3" style={{ background: "#111" }}>
                <p className="text-[10px] text-white/50 mb-1">الاختبار القادم</p>
                <p className="font-cooper text-base font-bold text-white leading-snug mb-1">الأمن والخصوصية (PDPL)</p>
                <p className="text-[11px] text-white/50 mb-3 flex items-center gap-1"><Calendar className="size-3" />الأربعاء 2:00 م — 4:00 م</p>
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white text-sm font-medium pressable" style={{ background: "rgba(255,255,255,.15)", border: "0.5px solid rgba(255,255,255,.2)" }}>
                  بدء التقييم
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[{ val: "28", lbl: "ساعة تعلّم" }, { val: "18", lbl: "درس اليوم" }, { val: "24", lbl: "أكملوا" }, { val: "4", lbl: "لم يبدأوا" }].map(s => (
                  <div key={s.lbl} className="text-center p-3 rounded-xl bg-[var(--surface-2)]">
                    <p className="font-cooper font-bold text-lg text-[var(--fg)]">{s.val}</p>
                    <p className="text-[10px] text-[var(--fg-subtle)]">{s.lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="card-surface p-5 animate-slide-up" style={{ animationDelay: ".05s" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-cooper font-bold text-[var(--fg)]">أداء المجالات</h3>
                <span className="text-eyebrow">نسبة الإتقان</span>
              </div>
              <DomainBarChart />
            </div>

            <div className="card-surface p-5 animate-slide-up" style={{ animationDelay: ".10s" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-cooper font-bold text-[var(--fg)]">استخدام الـ Seats</h3>
                <a href="/org/members" className="text-[11px] text-[var(--primary)] hover:underline">دعوة أعضاء</a>
              </div>
              <SeatsDonut />
              <div className="mt-4 p-3 rounded-xl" style={{ background: "var(--teal)", }}>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span style={{ color: "rgba(255,255,255,.7)" }}>72% مستخدم</span>
                  <span className="font-semibold" style={{ color: "#fff" }}>14 seat متاح</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,.2)" }}>
                  <div className="h-full rounded-full animate-bar-grow" style={{ width: "72%", background: "#fff" }} />
                </div>
              </div>
            </div>

            <div className="card-surface p-5 animate-slide-up" style={{ animationDelay: ".15s" }}>
              <h3 className="font-cooper font-bold text-[var(--fg)] mb-4">إجراءات سريعة</h3>
              <QuickActions onInvite={() => setInviteOpen(true)} />
            </div>
          </section>

          <section className="card-surface p-5 animate-slide-up" style={{ animationDelay: ".12s" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-cooper font-bold text-[var(--fg)]">آخر نشاط الفريق</h3>
              <a href="/org/members" className="text-[11px] text-[var(--primary)] hover:underline">عرض الكل</a>
            </div>
            <TeamTable data={members.slice(0, 4)} />
          </section>

        </main>
      </div>
      {inviteOpen && <InviteModal onClose={() => setInviteOpen(false)} />}
    </div>
  );
}
