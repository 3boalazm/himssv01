import type { Metadata } from "next"
import { AppShell } from "@/components/dashboard/app-shell"
import { SettingsContent } from "@/components/settings/settings-content"

export const metadata: Metadata = { title: "الإعدادات" }

export default function SettingsPage() {
  return (
    <AppShell title="إعدادات المؤسسة" subtitle="إدارة ملفك الشخصي وتفضيلات المؤسسة">
      <SettingsContent />
    </AppShell>
  )
}
