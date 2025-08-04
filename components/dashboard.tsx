"use client"

import { useState } from "react"
import { Card, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { UserProfile } from "@/types/user"
import { SubjectMap } from "@/components/subject-map"
import { UserSearch } from "@/components/user-search"
import { ProfileStats } from "@/components/profile-stats"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

interface DashboardProps {
  user: UserProfile
  onLogout: () => void
}

export function Dashboard({ user: initialUser, onLogout }: DashboardProps) {
  const [user, setUser] = useState(initialUser)
  const [activeTab, setActiveTab] = useState<"map" | "profile" | "search">("map")

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser)
  }

  const handleTabChange = (tab: "map" | "profile" | "search") => {
    setActiveTab(tab)
  }

  const totalProgress =
    Object.values(user.subjectProgress).reduce((acc, subject) => {
      return acc + (subject.completed ? 100 : subject.level * 20)
    }, 0) / 7

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-950 text-white">
      {/* Navbar */}
      <Navbar user={user} activeTab={activeTab} onTabChange={handleTabChange} onLogout={onLogout} />

      {/* Header */}
      <div className="p-4">
        <div className="max-w-6xl mx-auto mb-6 px-4">
          <Card className="bg-zinc-900 border border-green-500/20 shadow-md rounded-2xl">
            <CardHeader>
              <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-green-400">
                  Welcome back, {user.nickname}!
                </h1>
                <p className="text-gray-400 text-base md:text-lg">
                  Ready to level up your coding skills? Let’s make learning fun!
                </p>

                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Overall Progress</span>
                    <span>{Math.round(totalProgress)}%</span>
                  </div>
                  <Progress value={totalProgress} className="h-3 bg-zinc-800" />
                  <p className="text-xs text-gray-500 mt-1">Keep going! You're doing amazing!</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Dynamic Tab Content */}
        <div className="max-w-6xl mx-auto px-4">
          {activeTab === "map" && (
            <div className="animate-fade-in">
              <SubjectMap user={user} onUpdateUser={handleUpdateUser} />
            </div>
          )}
          {activeTab === "profile" && (
            <div className="animate-fade-in">
              <ProfileStats user={user} />
            </div>
          )}
          {activeTab === "search" && (
            <div className="animate-fade-in">
              <UserSearch currentUser={user} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
