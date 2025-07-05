import type { Metadata } from "next"
import { notFound } from "next/navigation"
import QuizClient from "./quiz-client"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface Quiz {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  questions: Question[]
}

interface Props {
  params: {
    id: string
  }
}

// Server-side data fetching for initial quiz data - equivalent to getServerSideProps
async function getQuiz(quizId: string): Promise<Quiz | null> {
  // For server-side rendering, we'll use the mock data directly
  // In a real application, you might query a database here
  const { getQuizById } = await import("@/lib/mock-data")

  // Simulate async operation for demonstration
  await new Promise((resolve) => setTimeout(resolve, 300))

  return getQuizById(quizId) || null
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const quiz = await getQuiz(params.id)

  if (!quiz) {
    return {
      title: "Quiz Not Found",
    }
  }

  return {
    title: `${quiz.title} - Micro-Quiz Platform`,
    description: `Take the ${quiz.title} quiz and test your knowledge in ${quiz.category}. ${quiz.description}`,
  }
}

export default async function QuizPage({ params }: Props) {
  const quiz = await getQuiz(params.id)

  if (!quiz) {
    notFound()
  }

  return <QuizClient quiz={quiz} />
}
