"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AvatarSelector } from "@/components/avatar-selector"
import type { UserProfile } from "@/types/user"

interface AuthFormProps {
  onLogin: (user: UserProfile) => void
}

export function AuthForm({ onLogin }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState("👨‍💻")

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const nickname = formData.get("nickname") as string

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: UserProfile = {
      id: Date.now().toString(),
      name,
      email,
      nickname: nickname || name,
      avatar: selectedAvatar,
      totalXP: 0,
      level: 1,
      currentSubject: "javascript",
      subjectProgress: {
        javascript: { level: 0, xp: 0, completed: false, currentLesson: 1 },
        react: { level: 0, xp: 0, completed: false, currentLesson: 1 },
        nodejs: { level: 0, xp: 0, completed: false, currentLesson: 1 },
        mongodb: { level: 0, xp: 0, completed: false, currentLesson: 1 },
        mysql: { level: 0, xp: 0, completed: false, currentLesson: 1 },
        java: { level: 0, xp: 0, completed: false, currentLesson: 1 },
        frontend: { level: 0, xp: 0, completed: false, currentLesson: 1 },
      },
      createdAt: new Date().toISOString(),
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    setIsLoading(false)
    onLogin(newUser)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: UserProfile) => u.email === email)

    if (user) {
      onLogin(user)
    } else {
      alert("User not found. Please sign up first!")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0a]">
      <Card className="w-full max-w-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#e0e0e0] shadow-xl rounded-xl">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold text-[#00ff41]">
            Developer's Academy
          </CardTitle>
          <CardDescription className="text-lg text-[#808080]">
            Join thousands of developers mastering code through fun, interactive lessons!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#2a2a2a] text-[#e0e0e0] border border-[#2a2a2a]">
              <TabsTrigger value="signup">Join Academy</TabsTrigger>
              <TabsTrigger value="login">Welcome Back</TabsTrigger>
            </TabsList>

            <TabsContent value="signup" className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      required
                      className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input
                      id="nickname"
                      name="nickname"
                      placeholder="iam"
                      className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="aayam@email.com"
                    required
                    className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    required
                    className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Choose Your Developer Avatar</Label>
                  <AvatarSelector selected={selectedAvatar} onSelect={setSelectedAvatar} />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-bold bg-[#2a2a2a] text-[#e0e0e0] border border-[#2a2a2a] hover:bg-[#00ff41] hover:text-[#0a0a0a] hover:border-[#00ff41] transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating Your Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Start My Coding Journey!
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="login" className="space-y-6">
              <div className="text-center py-4">
                <h3 className="text-xl font-semibold text-[#00ff41] mb-2">
                  Welcome Back, Coder!
                </h3>
                <p className="text-[#808080]">Ready to continue your learning adventure?</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="Your password"
                    required
                    className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-bold bg-[#2a2a2a] text-[#e0e0e0] border border-[#2a2a2a] hover:bg-[#00ff41] hover:text-[#0a0a0a] hover:border-[#00ff41] transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Logging You In...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Continue My Journey!
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-xs text-[#808080]">
              Join over 10,000+ developers already learning with us!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
