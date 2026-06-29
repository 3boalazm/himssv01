export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-primary animate-float">
          <span className="text-primary-foreground font-bold">H</span>
        </div>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-1/2 rounded-full bg-primary animate-pulse" />
        </div>
        <p className="text-xs text-muted-foreground">جارٍ التحميل…</p>
      </div>
    </div>
  )
}
