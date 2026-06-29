"use client";
import { useState, useEffect, KeyboardEvent } from "react";
import { X, Mail, Users, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function InviteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [emails, setEmails] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [role, setRole] = useState<"member" | "admin">("member");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  const addEmail = () => {
    const v = input.trim().replace(/,$/, "");
    if (v && /\S+@\S+\.\S+/.test(v) && !emails.includes(v)) setEmails([...emails, v]);
    setInput("");
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addEmail(); }
    if (e.key === "Backspace" && !input && emails.length) setEmails(emails.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="invite-title">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px] animate-scale-in" onClick={onClose} />
      <div className="relative w-full max-w-lg card-surface shadow-pop animate-scale-in">
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <h2 id="invite-title" className="font-bold">دعوة أعضاء جدد</h2>
          <button aria-label="إغلاق" onClick={onClose} className="pressable size-8 grid place-items-center rounded-md hover:bg-[var(--surface-2)] text-[var(--fg-muted)]">
            <X className="size-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="text-eyebrow block mb-2">عناوين البريد</label>
            <div className="min-h-[44px] rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-2 flex flex-wrap gap-1.5 focus-within:border-[var(--primary)]">
              {emails.map((e) => (
                <span key={e} className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] text-xs">
                  <Mail className="size-3" />{e}
                  <button onClick={() => setEmails(emails.filter((x) => x !== e))} aria-label={`إزالة ${e}`}>
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                onBlur={addEmail}
                placeholder={emails.length ? "" : "name@hospital.med.sa  ثم Enter"}
                className="flex-1 min-w-[180px] bg-transparent outline-none text-sm placeholder:text-[var(--fg-subtle)]"
              />
            </div>
            <p className="text-xs text-[var(--fg-subtle)] mt-1.5">اضغط Enter أو فاصلة لإضافة بريد آخر</p>
          </div>

          <div>
            <label className="text-eyebrow block mb-2">الدور</label>
            <div className="grid grid-cols-2 gap-2">
              <RoleCard active={role === "member"} onClick={() => setRole("member")} icon={<Users className="size-4" />} title="عضو" desc="وصول للتقييمات والمسارات" />
              <RoleCard active={role === "admin"}  onClick={() => setRole("admin")}  icon={<Shield className="size-4" />} title="مدير"  desc="إدارة كاملة للمؤسسة" />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-2">
          <button onClick={onClose} className="pressable h-9 px-4 rounded-lg border border-[var(--border)] text-sm hover:bg-[var(--surface-2)]">
            إلغاء
          </button>
          <button
            disabled={!emails.length}
            className="pressable h-9 px-4 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-fg)] text-sm font-semibold disabled:opacity-50 shadow-primary-glow"
          >
            إرسال الدعوة ({emails.length})
          </button>
        </div>
      </div>
    </div>
  );
}

function RoleCard({ active, onClick, icon, title, desc }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "pressable text-right p-3 rounded-lg border transition-colors",
        active
          ? "border-[var(--primary)] bg-[var(--primary-soft)]"
          : "border-[var(--border)] hover:bg-[var(--surface-2)]"
      )}
    >
      <div className={cn("flex items-center gap-2 mb-1 font-semibold text-sm", active && "text-[var(--primary)]")}>
        {icon}{title}
      </div>
      <div className="text-xs text-[var(--fg-muted)]">{desc}</div>
    </button>
  );
}
