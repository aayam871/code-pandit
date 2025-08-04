export interface Lesson {
  title: string
  concept: string
  explanation: string
  funnyPhrase: string
  codeExample: string
  keyPoints: string[]
  quiz: QuizQuestion[]
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}
