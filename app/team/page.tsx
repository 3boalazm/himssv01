import type { Metadata } from "next"
import { AppShell } from "@/components/dashboard/app-shell"
import { TeamContent } from "@/components/team/team-content"

export const metadata: Metadata = { title: "أعضاء الفريق" }

export default function TeamPage() {
  return (
    <AppShell title="أعضاء الفريق" subtitle="إدارة أعضاء فريقك وأدوارهم">
      <TeamContent />
    </AppShell>
  )
}
