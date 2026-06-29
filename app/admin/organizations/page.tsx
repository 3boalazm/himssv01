"use client";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { KpiCard } from "@/components/kpi-card";
import { StatusPill } from "@/components/status-pill";
import { Building2, Users, CreditCard, Clock, Plus, X } from "lucide-react";
import { organizations } from "@/lib/mock-data";

const STATUS = {
  active:   { tone: "success" as const, label: "نشط" },
  trial:    { tone: "warning" as const, label: "تجريبي" },
  expiring: { tone: "danger"  as const, label: "ينتهي قريباً" },
};

export default function OrganizationsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Sidebar />
      <div className="mr-[220px]">
        <Topbar title="المؤسسات" />

        <main className="p-6 space-y-6">
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
            <KpiCard label="المؤسسات" value={24} icon={<Building2 className="size-4" />} />
            <KpiCard label="إجمالي الـ Seats" value={1840} icon={<CreditCard className="size-4" />} delta="٧٨٪ مستخدمة" deltaTone="muted" />
            <KpiCard label="المستخدمون النشطون" value={1432} icon={<Users className="size-4" />} delta="↑ ١٢٪ هذا الشهر" deltaTone="success" />
            <KpiCard label="عقود تنتهي قريباً" value={3} icon={<Clock className="size-4" />} delta="خلال ٦٠ يوماً" deltaTone="warning" />
          </section>

          <section className="card-surface animate-slide-up overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="font-bold">جميع المؤسسات</h3>
              <button onClick={() => setOpen(true)} className="pressable inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-[var(--primary)] text-[var(--primary-fg)] text-sm font-semibold shadow-primary-glow">
                <Plus className="size-4" /> إنشاء مؤسسة جديدة
              </button>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-eyebrow border-b border-[var(--border)] bg-[var(--surface-2)]/40">
                  <th className="text-right px-5 py-3 font-medium">المؤسسة</th>
                  <th className="text-right px-3 py-3 font-medium">الدولة</th>
                  <th className="text-right px-3 py-3 font-medium">المقاعد</th>
                  <th className="text-right px-3 py-3 font-medium">البداية</th>
                  <th className="text-right px-3 py-3 font-medium">النهاية</th>
                  <th className="text-right px-5 py-3 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody className="stagger">
                {organizations.map((o) => (
                  <tr key={o.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-2)]/60 transition-colors">
                    <td className="px-5 py-3.5 font-medium">{o.name}</td>
                    <td className="px-3 py-3.5 text-[var(--fg-muted)]">{o.country}</td>
                    <td className="px-3 py-3.5 num">{o.seats}</td>
                    <td className="px-3 py-3.5 text-[var(--fg-muted)] num">{o.start}</td>
                    <td className="px-3 py-3.5 text-[var(--fg-muted)] num">{o.end}</td>
                    <td className="px-5 py-3.5">
                      <StatusPill tone={STATUS[o.status].tone}>{STATUS[o.status].label}</StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {open && <CreateOrgModal onClose={() => setOpen(false)} />}
    </div>
  );
}

function CreateOrgModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" onClick={onClose} />
      <form className="relative w-full max-w-xl card-surface shadow-pop animate-scale-in">
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="font-bold">إنشاء مؤسسة جديدة</h2>
          <button type="button" aria-label="إغلاق" onClick={onClose} className="pressable size-8 grid place-items-center rounded-md hover:bg-[var(--surface-2)] text-[var(--fg-muted)]">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="اسم المؤسسة" placeholder="مستشفى الملك..." className="md:col-span-2" />
          <Field label="الدولة" placeholder="السعودية" />
          <Field label="عدد الـ Seats" placeholder="50" type="number" />
          <Field label="تاريخ البداية" type="date" />
          <Field label="تاريخ النهاية" type="date" />
          <Field label="بريد Org Admin" type="email" placeholder="admin@hospital.med.sa" className="md:col-span-2" />
        </div>
        <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-2">
          <button type="button" onClick={onClose} className="pressable h-9 px-4 rounded-lg border border-[var(--border)] text-sm hover:bg-[var(--surface-2)]">إلغاء</button>
          <button type="submit" className="pressable h-9 px-4 rounded-lg bg-[var(--primary)] text-[var(--primary-fg)] text-sm font-semibold shadow-primary-glow">إنشاء المؤسسة</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, className = "", ...props }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="text-eyebrow block mb-1.5">{label}</span>
      <input {...props} className="w-full h-10 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 text-sm focus:border-[var(--primary)] outline-none" />
    </label>
  );
}
