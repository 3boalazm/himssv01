"use client";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { TeamTable } from "@/components/team-table";
import { EmptyState } from "@/components/empty-state";
import { InviteModal } from "@/components/invite-modal";
import { Search, UserPlus, MoreVertical } from "lucide-react";
import { members } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all",       label: "الكل" },
  { id: "completed", label: "أكملوا التقييم" },
  { id: "new",       label: "لم يبدأوا" },
  { id: "in_progress", label: "جارٍ" },
] as const;

export default function MembersPage() {
  const [filter, setFilter] = useState<typeof FILTERS[number]["id"]>("all");
  const [q, setQ] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);

  const filtered = members.filter((m) => {
    if (filter !== "all" && m.status !== filter) return false;
    if (q && !m.name.includes(q) && !m.email.includes(q)) return false;
    return true;
  });

  const stats = {
    total: members.length,
    completed: members.filter((m) => m.status === "completed").length,
    pending: members.filter((m) => m.status === "new").length,
    available: 50 - members.length,
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Sidebar />
      <div className="mr-[220px]">
        <Topbar title="أعضاء الفريق" onInvite={() => setInviteOpen(true)} />

        <main className="p-6 space-y-6">
          {/* Stat chips */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
            <StatChip label="إجمالي الأعضاء" value={stats.total} />
            <StatChip label="أكملوا التقييم" value={stats.completed} tone="success" />
            <StatChip label="لم يبدأوا" value={stats.pending} tone="warning" />
            <StatChip label="مقاعد متاحة" value={stats.available} tone="info" />
          </section>

          {/* Toolbar */}
          <section className="card-surface p-4 flex flex-wrap items-center gap-3 animate-slide-up">
            <div className="flex items-center gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "pressable h-8 px-3 rounded-full text-xs font-medium",
                    filter === f.id
                      ? "bg-[var(--primary)] text-[var(--primary-fg)]"
                      : "bg-[var(--surface-2)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  )}
                >{f.label}</button>
              ))}
            </div>
            <div className="flex-1 min-w-[200px]" />
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[var(--fg-subtle)]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحث بالاسم أو البريد..."
                className="h-9 w-64 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] pr-9 pl-3 text-sm"
              />
            </div>
          </section>

          {/* Table or empty */}
          {filtered.length === 0 ? (
            <EmptyState
              title="لا يوجد أعضاء بعد"
              subtitle="ابدأ بدعوة فريقك للانضمام إلى المنصة وقياس جاهزيتهم في تقنية المعلومات الصحية."
              action={
                <button onClick={() => setInviteOpen(true)} className="pressable inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-[var(--primary)] text-[var(--primary-fg)] font-semibold shadow-primary-glow">
                  <UserPlus className="size-4" /> دعوة أول عضو
                </button>
              }
            />
          ) : (
            <div className="animate-slide-up">
              <TeamTableWithMenu rows={filtered} />
            </div>
          )}
        </main>
      </div>

      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}

function StatChip({ label, value, tone = "muted" }: { label: string; value: number; tone?: "muted"|"success"|"warning"|"info" }) {
  const colorMap = {
    muted:   "text-[var(--fg)]",
    success: "text-[var(--success)]",
    warning: "text-[var(--warning)]",
    info:    "text-[var(--info)]",
  };
  return (
    <div className="card-surface lift lift-hover p-4">
      <div className="text-eyebrow mb-1.5">{label}</div>
      <div className={cn("text-2xl font-bold num", colorMap[tone])}>{value}</div>
    </div>
  );
}

import { TeamTable as _T } from "@/components/team-table";
function TeamTableWithMenu({ rows }: { rows: typeof members }) {
  // For brevity, reuse TeamTable; kebab menu omitted to keep file focused.
  return <_T rows={rows} />;
}
