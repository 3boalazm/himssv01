# HLOS — Healthcare IT Learning OS
### منصة تعلّم تقنية المعلومات الصحية

Arabic-first, dark/light mode, RTL SaaS platform for Healthcare IT professionals in Saudi Arabia & GCC.

## Stack
- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS v4
- **Charts:** Recharts
- **Theme:** next-themes (light/dark)
- **Icons:** Lucide React
- **Analytics:** Vercel Analytics + Speed Insights

## Getting Started

```bash
pnpm install
cp .env.example .env.local
# Fill in .env.local values
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
git add .
git commit -m "feat: HLOS org dashboard"
git push origin main
```

Then connect repo to Vercel and add Environment Variables from `.env.example`.

## Project Structure

```
app/
  page.tsx          # Org Admin Dashboard
  layout.tsx        # Root layout + ThemeProvider
  loading.tsx       # Skeleton loading state
  error.tsx         # Error boundary
  not-found.tsx     # 404 page
  sitemap.ts        # SEO sitemap
components/
  dashboard/        # Dashboard components
  theme-toggle.tsx  # Light/dark toggle
  ui/               # shadcn/ui components
middleware.ts       # Route protection (hlos_sid cookie)
```

## Environment Variables

See `.env.example` for all required variables.
