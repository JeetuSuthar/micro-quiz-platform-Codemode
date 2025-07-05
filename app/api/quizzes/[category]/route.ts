import { NextResponse } from "next/server"
import { getQuizzesByCategory } from "@/lib/mock-data"

// Mock data for quizzes by category
const quizzesByCategory = {
  history: [
    {
      id: "ancient-civilizations",
      title: "Ancient Civilizations",
      description: "Test your knowledge about ancient Egypt, Greece, Rome, and other early civilizations.",
      difficulty: "Medium" as const,
      questionCount: 10,
      estimatedTime: "8 min",
    },
    {
      id: "world-war-2",
      title: "World War II",
      description: "Key events, figures, and outcomes of the Second World War.",
      difficulty: "Hard" as const,
      questionCount: 15,
      estimatedTime: "12 min",
    },
    {
      id: "american-revolution",
      title: "American Revolution",
      description: "The founding of America and the fight for independence.",
      difficulty: "Easy" as const,
      questionCount: 8,
      estimatedTime: "6 min",
    },
  ],
  science: [
    {
      id: "basic-physics",
      title: "Basic Physics",
      description: "Fundamental concepts of motion, energy, and forces.",
      difficulty: "Easy" as const,
      questionCount: 12,
      estimatedTime: "10 min",
    },
    {
      id: "chemistry-elements",
      title: "Chemical Elements",
      description: "Periodic table, atomic structure, and chemical properties.",
      difficulty: "Medium" as const,
      questionCount: 10,
      estimatedTime: "8 min",
    },
    {
      id: "human-biology",
      title: "Human Biology",
      description: "Body systems, organs, and biological processes.",
      difficulty: "Medium" as const,
      questionCount: 14,
      estimatedTime: "11 min",
    },
  ],
  math: [
    {
      id: "algebra-basics",
      title: "Algebra Fundamentals",
      description: "Linear equations, polynomials, and algebraic expressions.",
      difficulty: "Easy" as const,
      questionCount: 10,
      estimatedTime: "8 min",
    },
    {
      id: "geometry-shapes",
      title: "Geometry & Shapes",
      description: "Areas, perimeters, angles, and geometric theorems.",
      difficulty: "Medium" as const,
      questionCount: 12,
      estimatedTime: "10 min",
    },
  ],
  programming: [
    {
      id: "javascript-basics",
      title: "JavaScript Fundamentals",
      description: "Variables, functions, objects, and basic JavaScript concepts.",
      difficulty: "Easy" as const,
      questionCount: 15,
      estimatedTime: "12 min",
    },
    {
      id: "react-concepts",
      title: "React Concepts",
      description: "Components, hooks, state management, and React patterns.",
      difficulty: "Medium" as const,
      questionCount: 12,
      estimatedTime: "10 min",
    },
    {
      id: "data-structures",
      title: "Data Structures",
      description: "Arrays, linked lists, stacks, queues, and trees.",
      difficulty: "Hard" as const,
      questionCount: 10,
      estimatedTime: "8 min",
    },
  ],
}

export async function GET(request: Request, { params }: { params: { category: string } }) {
  const category = params.category.toLowerCase()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const quizzes = getQuizzesByCategory(category)

  return NextResponse.json(quizzes)
}
