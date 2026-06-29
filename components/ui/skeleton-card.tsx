export function SkeletonStat() {
  return (
    <div className="card-surface p-5 space-y-3">
      <div className="skeleton h-3 w-24" />
      <div className="skeleton h-8 w-32" />
      <div className="skeleton h-2 w-full rounded-full" />
      <div className="skeleton h-3 w-16" />
    </div>
  )
}

export function SkeletonRow({ lines = 3 }: { lines?: number }) {
  return (
    <div className="card-surface p-5 space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="skeleton h-8 w-8 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-3" style={{ width: `${85 - i * 10}%` }} />
            <div className="skeleton h-2" style={{ width: `${60 - i * 8}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="card-surface p-5">
      <div className="skeleton h-4 w-40 mb-6" />
      <div className="flex items-end gap-3 h-40">
        {[65, 45, 80, 55, 70].map((h, i) => (
          <div key={i} className="skeleton flex-1 rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}
