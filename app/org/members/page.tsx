"use client";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { TeamTable } from "@/components/team-table";
import { InviteModal } from "@/components/invite-modal";
import { EmptyState } from "@/components/empty-state";
import { Search, Download } from "lucide-react";
import { members, kpiStats } from "@/lib/mock-data";

const FILTERS = [
  { id: "all",         label: "الكل" },
  { id: "completed",   label: "أكملوا التقييم" },
  { id: "in_progress", label: "جارٍ" },
  { id: "new",         label: "لم يبدأوا" },
] as const;

export default function MembersPage() {
  const [filter, setFilter] = useState<typeof FILTERS[number]["id"]>("all");
  const [q, setQ] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);

  const filtered = members.filter(m => {
    if (filter !== "all" && m.status !== filter) return false;
    if (q && !m.name.includes(q) && !m.email.includes(q)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Sidebar />
      <div className="lg:mr-[220px]">
        <Topbar title="أعضاء الفريق" onInvite={() => setInviteOpen(true)} />

        <main className="p-4 lg:p-6 space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
            {[
              { label: "إجمالي الأعضاء", val: members.length,                                          bg: "var(--surface)", fg: "var(--fg)" },
              { label: "أكملوا التقييم", val: members.filter(m=>m.status==="completed").length,         bg: "var(--primary-soft)", fg: "var(--primary)" },
              { label: "جارٍ التقييم",   val: members.filter(m=>m.status==="in_progress").length,      bg: "var(--warning-soft)", fg: "var(--warning)" },
              { label: "seats متاحة",    val: kpiStats.seatsTotal - members.length,                    bg: "var(--surface-2)", fg: "var(--fg-muted)" },
            ].map(s => (
              <div key={s.label} className="lift rounded-[var(--radius)] px-4 py-3 border border-[var(--border)]" style={{ background: s.bg }}>
                <p className="text-[10px] font-medium mb-1" style={{ color: s.fg, opacity: .7 }}>{s.label}</p>
                <p className="font-cooper text-2xl font-bold" style={{ color: s.fg }}>{s.val}</p>
              </div>
            ))}
          </div>

          <div className="card-surface p-5">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[var(--fg-subtle)]" />
                <input
                  placeholder="بحث بالاسم أو البريد الإلكتروني..."
                  value={q} onChange={e => setQ(e.target.value)}
                  className="w-full h-9 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] pr-9 pl-3 text-sm placeholder:text-[var(--fg-subtle)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {FILTERS.map(f => (
                  <button key={f.id} onClick={() => setFilter(f.id)}
                    className="pressable px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={filter === f.id
                      ? { background: "var(--primary)", color: "var(--primary-fg)" }
                      : { background: "var(--surface-2)", color: "var(--fg-muted)", border: "0.5px solid var(--border)" }}>
                    {f.label} {f.id === "all" ? `(${members.length})` : ""}
                  </button>
                ))}
              </div>
              <button className="pressable flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] text-sm text-[var(--fg-muted)] hover:bg-[var(--surface-2)] transition-colors">
                <Download className="size-4" />تصدير
              </button>
            </div>

            {filtered.length === 0
              ? <EmptyState title="لا توجد نتائج" description="جرّب تغيير الفلتر أو مصطلح البحث" />
              : <TeamTable data={filtered} />
            }
          </div>
        </main>
      </div>
      {inviteOpen && <InviteModal onClose={() => setInviteOpen(false)} />}
    </div>
  );
}
