import type { Metadata } from "next"
import { AppShell } from "@/components/dashboard/app-shell"
import { HelpContent } from "@/components/help/help-content"

export const metadata: Metadata = { title: "المساعدة" }

export default function HelpPage() {
  return (
    <AppShell title="مركز المساعدة" subtitle="أدلة الاستخدام والدعم الفني">
      <HelpContent />
    </AppShell>
  )
}
