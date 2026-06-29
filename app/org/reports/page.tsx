"use client";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { DomainBarChart } from "@/components/charts/domain-bar-chart";
import { WeeklyActivityChart } from "@/components/charts/weekly-activity";
import { KpiCard } from "@/components/kpi-card";
import { FileDown, FileSpreadsheet, AlertCircle, TrendingUp, Users, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "نظرة عامة" },
  { id: "domain",   label: "حسب المجال" },
  { id: "member",   label: "حسب العضو" },
  { id: "gaps",     label: "الثغرات" },
] as const;

const gaps = [
  { domain: "التحليلات والذكاء الاصطناعي", severity: "high",   members: 14 },
  { domain: "التوافقية والمعايير (HL7/FHIR)", severity: "medium", members: 9 },
  { domain: "أمن المعلومات الصحية", severity: "medium", members: 7 },
  { domain: "إدارة التغيير الرقمي", severity: "low", members: 3 },
];

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
      <div className="mr-[220px]">
        <Topbar title="التقارير والتحليلات" />

        <main className="p-6 space-y-6">
          {/* Tabs + export */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="card-surface p-1 inline-flex gap-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "pressable h-8 px-4 rounded-md text-xs font-medium transition-colors",
                    tab === t.id ? "bg-[var(--primary)] text-[var(--primary-fg)]" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  )}
                >{t.label}</button>
              ))}
            </div>
            <div className="flex-1" />
            <button onClick={() => handleExport("pdf")} disabled={exporting !== null} className="pressable inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm font-medium hover:bg-[var(--surface-2)] disabled:opacity-60">
              <FileDown className="size-4" /> {exporting === "pdf" ? "جارٍ التصدير..." : "تصدير PDF"}
            </button>
            <button onClick={() => handleExport("xlsx")} disabled={exporting !== null} className="pressable inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm font-medium hover:bg-[var(--surface-2)] disabled:opacity-60">
              <FileSpreadsheet className="size-4" /> {exporting === "xlsx" ? "جارٍ التصدير..." : "تصدير Excel"}
            </button>
          </div>

          {/* Top stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
            <KpiCard label="معدّل الإنجاز" value={67} suffix="%" icon={<TrendingUp className="size-4" />} delta="↑ ٤٪ هذا الشهر" deltaTone="success" />
            <KpiCard label="أعلى مجال أداءً" value={78} suffix="%" icon={<Award className="size-4" />} delta="نظم المعلومات الصحية" deltaTone="muted" />
            <KpiCard label="أعضاء نشطون" value={28} icon={<Users className="size-4" />} delta="من أصل ٣٦" deltaTone="muted" />
          </section>

          {/* Domain chart */}
          <section className="card-surface p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">الأداء حسب المجال</h3>
              <span className="text-eyebrow">آخر ٣٠ يوماً</span>
            </div>
            <DomainBarChart height={340} />
          </section>

          {/* Weekly activity */}
          <section className="card-surface p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">النشاط الأسبوعي</h3>
              <span className="text-eyebrow">دروس مكتملة / يوم</span>
            </div>
            <WeeklyActivityChart />
          </section>

          {/* Gaps */}
          <section className="card-surface animate-slide-up">
            <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2"><AlertCircle className="size-4 text-[var(--warning)]" /> الثغرات المعرفية</h3>
              <span className="text-eyebrow">حسب الأولوية</span>
            </div>
            <ul className="divide-y divide-[var(--border)]">
              {gaps.map((g) => (
                <li key={g.domain} className="px-5 py-3.5 flex items-center gap-3 hover:bg-[var(--surface-2)]/60 transition-colors">
                  <SeverityDot s={g.severity as "high"|"medium"|"low"} />
                  <div className="flex-1 font-medium text-sm">{g.domain}</div>
                  <span className="num text-xs text-[var(--fg-muted)]">{g.members} عضو متأثر</span>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

function SeverityDot({ s }: { s: "high"|"medium"|"low" }) {
  const map = {
    high:   { bg: "bg-[var(--danger-soft)]",  fg: "text-[var(--danger)]",  label: "مرتفعة" },
    medium: { bg: "bg-[var(--warning-soft)]", fg: "text-[var(--warning)]", label: "متوسطة" },
    low:    { bg: "bg-[var(--success-soft)]", fg: "text-[var(--success)]", label: "منخفضة" },
  }[s];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full text-[11px] font-semibold", map.bg, map.fg)}>
      <span className="size-1.5 rounded-full bg-current" />{map.label}
    </span>
  );
}
