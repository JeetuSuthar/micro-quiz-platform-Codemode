"use client"

import { useReducer } from "react"
import Link from "next/link"

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

interface QuizState {
  currentQuestionIndex: number
  selectedAnswer: number | null
  answers: (number | null)[]
  showFeedback: boolean
  isCompleted: boolean
  score: number
}

type QuizAction =
  | { type: "SELECT_ANSWER"; answer: number }
  | { type: "SHOW_FEEDBACK" }
  | { type: "NEXT_QUESTION" }
  | { type: "COMPLETE_QUIZ" }
  | { type: "RESET_QUIZ" }

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_ANSWER":
      return {
        ...state,
        selectedAnswer: action.answer,
      }

    case "SHOW_FEEDBACK":
      const newAnswers = [...state.answers]
      newAnswers[state.currentQuestionIndex] = state.selectedAnswer

      return {
        ...state,
        answers: newAnswers,
        showFeedback: true,
      }

    case "NEXT_QUESTION":
      const isLastQuestion = state.currentQuestionIndex === state.answers.length - 1

      if (isLastQuestion) {
        const score = state.answers.reduce((acc, answer, index) => {
          // We need access to questions here, so we'll calculate score in COMPLETE_QUIZ
          return acc
        }, 0)

        return {
          ...state,
          isCompleted: true,
          showFeedback: false,
        }
      }

      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedAnswer: null,
        showFeedback: false,
      }

    case "COMPLETE_QUIZ":
      return {
        ...state,
        isCompleted: true,
        score: action.score || 0,
      }

    case "RESET_QUIZ":
      return {
        currentQuestionIndex: 0,
        selectedAnswer: null,
        answers: new Array(state.answers.length).fill(null),
        showFeedback: false,
        isCompleted: false,
        score: 0,
      }

    default:
      return state
  }
}

interface Props {
  quiz: Quiz
}

export default function QuizClient({ quiz }: Props) {
  const [state, dispatch] = useReducer(quizReducer, {
    currentQuestionIndex: 0,
    selectedAnswer: null,
    answers: new Array(quiz.questions.length).fill(null),
    showFeedback: false,
    isCompleted: false,
    score: 0,
  })

  const currentQuestion = quiz.questions[state.currentQuestionIndex]
  const progress = ((state.currentQuestionIndex + 1) / quiz.questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    if (state.showFeedback) return
    dispatch({ type: "SELECT_ANSWER", answer: answerIndex })
  }

  const handleSubmitAnswer = () => {
    if (state.selectedAnswer === null) return
    dispatch({ type: "SHOW_FEEDBACK" })
  }

  const handleNextQuestion = () => {
    if (state.currentQuestionIndex === quiz.questions.length - 1) {
      // Calculate final score
      const score = state.answers.reduce((acc, answer, index) => {
        if (answer === quiz.questions[index].correctAnswer) {
          return acc + 1
        }
        return acc
      }, 0)

      // Add current answer to score if correct
      const finalScore = state.selectedAnswer === currentQuestion.correctAnswer ? score + 1 : score

      dispatch({ type: "COMPLETE_QUIZ", score: finalScore })
    } else {
      dispatch({ type: "NEXT_QUESTION" })
    }
  }

  const handleResetQuiz = () => {
    dispatch({ type: "RESET_QUIZ" })
  }

  const getDifficultyColor = (difficulty: string) => {
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

  if (state.isCompleted) {
    const percentage = Math.round((state.score / quiz.questions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Navigation */}
            <nav className="mb-8">
              <Link
                href={`/quizzes/${quiz.category.toLowerCase()}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Back to {quiz.category} Quizzes
              </Link>
            </nav>

            {/* Results Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4">{percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "📚"}</div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h1>
                <h2 className="text-xl text-gray-600 mb-4">{quiz.title}</h2>
              </div>

              {/* Score Display */}
              <div className="mb-8">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {state.score}/{quiz.questions.length}
                </div>
                <div className="text-2xl font-semibold text-gray-700 mb-4">{percentage}% Correct</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-gray-600">
                  {percentage >= 80 ? "Excellent work!" : percentage >= 60 ? "Good job!" : "Keep practicing!"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Retake Quiz
                </button>
                <Link
                  href={`/quizzes/${quiz.category.toLowerCase()}`}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium text-center"
                >
                  More {quiz.category} Quizzes
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
                >
                  All Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Navigation */}
          <nav className="mb-8">
            <Link
              href={`/quizzes/${quiz.category.toLowerCase()}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to {quiz.category} Quizzes
            </Link>
          </nav>

          {/* Quiz Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">
                    Question {state.currentQuestionIndex + 1} of {quiz.questions.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{currentQuestion.question}</h2>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 "

                if (state.showFeedback) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonClass += "border-green-500 bg-green-50 text-green-800"
                  } else if (index === state.selectedAnswer && index !== currentQuestion.correctAnswer) {
                    buttonClass += "border-red-500 bg-red-50 text-red-800"
                  } else {
                    buttonClass += "border-gray-200 bg-gray-50 text-gray-600"
                  }
                } else if (state.selectedAnswer === index) {
                  buttonClass += "border-blue-500 bg-blue-50 text-blue-800"
                } else {
                  buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={state.showFeedback}
                    className={buttonClass}
                  >
                    <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                )
              })}
            </div>

            {/* Feedback */}
            {state.showFeedback && currentQuestion.explanation && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Explanation:</h3>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Action Button */}
            <div className="flex justify-end">
              {!state.showFeedback ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={state.selectedAnswer === null}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  {state.currentQuestionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
