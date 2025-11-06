"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Clock, MapPin, TrendingUp } from "lucide-react"
import { useState } from "react"

const MOCK_POSTS = [
  {
    id: 1,
    author: "Alex Johnson",
    avatar: "AJ",
    title: "Pothole on Main Street fixed!",
    category: "Pothole",
    categoryEmoji: "🕳️",
    location: "Main St & 5th Ave",
    description:
      "Great news! The massive pothole that was reported 3 days ago has been filled. Road is much smoother now.",
    timestamp: "2 hours ago",
    likes: 234,
    comments: 12,
    status: "resolved",
    severityOriginal: "high",
    points: 250,
  },
  {
    id: 2,
    author: "Sarah Chen",
    avatar: "SC",
    title: "Street light outage on Oak Road",
    category: "Street Light",
    categoryEmoji: "💡",
    location: "Oak Rd & Park Ave",
    description: "Multiple street lights have been out for several days. Makes the area unsafe at night.",
    timestamp: "4 hours ago",
    likes: 89,
    comments: 5,
    status: "pending",
    severityOriginal: "medium",
    points: 100,
  },
  {
    id: 3,
    author: "Mike Torres",
    avatar: "MT",
    title: "Air quality alert - manufacturing plant",
    category: "Air Quality",
    categoryEmoji: "💨",
    location: "Industrial Zone",
    description:
      "Unusual smoke and odor detected from manufacturing plant. Notified authorities. AQI reading 340 (Hazardous)",
    timestamp: "6 hours ago",
    likes: 156,
    comments: 23,
    status: "in-progress",
    severityOriginal: "high",
    points: 300,
  },
  {
    id: 4,
    author: "Emma Davis",
    avatar: "ED",
    title: "Waste accumulation at corner park",
    category: "Waste",
    categoryEmoji: "🗑️",
    location: "Central Park Junction",
    description: "Garbage bins are overflowing. Please arrange for urgent cleanup.",
    timestamp: "8 hours ago",
    likes: 67,
    comments: 3,
    status: "pending",
    severityOriginal: "medium",
    points: 120,
  },
]

export default function PostsList({ searchQuery }: { searchQuery: string }) {
  const [liked, setLiked] = useState<number[]>([])

  const filteredPosts = MOCK_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-500/10 border-green-500/30 text-green-400"
      case "in-progress":
        return "bg-accent/10 border-accent/30 text-accent"
      case "pending":
        return "bg-secondary/10 border-secondary/30 text-secondary"
      default:
        return "bg-muted/10 border-muted/30"
    }
  }

  const toggleLike = (id: number) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-4">
      {filteredPosts.length === 0 ? (
        <Card className="p-12 text-center border-accent/20 bg-card/50">
          <p className="text-foreground/60">No posts found matching your search.</p>
        </Card>
      ) : (
        filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="p-6 border-accent/20 bg-card/50 backdrop-blur hover:bg-card/80 transition-all group"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-sm font-bold text-foreground">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">{post.author}</p>
                    {post.points > 200 && (
                      <Badge className="bg-accent/20 border-accent/50 text-accent text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Top Reporter
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-foreground/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {post.location}
                    </span>
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
            </div>

            {/* Category & Title */}
            <div className="mb-3 flex items-start gap-3">
              <span className="text-2xl">{post.categoryEmoji}</span>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">{post.title}</h3>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="bg-card/50 border-accent/30 text-foreground text-xs">
                    {post.category}
                  </Badge>
                  {post.severityOriginal === "high" && (
                    <Badge className="bg-destructive/10 border-destructive/30 text-destructive text-xs">
                      High Priority
                    </Badge>
                  )}
                  <Badge className="bg-secondary/10 border-secondary/30 text-secondary text-xs">
                    +{post.points} pts
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-foreground/80 mb-4 leading-relaxed">{post.description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <div className="flex gap-6 text-foreground/60 text-sm">
                <span className="flex items-center gap-1">{post.likes} Likes</span>
                <span className="flex items-center gap-1">{post.comments} Comments</span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleLike(post.id)}
                  className="text-foreground/60 hover:text-accent"
                >
                  <Heart className={`w-4 h-4 ${liked.includes(post.id) ? "fill-accent text-accent" : ""}`} />
                </Button>
                <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-accent">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-accent">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
