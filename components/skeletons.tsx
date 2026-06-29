export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function SkeletonKpi() {
  return (
    <div className="card-surface p-5">
      <Skeleton className="h-3 w-24 mb-4" />
      <Skeleton className="h-8 w-32 mb-3" />
      <Skeleton className="h-1.5 w-full" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 py-3">
      <Skeleton className="size-9 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-3 w-12" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}

export function SkeletonChart({ bars = 5 }: { bars?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: bars }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 flex-1" style={{ maxWidth: `${50 + Math.random() * 40}%` }} />
        </div>
      ))}
    </div>
  );
}
