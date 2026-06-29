import type { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata: Metadata = { title: "تسجيل الدخول" }

async function login(formData: FormData) {
  "use server"
  const from = (formData.get("from") as string) || "/"
  // Demo session — a real deployment receives `hlos_sid` (httpOnly) from the
  // HLOS API. Set it here so the dashboard is reachable without the backend.
  const jar = await cookies()
  jar.set("hlos_sid", "demo-session", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  redirect(from.startsWith("/") ? from : "/")
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>
}) {
  const { from } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="card-surface w-full max-w-sm p-8 animate-scale-in">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-primary mb-3">
            <span className="text-primary-foreground font-bold text-lg">H</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">تسجيل الدخول إلى HLOS</h1>
          <p className="text-xs text-muted-foreground mt-1">منصة تعلّم تقنية المعلومات الصحية</p>
        </div>

        <form action={login} className="space-y-4">
          <input type="hidden" name="from" value={from ?? "/"} />
          <div>
            <label className="text-eyebrow block mb-1.5">البريد الإلكتروني</label>
            <input
              name="email"
              type="email"
              required
              defaultValue="admin@kfh.sa"
              className="w-full h-10 px-3 rounded-lg bg-secondary border border-input text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-eyebrow block mb-1.5">كلمة المرور</label>
            <input
              name="password"
              type="password"
              required
              defaultValue="demo1234"
              className="w-full h-10 px-3 rounded-lg bg-secondary border border-input text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="pressable w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-primary hover:bg-primary-hover transition-all"
          >
            دخول
          </button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-5">
          ليس لديك حساب؟{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  )
}
