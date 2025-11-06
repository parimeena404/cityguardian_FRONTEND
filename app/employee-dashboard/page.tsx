"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmployeeHeader from "@/components/employee-header"
import TaskBoard from "@/components/task-board"
import Leaderboard from "@/components/leaderboard"
import PerformanceMetrics from "@/components/performance-metrics"
import QuickAssignments from "@/components/quick-assignments"
import { CheckCircle2, Trophy, BarChart3, Users } from "lucide-react"

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState("tasks")

  return (
    <div className="w-full min-h-screen bg-background">
      <EmployeeHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <PerformanceMetrics />

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full max-w-2xl bg-card/50 border border-accent/30">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              My Tasks
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team
            </TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6 mt-6">
            <TaskBoard />
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="mt-6">
            <Leaderboard />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <QuickAssignments />
              </div>
              <div>
                <PerformanceMetrics compact />
              </div>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="mt-6">
            <Leaderboard team />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
