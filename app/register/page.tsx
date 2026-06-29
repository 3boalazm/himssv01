import type { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata: Metadata = { title: "إنشاء حساب" }

async function register(formData: FormData) {
  "use server"
  // Demo signup — establishes a session cookie and lands on the dashboard.
  const jar = await cookies()
  jar.set("hlos_sid", "demo-session", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  redirect("/")
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="card-surface w-full max-w-sm p-8 animate-scale-in">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-primary mb-3">
            <span className="text-primary-foreground font-bold text-lg">H</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">إنشاء حساب جديد</h1>
          <p className="text-xs text-muted-foreground mt-1">انضم إلى منصة HLOS</p>
        </div>

        <form action={register} className="space-y-4">
          <div>
            <label className="text-eyebrow block mb-1.5">الاسم الكامل</label>
            <input
              name="name"
              type="text"
              required
              className="w-full h-10 px-3 rounded-lg bg-secondary border border-input text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow"
              placeholder="اسمك الكامل"
            />
          </div>
          <div>
            <label className="text-eyebrow block mb-1.5">البريد الإلكتروني</label>
            <input
              name="email"
              type="email"
              required
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
              className="w-full h-10 px-3 rounded-lg bg-secondary border border-input text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="pressable w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-primary hover:bg-primary-hover transition-all"
          >
            إنشاء الحساب
          </button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-5">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  )
}
