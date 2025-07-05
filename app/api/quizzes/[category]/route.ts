import { NextResponse } from "next/server"

// Simple mock JSON data directly in the API route
const quizzesByCategory: Record<string, any[]> = {
  history: [
    {
      id: "ancient-civilizations",
      title: "Ancient Civilizations",
      description: "Test your knowledge about ancient Egypt, Greece, Rome, and other early civilizations.",
      difficulty: "Medium",
      questionCount: 3,
      estimatedTime: "5 min",
      category: "history",
    },
    {
      id: "world-war-2",
      title: "World War II",
      description: "Key events, figures, and outcomes of the Second World War.",
      difficulty: "Hard",
      questionCount: 3,
      estimatedTime: "5 min",
      category: "history",
    },
    {
      id: "american-revolution",
      title: "American Revolution",
      description: "The founding of America and the fight for independence.",
      difficulty: "Easy",
      questionCount: 3,
      estimatedTime: "4 min",
      category: "history",
    },
  ],
  science: [
    {
      id: "basic-physics",
      title: "Basic Physics",
      description: "Fundamental concepts of motion, energy, and forces.",
      difficulty: "Easy",
      questionCount: 2,
      estimatedTime: "4 min",
      category: "science",
    },
    {
      id: "chemistry-elements",
      title: "Chemical Elements",
      description: "Periodic table, atomic structure, and chemical properties.",
      difficulty: "Medium",
      questionCount: 3,
      estimatedTime: "5 min",
      category: "science",
    },
    {
      id: "human-biology",
      title: "Human Biology",
      description: "Body systems, organs, and biological processes.",
      difficulty: "Medium",
      questionCount: 3,
      estimatedTime: "5 min",
      category: "science",
    },
  ],
  math: [
    {
      id: "algebra-basics",
      title: "Algebra Fundamentals",
      description: "Linear equations, polynomials, and algebraic expressions.",
      difficulty: "Easy",
      questionCount: 2,
      estimatedTime: "4 min",
      category: "math",
    },
    {
      id: "geometry-shapes",
      title: "Geometry & Shapes",
      description: "Areas, perimeters, angles, and geometric theorems.",
      difficulty: "Medium",
      questionCount: 3,
      estimatedTime: "5 min",
      category: "math",
    },
  ],
  programming: [
    {
      id: "javascript-basics",
      title: "JavaScript Fundamentals",
      description: "Variables, functions, objects, and basic JavaScript concepts.",
      difficulty: "Easy",
      questionCount: 3,
      estimatedTime: "5 min",
      category: "programming",
    },
    {
      id: "react-concepts",
      title: "React Concepts",
      description: "Components, hooks, state management, and React patterns.",
      difficulty: "Medium",
      questionCount: 3,
      estimatedTime: "5 min",
      category: "programming",
    },
    {
      id: "data-structures",
      title: "Data Structures",
      description: "Arrays, linked lists, stacks, queues, and trees.",
      difficulty: "Hard",
      questionCount: 3,
      estimatedTime: "6 min",
      category: "programming",
    },
  ],
}

export async function GET(request: Request, { params }: { params: { category: string } }) {
  const category = params.category.toLowerCase()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const quizzes = quizzesByCategory[category] || []

  return NextResponse.json(quizzes)
}
