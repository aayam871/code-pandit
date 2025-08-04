"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { lessons } from "@/data/lessons"

interface QuizComponentProps {
  subjectId: string
  lessonNumber: number
  onComplete: (passed: boolean, score: number) => void
}

export function QuizComponent({ subjectId, lessonNumber, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const lessonData = lessons[subjectId as keyof typeof lessons]?.[lessonNumber - 1]
  const questions = lessonData?.quiz || []

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      let correct = 0
      questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          correct++
        }
      })
      const score = Math.round((correct / questions.length) * 100)
      const passed = score >= 80
      setShowResults(true)
      setTimeout(() => {
        onComplete(passed, score)
      }, 2000)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (!questions.length) {
    return <div className="text-center text-gray-500 text-sm">No quiz available for this lesson.</div>
  }

  if (showResults) {
    const correct = questions.reduce((acc, question, index) => acc + (selectedAnswers[index] === question.correctAnswer ? 1 : 0), 0)
    const score = Math.round((correct / questions.length) * 100)
    const passed = score >= 80

    return (
      <Card className="bg-[#121212]/70 border border-green-600/30 shadow-lg shadow-emerald-500/10">
        <CardContent className="text-center py-10 space-y-3">
          <div className={`text-6xl ${passed ? "text-green-400" : "text-yellow-400"}`}>{passed ? "🎉" : "😅"}</div>
          <h3 className={`text-2xl font-bold ${passed ? "text-green-400" : "text-yellow-400"}`}>
            {passed ? "Congratulations!" : "Almost There!"}
          </h3>
          <p className="text-white">
            You scored {score}% ({correct}/{questions.length} correct)
          </p>
          <p className="text-gray-400 text-sm">
            {passed ? "Great job! You can move to the next lesson." : "You need 80% to pass. Review the lesson and try again!"}
          </p>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="space-y-6 max-w-3xl mx-auto px-4">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400 font-mono">
          <span>Question {currentQuestion + 1} / {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-700" />
      </div>

      {/* Question */}
      <Card className="bg-[#1a1a1a] border border-green-600/20 shadow-md shadow-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-white text-lg font-semibold">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
              className={`w-full text-left justify-start p-4 h-auto transition-all duration-200 ${
                selectedAnswers[currentQuestion] === index
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
              {option}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="text-white border border-white/20 hover:bg-gray-800"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:brightness-110"
        >
          {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
        </Button>
      </div>
    </div>
  )
}
