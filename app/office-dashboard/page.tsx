"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OfficeHeader from "@/components/office-header"
import AQIMonitoring from "@/components/aqi-monitoring"
import ZoneManagement from "@/components/zone-management"
import TeamPerformance from "@/components/team-performance"
import CityMetrics from "@/components/city-metrics"
import { Activity, Target, Users, Map } from "lucide-react"

export default function OfficeManagerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Office manager header */}
      <OfficeHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* City metrics overview */}
        <CityMetrics />

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full max-w-2xl bg-card/50 border border-accent/30">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="aqi" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              AQI Targets
            </TabsTrigger>
            <TabsTrigger value="zones" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              Zone Management
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team Performance
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <AQIMonitoring compact />
            <TeamPerformance compact />
          </TabsContent>

          {/* AQI Tab */}
          <TabsContent value="aqi" className="mt-6">
            <AQIMonitoring />
          </TabsContent>

          {/* Zone Management Tab */}
          <TabsContent value="zones" className="mt-6">
            <ZoneManagement />
          </TabsContent>

          {/* Team Performance Tab */}
          <TabsContent value="team" className="mt-6">
            <TeamPerformance />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
