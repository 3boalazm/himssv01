import type { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata: Metadata = { title: "تسجيل الدخول" }

async function login(formData: FormData) {
  "use server"
  const from = (formData.get("from") as string) || "/org/dashboard"
  const jar = await cookies()
  jar.set("hlos_sid", "demo-session", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  redirect(from.startsWith("/") ? from : "/org/dashboard")
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>
}) {
  const { from } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-sm p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-md)] animate-scale-in">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center shadow-[var(--shadow-primary)] mb-3 animate-floaty">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h1 className="text-xl font-bold text-[var(--fg)]">تسجيل الدخول إلى HLOS</h1>
          <p className="text-xs text-[var(--fg-muted)] mt-1">منصة تعلّم تقنية المعلومات الصحية</p>
        </div>

        <form action={login} className="space-y-4">
          <input type="hidden" name="from" value={from ?? "/org/dashboard"} />
          <div>
            <label className="text-[10px] font-semibold tracking-widest uppercase text-[var(--fg-muted)] block mb-1.5">
              البريد الإلكتروني
            </label>
            <input
              name="email"
              type="email"
              required
              defaultValue="admin@kfh.sa"
              className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm text-[var(--fg)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold tracking-widest uppercase text-[var(--fg-muted)] block mb-1.5">
              كلمة المرور
            </label>
            <input
              name="password"
              type="password"
              required
              defaultValue="demo1234"
              className="w-full h-10 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm text-[var(--fg)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="pressable w-full h-10 rounded-lg bg-[var(--primary)] text-white text-sm font-semibold shadow-[var(--shadow-primary)] hover:bg-[var(--primary-hover)] transition-all"
          >
            دخول
          </button>
        </form>

        <p className="text-xs text-[var(--fg-muted)] text-center mt-5">
          ليس لديك حساب؟{" "}
          <Link href="/register" className="text-[var(--primary)] font-medium hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  )
}
