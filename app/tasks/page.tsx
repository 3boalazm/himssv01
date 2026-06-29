import type { Metadata } from "next"
import { AppShell } from "@/components/dashboard/app-shell"
import { TasksContent } from "@/components/tasks/tasks-content"

export const metadata: Metadata = { title: "المسارات التعليمية" }

export default function TasksPage() {
  return (
    <AppShell title="المسارات التعليمية" subtitle="تابع المهام والمسارات التعليمية">
      <TasksContent />
    </AppShell>
  )
}
