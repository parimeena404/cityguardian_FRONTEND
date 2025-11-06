"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Plus, Search, TrendingUp, MapPin, Zap } from "lucide-react"
import CitizenHeader from "@/components/citizen-header"
import IssueForm from "@/components/issue-form"
import PostsList from "@/components/posts-list"
import CitizenStats from "@/components/citizen-stats"

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState("feed")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="w-full min-h-screen bg-background">
      <CitizenHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <CitizenStats />

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full max-w-md bg-card/50 border border-accent/30">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Community Feed
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Report Issue
            </TabsTrigger>
            <TabsTrigger value="my-reports" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              My Reports
            </TabsTrigger>
          </TabsList>

          {/* Community Feed Tab */}
          <TabsContent value="feed" className="space-y-6 mt-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/50 border-accent/30 text-foreground"
                />
              </div>
            </div>

            {/* Posts List */}
            <PostsList searchQuery={searchQuery} />
          </TabsContent>

          {/* Report Issue Tab */}
          <TabsContent value="report" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <IssueForm />
              </div>
              <div className="space-y-4">
                <Card className="p-6 border-accent/30 bg-card/50 backdrop-blur">
                  <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Quick Tips
                  </h3>
                  <ul className="space-y-3 text-foreground/70 text-sm">
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Be specific about location using the map or address</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Add clear photos for better visibility</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>More details earn bonus reward points</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Verified issues get 2x point multiplier</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 border-secondary/30 bg-secondary/5 backdrop-blur">
                  <h3 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                    Top Categories
                  </h3>
                  <div className="space-y-2">
                    {["Air Quality", "Pothole", "Street Light", "Noise", "Waste"].map((cat) => (
                      <div key={cat} className="flex justify-between items-center text-sm">
                        <span className="text-foreground/70">{cat}</span>
                        <Badge variant="outline" className="bg-secondary/10 border-secondary/30 text-foreground">
                          {Math.floor(Math.random() * 150) + 20}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* My Reports Tab */}
          <TabsContent value="my-reports" className="mt-6">
            <Card className="p-8 border-accent/30 bg-card/50 backdrop-blur text-center">
              <MapPin className="w-12 h-12 text-accent/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Your Reported Issues</h3>
              <p className="text-foreground/60 mb-6">You haven't reported any issues yet. Start earning rewards!</p>
              <Button
                onClick={() => setActiveTab("report")}
                className="bg-gradient-to-r from-accent to-secondary text-foreground font-bold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Report Your First Issue
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
