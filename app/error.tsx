"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="card-surface max-w-md w-full p-8 text-center animate-scale-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">حدث خطأ ما</h1>
        <p className="text-sm text-muted-foreground mb-6">
          نعتذر، حدث خطأ غير متوقع. حاول مرة أخرى.
        </p>
        <button
          onClick={reset}
          className="pressable h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-primary hover:bg-primary-hover transition-all"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  )
}
