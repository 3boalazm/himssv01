import { ReactNode } from "react";
import { Users } from "lucide-react";

export function EmptyState({
  icon, title, subtitle, action,
}: { icon?: ReactNode; title: string; subtitle: string; action?: ReactNode }) {
  return (
    <div className="card-surface p-12 text-center flex flex-col items-center animate-scale-in">
      <div className="size-16 rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)] grid place-items-center mb-4">
        {icon ?? <Users className="size-7" />}
      </div>
      <h3 className="text-base font-bold mb-1.5">{title}</h3>
      <p className="text-sm text-[var(--fg-muted)] max-w-sm mb-5">{subtitle}</p>
      {action}
    </div>
  );
}
