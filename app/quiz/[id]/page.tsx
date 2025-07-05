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
  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/quiz/${quizId}`, {
      cache: "no-store", // Fresh data for each quiz attempt
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch quiz ${quizId}:`, error)
    return null
  }
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
