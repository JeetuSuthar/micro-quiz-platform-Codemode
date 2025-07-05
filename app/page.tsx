import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Micro-Quiz Platform - Test Your Knowledge",
  description:
    "Take short, topic-specific quizzes on various subjects including History, Science, Math, and Programming.",
  keywords: "quiz, education, learning, test, knowledge",
}

interface Category {
  id: string
  name: string
  description: string
  icon: string
  quizCount: number
}

// This function demonstrates Static Site Generation (SSG) - equivalent to getStaticProps
async function getCategories(): Promise<Category[]> {
  try {
    // Use absolute URL for server-side fetching during build
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/categories`, {
      cache: "force-cache", // SSG behavior - cache at build time
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    // Return empty array if API fails - let the UI handle empty state
    return []
  }
}

export default async function HomePage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image
              src="/quiz-logo.png"
              alt="Quiz Platform Logo"
              width={80}
              height={80}
              className="rounded-full shadow-lg"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Micro-Quiz Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with our collection of short, engaging quizzes across various topics
          </p>
        </header>

        {/* Categories Grid */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Choose Your Category</h2>
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Categories Loading...</h3>
              <p className="text-gray-600">Please refresh the page if categories don't appear.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/quizzes/${category.id}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6"
                >
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      <Image
                        src={`/${category.id}-icon.png`}
                        alt={`${category.name} icon`}
                        width={60}
                        height={60}
                        className="rounded-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      {category.quizCount} Quiz{category.quizCount !== 1 ? "es" : ""}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-2">Quick & Easy</h3>
              <p className="text-gray-600 text-sm">Short quizzes that fit into your busy schedule</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-2">Focused Learning</h3>
              <p className="text-gray-600 text-sm">Topic-specific content for targeted knowledge building</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="font-semibold text-gray-800 mb-2">Instant Feedback</h3>
              <p className="text-gray-600 text-sm">Get immediate results and learn from your mistakes</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
