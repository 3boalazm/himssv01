import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="card-surface max-w-md w-full p-8 text-center animate-scale-in">
        <p className="text-5xl font-bold text-primary mb-2">404</p>
        <h1 className="text-xl font-bold text-foreground mb-2">الصفحة غير موجودة</h1>
        <p className="text-sm text-muted-foreground mb-6">
          عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.
        </p>
        <Link
          href="/"
          className="pressable inline-flex h-10 px-5 items-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-primary hover:bg-primary-hover transition-all"
        >
          العودة إلى لوحة التحكم
        </Link>
      </div>
    </div>
  )
}
