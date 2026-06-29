import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ProjectAnalytics } from "@/components/dashboard/project-analytics"
import { ProjectProgress } from "@/components/dashboard/project-progress"
import { TeamCollaboration } from "@/components/dashboard/team-collaboration"
import { Reminders } from "@/components/dashboard/reminders"
import { ProjectList } from "@/components/dashboard/project-list"
import { TimeTracker } from "@/components/dashboard/time-tracker"
import { MobileAppCard } from "@/components/dashboard/mobile-app-card"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:mr-56 px-4 py-5 lg:px-6">
        <Header />
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
          <div className="lg:col-span-2 space-y-4">
            <ProjectAnalytics />
            <TeamCollaboration />
            <ProjectList />
          </div>
          <div className="space-y-4">
            <ProjectProgress />
            <Reminders />
            <TimeTracker />
            <MobileAppCard />
          </div>
        </div>
      </main>
    </div>
  )
}
