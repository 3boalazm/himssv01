"use client";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { KpiCard } from "@/components/kpi-card";
import { TeamTable } from "@/components/team-table";
import { QuickActions } from "@/components/quick-actions";
import { DomainBarChart } from "@/components/charts/domain-bar-chart";
import { SeatsDonut } from "@/components/charts/seats-donut";
import { InviteModal } from "@/components/invite-modal";
import { Users, CheckCircle2, TrendingUp, BookOpen, AlertTriangle, X } from "lucide-react";
import { seatsData } from "@/lib/mock-data";

export default function OrgDashboard() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Sidebar />
      <div className="mr-[220px]">
        <Topbar title="لوحة التحكم" onInvite={() => setInviteOpen(true)} />

        <main className="p-6 space-y-6">
          {alertVisible && (
            <div className="animate-slide-up flex items-start gap-3 p-4 rounded-xl border border-[var(--warning)]/30 bg-[var(--warning-soft)] text-[var(--warning)]">
              <AlertTriangle className="size-5 shrink-0 mt-0.5" />
              <div className="flex-1 text-sm font-medium">
                ٨ أعضاء لم يبدأوا التقييم — يُنصح بإرسال تذكير لضمان اكتمال التقييم خلال المدة المحددة.
              </div>
              <button onClick={() => setAlertVisible(false)} aria-label="إغلاق التنبيه" className="pressable p-1 rounded hover:bg-[var(--warning)]/10">
                <X className="size-4" />
              </button>
            </div>
          )}

          {/* KPIs */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 stagger">
            <KpiCard variant="primary" label="إجمالي الـ Seats" value={seatsData.used} suffix={`/${seatsData.total}`} progress={(seatsData.used/seatsData.total)*100} icon={<Users className="size-4" />} delta="٧٢٪ من السعة" deltaTone="muted" />
            <KpiCard label="أكملوا التقييم" value={24} icon={<CheckCircle2 className="size-4" />} delta="٦٧٪ من الفريق" deltaTone="warning" />
            <KpiCard label="متوسط الدرجة" value={71} suffix="%" icon={<TrendingUp className="size-4" />} delta="↑ ٦٪ تحسّن" deltaTone="success" />
            <KpiCard label="دروس مكتملة" value={148} icon={<BookOpen className="size-4" />} delta="↓ ١٢ عن الشهر السابق" deltaTone="danger" />
          </section>

          {/* Middle row */}
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 card-surface p-5 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">أداء الفريق حسب المجال</h3>
                <span className="text-eyebrow">نسبة الإتقان</span>
              </div>
              <DomainBarChart />
              <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center gap-4 text-xs text-[var(--fg-muted)]">
                <Legend color="var(--success)" label="ممتاز (≥70%)" />
                <Legend color="var(--warning)" label="متوسط (50-69%)" />
                <Legend color="var(--danger)" label="منخفض (<50%)" />
              </div>
            </div>

            <div className="lg:col-span-2 card-surface p-5 animate-slide-up" style={{ animationDelay: "80ms" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">المقاعد المستخدمة</h3>
                <span className="text-eyebrow">الترخيص</span>
              </div>
              <SeatsDonut />
              <div className="mt-4 space-y-2.5">
                <SeatRow color="var(--primary)" label="مستخدمة" value={36} />
                <SeatRow color="var(--surface-2)" label="متاحة"   value={14} ring />
                <SeatRow color="var(--warning)" label="مدعوّون (معلّق)" value={3} />
              </div>
            </div>
          </section>

          {/* Bottom row */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 animate-slide-up"><TeamTable /></div>
            <div className="animate-slide-up" style={{ animationDelay: "80ms" }}><QuickActions /></div>
          </section>
        </main>
      </div>

      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-2 rounded-full" style={{ background: color }} />{label}
    </span>
  );
}

function SeatRow({ color, label, value, ring }: { color: string; label: string; value: number; ring?: boolean }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="size-2.5 rounded-full" style={ring ? { boxShadow: `inset 0 0 0 2px ${color}` } : { background: color }} />
      <span className="flex-1 text-[var(--fg-muted)]">{label}</span>
      <span className="num font-semibold">{value}</span>
    </div>
  );
}
