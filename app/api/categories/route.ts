import { NextResponse } from "next/server"

// Simple mock JSON data directly in the API route
const categories = [
  {
    id: "history",
    name: "History",
    description: "Test your knowledge of world history, from ancient civilizations to modern events.",
    icon: "🏛️",
    quizCount: 3,
  },
  {
    id: "science",
    name: "Science",
    description: "Explore the wonders of physics, chemistry, biology, and earth sciences.",
    icon: "🔬",
    quizCount: 3,
  },
  {
    id: "math",
    name: "Mathematics",
    description: "Challenge yourself with algebra, geometry, calculus, and mathematical reasoning.",
    icon: "📐",
    quizCount: 2,
  },
  {
    id: "programming",
    name: "Programming",
    description: "Test your coding knowledge across various programming languages and concepts.",
    icon: "💻",
    quizCount: 3,
  },
]

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json(categories)
}
