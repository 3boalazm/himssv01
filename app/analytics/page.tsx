import type { Metadata } from "next"
import { AppShell } from "@/components/dashboard/app-shell"
import { AnalyticsContent } from "@/components/analytics/analytics-content"

export const metadata: Metadata = { title: "التقارير" }

export default function AnalyticsPage() {
  return (
    <AppShell title="التقارير" subtitle="نظرة تحليلية على أداء المؤسسة">
      <AnalyticsContent />
    </AppShell>
  )
}
