"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Brain, ArrowRight, ArrowLeft } from "lucide-react"
import type { UserProfile } from "@/types/user"
import { QuizComponent } from "@/components/quiz-component"
import { lessons } from "@/data/lessons"

interface LessonModalProps {
  subjectId: string
  user: UserProfile
  onUpdateUser: (updatedUser: UserProfile) => void
  onClose: () => void
}

export function LessonModal({
  subjectId,
  user,
  onUpdateUser,
  onClose,
}: LessonModalProps) {
  const [currentView, setCurrentView] = useState<"lesson" | "quiz">("lesson")
  const progress =
    user.subjectProgress[subjectId as keyof typeof user.subjectProgress]
  const currentLesson = progress?.currentLesson || 1
  const lessonData = lessons[subjectId as keyof typeof lessons]?.[currentLesson - 1]

  if (!lessonData) return null

  const handleTakeQuiz = () => setCurrentView("quiz")
  const handleBackToLesson = () => setCurrentView("lesson")

  const handleQuizComplete = (passed: boolean, score: number) => {
    if (passed) {
      const updatedUser = { ...user }
      const subjectProgress =
        updatedUser.subjectProgress[subjectId as keyof typeof updatedUser.subjectProgress]
      const newLevel = Math.min(subjectProgress.level + 1, 5)
      const xpGained = 100
      const isCompleted = newLevel >= 5

      updatedUser.subjectProgress = {
        ...updatedUser.subjectProgress,
        [subjectId]: {
          level: newLevel,
          xp: subjectProgress.xp + xpGained,
          completed: isCompleted,
          currentLesson: Math.min(currentLesson + 1, 5),
        },
      }

      updatedUser.totalXP += xpGained
      if (updatedUser.totalXP >= updatedUser.level * 500) {
        updatedUser.level += 1
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const userIndex = users.findIndex((u: UserProfile) => u.id === user.id)
      if (userIndex !== -1) {
        users[userIndex] = updatedUser
        localStorage.setItem("users", JSON.stringify(users))
      }
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      onUpdateUser(updatedUser)
      alert(`Lesson completed! +${xpGained} XP gained! Score: ${score}%`)
      onClose()
    } else {
      alert(`Almost! You scored ${score}%. You need 80% to pass. Review and retry.`)
      setCurrentView("lesson")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-green-500/20 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-400 flex items-center gap-2">
            {currentView === "lesson" ? (
              <>
                <BookOpen className="h-6 w-6" />
                {lessonData.title}
              </>
            ) : (
              <>
                <Brain className="h-6 w-6" />
                Quiz Time!
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {currentView === "lesson" ? (
          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Lesson {currentLesson} of 5</span>
                <span>{Math.round((currentLesson / 5) * 100)}% Complete</span>
              </div>
              <Progress value={(currentLesson / 5) * 100} className="h-2" />
            </div>

            {/* Lesson Card */}
            <Card className="bg-[#1a1a1a] border border-[#2a2a2a] text-white">
              <CardHeader>
                <CardTitle className="text-xl text-green-400">
                  {lessonData.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">📚 What You'll Learn</h3>
                  <p className="text-gray-300">{lessonData.concept}</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">💡 Simple Explanation</h3>
                  <p className="text-gray-300">{lessonData.explanation}</p>
                </section>

                <section className="bg-[#2a2a2a] border border-green-500/20 rounded-lg p-4">
                  <h3 className="text-green-300 text-sm font-medium mb-2">😄 Remember This!</h3>
                  <p className="text-green-200 italic text-base">
                    "{lessonData.funnyPhrase}"
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">💻 Code Example</h3>
                  <pre className="bg-black text-green-300 text-sm p-4 rounded-md border border-[#2a2a2a] overflow-x-auto">
                    <code>{lessonData.codeExample}</code>
                  </pre>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-2">🎯 Key Points</h3>
                  <ul className="space-y-2">
                    {lessonData.keyPoints.map((point, i) => (
                      <li key={i} className="text-gray-300 flex gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Map
              </Button>
              <Button
                onClick={handleTakeQuiz}
                className="w-full sm:w-auto bg-[#00ff41] text-black hover:bg-green-400"
              >
                Take Quiz
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Button
              variant="outline"
              onClick={handleBackToLesson}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Review Lesson
            </Button>
            <QuizComponent
              subjectId={subjectId}
              lessonNumber={currentLesson}
              onComplete={handleQuizComplete}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
