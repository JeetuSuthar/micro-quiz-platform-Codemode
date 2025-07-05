import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface Quiz {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  questionCount: number
  estimatedTime: string
}

interface Category {
  id: string
  name: string
  description: string
}

interface Props {
  params: {
    category: string
  }
}

// This function demonstrates Server-Side Rendering (SSR) - equivalent to getServerSideProps
async function getQuizzesByCategory(categoryId: string): Promise<Quiz[]> {
  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/quizzes/${categoryId}`, {
      cache: "no-store", // SSR behavior - fresh data on each request
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch quizzes for category ${categoryId}:`, error)
    return []
  }
}

async function getCategory(categoryId: string): Promise<Category | null> {
  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/categories`, {
      cache: "no-store", // SSR behavior
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const categories = await response.json()
    return categories.find((cat: Category) => cat.id === categoryId) || null
  } catch (error) {
    console.error(`Failed to fetch category ${categoryId}:`, error)
    return null
  }
}

// Generate metadata dynamically based on category
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(params.category)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.name} Quizzes - Micro-Quiz Platform`,
    description: `Test your knowledge in ${category.name} with our collection of engaging quizzes.`,
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800"
    case "Medium":
      return "bg-yellow-100 text-yellow-800"
    case "Hard":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default async function CategoryPage({ params }: Props) {
  const [quizzes, category] = await Promise.all([getQuizzesByCategory(params.category), getCategory(params.category)])

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            ← Back to Categories
          </Link>
        </nav>

        {/* Category Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image
              src={`/${category.name.toLowerCase()}-icon.png`}
              alt={`${category.name} category`}
              width={100}
              height={100}
              className="rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{category.name} Quizzes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge in {category.name.toLowerCase()} with our collection of engaging quizzes.
          </p>
        </header>

        {/* Quizzes Grid */}
        <section className="max-w-6xl mx-auto">
          {quizzes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">No quizzes available yet</h2>
              <p className="text-gray-600">Check back soon for new {category.name.toLowerCase()} quizzes!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <Link
                  key={quiz.id}
                  href={`/quiz/${quiz.id}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}
                      >
                        {quiz.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">{quiz.estimatedTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {quiz.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{quiz.description}</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      {quiz.questionCount} Question{quiz.questionCount !== 1 ? "s" : ""}
                    </span>
                    <span className="text-blue-600 group-hover:text-blue-800 font-medium text-sm">Start Quiz →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
