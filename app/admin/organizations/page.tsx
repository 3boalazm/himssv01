"use client";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { organizations, type Organization } from "@/lib/mock-data";
import { Building2, Plus, X, Users, Globe, TrendingUp, AlertCircle } from "lucide-react";

const statusConfig = {
  active:   { label: "نشط",        bg: "var(--primary-soft)", fg: "var(--primary)" },
  expired:  { label: "منتهي",      bg: "var(--danger-soft)",  fg: "var(--danger)"  },
  trial:    { label: "تجريبي",     bg: "var(--warning-soft)", fg: "var(--warning)" },
  expiring: { label: "ينتهي قريباً", bg: "var(--amber-soft)", fg: "var(--amber)"  },
};

export default function OrgsPage() {
  const [showModal, setShowModal] = useState(false);

  const totalSeats    = organizations.reduce((a, o) => a + parseInt(o.seats.split("/")[1]), 0);
  const usedSeats     = organizations.reduce((a, o) => a + parseInt(o.seats.split("/")[0]), 0);
  const activeOrgs    = organizations.filter(o => o.status === "active").length;
  const expiringOrgs  = organizations.filter(o => o.status === "expiring" || o.status === "expired").length;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Sidebar />
      <div className="lg:mr-[220px]">
        <Topbar title="إدارة المؤسسات" />

        <main className="p-4 lg:p-6 space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
            {[
              { label: "مؤسسات نشطة",   val: activeOrgs,   icon: Building2,   color: "var(--primary)" },
              { label: "إجمالي الـ seats", val: totalSeats,  icon: Users,       color: "var(--teal)" },
              { label: "seats مستخدمة", val: usedSeats,    icon: TrendingUp,  color: "var(--purple)" },
              { label: "تحتاج متابعة",  val: expiringOrgs, icon: AlertCircle, color: "var(--danger)" },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="lift card-surface p-4 flex items-center gap-3">
                  <div className="size-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-eyebrow">{s.label}</p>
                    <p className="font-cooper text-xl font-bold text-[var(--fg)]">{s.val}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card-surface p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-cooper font-bold text-[var(--fg)]">جميع المؤسسات</h3>
              <button onClick={() => setShowModal(true)} className="pressable flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[var(--primary-fg)] shadow-primary-glow transition-all" style={{ background: "var(--primary)" }}>
                <Plus className="size-4" />مؤسسة جديدة
              </button>
            </div>

            <div className="space-y-2 stagger">
              {organizations.map((org, i) => {
                const st = statusConfig[org.status];
                const [used, total] = org.seats.split("/").map(Number);
                const pct = Math.round((used / total) * 100);
                return (
                  <div key={org.id} className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-2)] transition-colors group pressable">
                    <div className="size-10 rounded-xl bg-[var(--primary-soft)] flex items-center justify-center flex-shrink-0">
                      <Building2 className="size-4 text-[var(--primary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-[var(--fg)] truncate">{org.name}</p>
                        <span className="flex items-center gap-0.5 text-[10px] text-[var(--fg-subtle)] flex-shrink-0">
                          <Globe className="size-3" />{org.country}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[var(--surface-2)]" style={{ maxWidth: 100 }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct > 90 ? "var(--danger)" : "var(--primary)" }} />
                        </div>
                        <span className="text-[11px] text-[var(--fg-subtle)]">{org.seats} seats</span>
                        <span className="text-[11px] text-[var(--fg-subtle)]">{org.start} ← {org.end}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full flex-shrink-0" style={{ background: st.bg, color: st.fg }}>
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,.6)", backdropFilter: "blur(4px)" }}>
          <div className="card-surface animate-scale-in w-full max-w-md" style={{ boxShadow: "var(--shadow-lg)" }}>
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <h3 className="font-cooper font-bold text-[var(--fg)]">إنشاء مؤسسة جديدة</h3>
              <button onClick={() => setShowModal(false)} aria-label="إغلاق" className="pressable size-8 flex items-center justify-center rounded-xl hover:bg-[var(--surface-2)]">
                <X className="size-4 text-[var(--fg-muted)]" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: "اسم المؤسسة", placeholder: "مستشفى / وزارة / مجموعة طبية..." },
                { label: "الدولة", placeholder: "KSA / UAE / BHR" },
                { label: "عدد الـ seats", placeholder: "50", type: "number" },
                { label: "بريد Org Admin", placeholder: "admin@hospital.sa", type: "email" },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-eyebrow block mb-1.5">{f.label}</label>
                  <input type={f.type ?? "text"} placeholder={f.placeholder}
                    className="w-full h-10 px-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-sm text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 p-5 border-t border-[var(--border)]">
              <button onClick={() => setShowModal(false)} className="pressable px-4 py-2 rounded-xl border border-[var(--border)] text-sm text-[var(--fg-muted)] hover:bg-[var(--surface-2)]">إلغاء</button>
              <button className="pressable px-5 py-2 rounded-xl text-sm font-semibold text-[var(--primary-fg)] shadow-primary-glow" style={{ background: "var(--primary)" }}>إنشاء المؤسسة</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
