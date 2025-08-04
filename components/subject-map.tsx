"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { UserProfile } from "@/types/user"
import { Lock, CheckCircle, Play, BookOpen } from "lucide-react"
import { LessonModal } from "@/components/lesson-modal"

const subjects = [
  {
    id: "javascript",
    name: "JavaScript Fundamentals",
    icon: "JS",
    color: "from-yellow-600 to-orange-600",
    description: "Learn the building blocks of web development",
    totalLessons: 5,
  },
  {
    id: "react",
    name: "React Development",
    icon: "RC",
    color: "from-blue-600 to-cyan-600",
    description: "Build interactive user interfaces",
    totalLessons: 5,
  },
  {
    id: "nodejs",
    name: "Node.js Backend",
    icon: "ND",
    color: "from-green-600 to-emerald-600",
    description: "Server-side JavaScript development",
    totalLessons: 5,
  },
  {
    id: "mongodb",
    name: "MongoDB Database",
    icon: "DB",
    color: "from-green-700 to-teal-600",
    description: "NoSQL database management",
    totalLessons: 5,
  },
  {
    id: "mysql",
    name: "MySQL Database",
    icon: "SQL",
    color: "from-blue-700 to-indigo-600",
    description: "Relational database systems",
    totalLessons: 5,
  },
  {
    id: "java",
    name: "Java Programming",
    icon: "JV",
    color: "from-red-600 to-pink-600",
    description: "Object-oriented programming",
    totalLessons: 5,
  },
  {
    id: "frontend",
    name: "Frontend Integration",
    icon: "FE",
    color: "from-purple-600 to-pink-600",
    description: "Complete web application development",
    totalLessons: 5,
  },
]

interface SubjectMapProps {
  user: UserProfile
  onUpdateUser: (updatedUser: UserProfile) => void
}

export function SubjectMap({ user, onUpdateUser }: SubjectMapProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const isSubjectUnlocked = (subjectId: string, index: number) => {
    if (index === 0) return true
    const prevSubject = subjects[index - 1]
    const prevProgress = user.subjectProgress[prevSubject.id as keyof typeof user.subjectProgress]
    return prevProgress?.completed || false
  }

  const getSubjectStatus = (subjectId: string) => {
    const progress = user.subjectProgress[subjectId as keyof typeof user.subjectProgress]
    if (progress?.completed) return "completed"
    if (progress?.level > 0) return "in-progress"
    return "available"
  }

  const handleStartLesson = (subjectId: string) => {
    setSelectedSubject(subjectId)
  }

  const handleCloseLesson = () => {
    setSelectedSubject(null)
  }

  return (
    <div className="space-y-8 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-green-400 mb-4 tracking-wide drop-shadow-[0_0_5px_rgba(22,163,74,0.7)]">
          Learning Path
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Master each subject through interactive lessons and quizzes
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject, index) => {
          const isUnlocked = isSubjectUnlocked(subject.id, index)
          const status = getSubjectStatus(subject.id)
          const progress = user.subjectProgress[subject.id as keyof typeof user.subjectProgress]
          const progressPercent = progress ? (progress.level / subject.totalLessons) * 100 : 0

          return (
            <Card
              key={subject.id}
              className={`
                relative overflow-hidden transition-transform duration-300
                ${isUnlocked
                  ? "bg-gradient-to-br from-gray-900 to-black border-2 border-green-600/50 shadow-[0_0_15px_rgba(22,163,74,0.4)] hover:shadow-[0_0_25px_rgba(22,163,74,0.7)] hover:border-green-500"
                  : "bg-gray-900 border border-gray-700 opacity-60 cursor-not-allowed"
                }
                rounded-lg
              `}
            >
              {/* Status Icons */}
              <div className="absolute top-4 right-4 z-10">
                {status === "completed" && (
                  <div className="bg-green-600 rounded-full p-2 shadow-md shadow-green-500/70">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                )}
                {status === "in-progress" && (
                  <div className="bg-yellow-500 rounded-full p-2 shadow-md shadow-yellow-400/70">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                )}
                {!isUnlocked && (
                  <div className="bg-gray-600 rounded-full p-2 shadow-inner">
                    <Lock className="h-5 w-5 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Header */}
              <CardHeader className={`bg-gradient-to-r ${subject.color} text-white relative pb-6`}>
                <div className="flex items-start gap-4">
                  <div
                    className={`text-lg font-extrabold bg-black/30 rounded-lg p-3 min-w-[60px] text-center tracking-wide select-none drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]`}
                  >
                    {subject.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-extrabold mb-2 tracking-tight drop-shadow-[0_0_8px_rgba(22,163,74,0.8)]">
                      {subject.name}
                    </CardTitle>
                    <p className="text-sm opacity-80 leading-relaxed">{subject.description}</p>
                  </div>
                </div>
              </CardHeader>

              {/* Content */}
              <CardContent className="p-6 space-y-6">
                {isUnlocked ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={status === "completed" ? "default" : status === "in-progress" ? "secondary" : "outline"}
                          className={`text-sm px-3 py-1
                            ${status === "completed"
                              ? "bg-green-700 text-white shadow-[0_0_6px_rgba(22,163,74,0.9)]"
                              : status === "in-progress"
                              ? "bg-yellow-700 text-white shadow-[0_0_6px_rgba(202,138,4,0.9)]"
                              : "bg-gray-700 text-white"}
                          `}
                        >
                          {status === "completed" ? "Completed" : status === "in-progress" ? "In Progress" : "Ready to Start"}
                        </Badge>
                        <div className="text-sm font-bold text-green-400">{progress?.xp || 0} XP</div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-300 font-mono">
                          <span className="font-semibold tracking-wide">Progress</span>
                          <span className="font-bold">
                            {progress?.level || 0}/{subject.totalLessons} Lessons
                          </span>
                        </div>
                        <Progress value={progressPercent} className="h-3 bg-gray-700 rounded-lg" />
                        <div className="text-right text-xs text-gray-400">{Math.round(progressPercent)}% Complete</div>
                      </div>
                    </div>

                    <Button
                      className={`w-full h-12 text-lg font-extrabold
                        bg-gradient-to-r ${subject.color}
                        hover:opacity-90 transition-all duration-300
                        shadow-[0_0_15px_rgba(22,163,74,0.7)]
                        hover:shadow-[0_0_25px_rgba(22,163,74,0.9)]`}
                      onClick={() => handleStartLesson(subject.id)}
                      disabled={!isUnlocked}
                    >
                      <BookOpen className="h-5 w-5 mr-2" />
                      {status === "completed" ? "Review Lessons" : status === "in-progress" ? "Continue" : "Start Learning"}
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="bg-gray-800 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center shadow-inner shadow-black/50">
                      <Lock className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 font-semibold mb-1">Locked</p>
                      <p className="text-gray-500 text-sm">
                        Complete <span className="text-green-400 font-semibold">{subjects[index - 1]?.name}</span> first
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedSubject && (
        <LessonModal subjectId={selectedSubject} user={user} onUpdateUser={onUpdateUser} onClose={handleCloseLesson} />
      )}
    </div>
  )
}
