import type { Metadata } from "next"
import { AppShell } from "@/components/dashboard/app-shell"
import { CalendarContent } from "@/components/calendar/calendar-content"

export const metadata: Metadata = { title: "التقويم" }

export default function CalendarPage() {
  return (
    <AppShell title="التقويم" subtitle="جدول المواعيد والفعاليات">
      <CalendarContent />
    </AppShell>
  )
}
