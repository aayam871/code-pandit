export interface UserProfile {
  id: string
  name: string
  email: string
  nickname: string
  avatar: string
  totalXP: number
  level: number
  currentSubject: string
  subjectProgress: {
    javascript: SubjectProgress
    react: SubjectProgress
    nodejs: SubjectProgress
    mongodb: SubjectProgress
    mysql: SubjectProgress
    java: SubjectProgress
    frontend: SubjectProgress
  }
  createdAt: string
}

export interface SubjectProgress {
  level: number
  xp: number
  completed: boolean
  currentLesson: number
}
