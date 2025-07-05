import { NextResponse } from "next/server"
import { getQuizById } from "@/lib/mock-data"

// Mock quiz data with questions
const quizzes = {
  "ancient-civilizations": {
    id: "ancient-civilizations",
    title: "Ancient Civilizations",
    description: "Test your knowledge about ancient Egypt, Greece, Rome, and other early civilizations.",
    category: "History",
    difficulty: "Medium" as const,
    questions: [
      {
        id: "1",
        question: "Which ancient wonder of the world was located in Alexandria?",
        options: [
          "The Colossus of Rhodes",
          "The Lighthouse of Alexandria",
          "The Hanging Gardens",
          "The Temple of Artemis",
        ],
        correctAnswer: 1,
        explanation:
          "The Lighthouse of Alexandria (Pharos of Alexandria) was one of the Seven Wonders of the Ancient World and served as a landmark for sailors.",
      },
      {
        id: "2",
        question: "What was the primary writing system used in ancient Egypt?",
        options: ["Cuneiform", "Hieroglyphics", "Linear A", "Phoenician alphabet"],
        correctAnswer: 1,
        explanation:
          "Hieroglyphics were the formal writing system used in ancient Egypt, consisting of pictographic and ideographic elements.",
      },
      {
        id: "3",
        question: "Which Roman emperor was known for building a famous wall across northern Britain?",
        options: ["Julius Caesar", "Augustus", "Hadrian", "Trajan"],
        correctAnswer: 2,
        explanation: "Emperor Hadrian built Hadrian's Wall around 122 AD to defend Roman Britain from Scottish tribes.",
      },
    ],
  },
  "javascript-basics": {
    id: "javascript-basics",
    title: "JavaScript Fundamentals",
    description: "Variables, functions, objects, and basic JavaScript concepts.",
    category: "Programming",
    difficulty: "Easy" as const,
    questions: [
      {
        id: "1",
        question: "Which of the following is the correct way to declare a variable in JavaScript?",
        options: ["variable myVar = 5;", "let myVar = 5;", "declare myVar = 5;", "var myVar := 5;"],
        correctAnswer: 1,
        explanation: 'In modern JavaScript, "let" is the preferred way to declare variables with block scope.',
      },
      {
        id: "2",
        question: 'What does the "typeof" operator return for an array?',
        options: ["array", "object", "list", "undefined"],
        correctAnswer: 1,
        explanation: 'In JavaScript, arrays are actually objects, so typeof returns "object" for arrays.',
      },
      {
        id: "3",
        question: "Which method is used to add an element to the end of an array?",
        options: ["append()", "add()", "push()", "insert()"],
        correctAnswer: 2,
        explanation: "The push() method adds one or more elements to the end of an array and returns the new length.",
      },
    ],
  },
  "basic-physics": {
    id: "basic-physics",
    title: "Basic Physics",
    description: "Fundamental concepts of motion, energy, and forces.",
    category: "Science",
    difficulty: "Easy" as const,
    questions: [
      {
        id: "1",
        question: "What is the unit of force in the International System of Units (SI)?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: 1,
        explanation: "The Newton (N) is the SI unit of force, named after Sir Isaac Newton.",
      },
      {
        id: "2",
        question: "According to Newton's first law, an object at rest will:",
        options: [
          "Eventually start moving",
          "Remain at rest unless acted upon by a force",
          "Accelerate slowly",
          "Move in a circular path",
        ],
        correctAnswer: 1,
        explanation:
          "Newton's first law states that an object at rest stays at rest unless acted upon by an unbalanced force.",
      },
    ],
  },
  "algebra-basics": {
    id: "algebra-basics",
    title: "Algebra Fundamentals",
    description: "Linear equations, polynomials, and algebraic expressions.",
    category: "Mathematics",
    difficulty: "Easy" as const,
    questions: [
      {
        id: "1",
        question: "What is the value of x in the equation: 2x + 5 = 13?",
        options: ["4", "6", "8", "9"],
        correctAnswer: 0,
        explanation: "Solving: 2x + 5 = 13, subtract 5 from both sides: 2x = 8, divide by 2: x = 4.",
      },
      {
        id: "2",
        question: "Which of the following is a linear equation?",
        options: ["x² + 2x = 5", "3x + 7 = 1", "x³ - 4 = 0", "1/x = 3"],
        correctAnswer: 1,
        explanation: "A linear equation has variables raised only to the first power. 3x + 7 = 1 is linear.",
      },
    ],
  },
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const quizId = params.id

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const quiz = getQuizById(quizId)

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
  }

  return NextResponse.json(quiz)
}
