"use client";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { DomainBarChart } from "@/components/charts/domain-bar-chart";
import { WeeklyActivityChart } from "@/components/charts/weekly-activity";
import { FileDown, FileSpreadsheet, AlertCircle, TrendingUp, Users, Award, Loader2 } from "lucide-react";
import { kpiStats, gapAnalysis } from "@/lib/mock-data";

const TABS = [
  { id: "overview", label: "نظرة عامة" },
  { id: "domain",   label: "حسب المجال" },
  { id: "gaps",     label: "الثغرات" },
] as const;

const severityConfig = {
  high:   { label: "عالي",    bg: "var(--danger-soft)",  fg: "var(--danger)" },
  medium: { label: "متوسط",   bg: "var(--warning-soft)", fg: "var(--warning)" },
  low:    { label: "منخفض",   bg: "var(--primary-soft)", fg: "var(--primary)" },
};

export default function ReportsPage() {
  const [tab, setTab] = useState<typeof TABS[number]["id"]>("overview");
  const [exporting, setExporting] = useState<null | "pdf" | "xlsx">(null);

  const handleExport = (type: "pdf" | "xlsx") => {
    setExporting(type);
    setTimeout(() => setExporting(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Sidebar />
      <div className="lg:mr-[220px]">
        <Topbar title="التقارير والتحليلات" />

        <main className="p-4 lg:p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 p-1 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} className="pressable px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={tab === t.id ? { background: "var(--surface)", color: "var(--fg)", boxShadow: "var(--shadow-sm)" } : { color: "var(--fg-muted)" }}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {(["pdf", "xlsx"] as const).map(type => (
                <button key={type} onClick={() => handleExport(type)} disabled={!!exporting}
                  className="pressable flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--fg-muted)] hover:bg-[var(--surface-2)] transition-all">
                  {exporting === type ? <Loader2 className="size-4 animate-spin" /> : type === "pdf" ? <FileDown className="size-4" /> : <FileSpreadsheet className="size-4" />}
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {tab === "overview" && (
            <>
              <div className="grid grid-cols-3 gap-4 stagger">
                {[
                  { label: "متوسط الدرجة الكلية", val: `${kpiStats.avgScore}%`, icon: Award,      color: "var(--primary)" },
                  { label: "معدل إتمام التقييم",  val: "67%",                  icon: TrendingUp,  color: "var(--teal)"    },
                  { label: "إجمالي الأعضاء",      val: kpiStats.totalMembers,   icon: Users,       color: "var(--purple)"  },
                ].map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="card-surface p-5 flex items-center gap-4">
                      <div className="size-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.color + "20", color: s.color }}>
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-eyebrow mb-1">{s.label}</p>
                        <p className="font-cooper text-2xl font-bold text-[var(--fg)]">{s.val}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="card-surface p-5">
                  <h3 className="font-cooper font-bold text-[var(--fg)] mb-4">أداء الفريق حسب المجال</h3>
                  <DomainBarChart />
                </div>
                <div className="card-surface p-5">
                  <h3 className="font-cooper font-bold text-[var(--fg)] mb-4">نشاط الفريق الأسبوعي</h3>
                  <WeeklyActivityChart />
                </div>
              </div>
            </>
          )}

          {tab === "domain" && (
            <div className="card-surface p-5">
              <h3 className="font-cooper font-bold text-[var(--fg)] mb-6">تحليل تفصيلي لكل مجال</h3>
              <DomainBarChart />
            </div>
          )}

          {tab === "gaps" && (
            <div className="card-surface p-5">
              <h3 className="font-cooper font-bold text-[var(--fg)] mb-4">الثغرات المعرفية — تحتاج اهتماماً</h3>
              <div className="space-y-3 stagger">
                {gapAnalysis.map((g, i) => {
                  const sv = severityConfig[g.severity as keyof typeof severityConfig];
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-2)] transition-colors">
                      <AlertCircle className="size-5 flex-shrink-0" style={{ color: sv.fg }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--fg)] truncate">{g.domain}</p>
                        <p className="text-[11px] text-[var(--fg-subtle)] mt-0.5">{g.affectedCount} عضو متأثر</p>
                      </div>
                      <span className="text-[11px] font-semibold px-3 py-1 rounded-full flex-shrink-0" style={{ background: sv.bg, color: sv.fg }}>
                        {sv.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
