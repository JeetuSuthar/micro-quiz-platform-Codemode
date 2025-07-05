import { NextResponse } from "next/server"

// Simple mock JSON data directly in the API route
const quizzes: Record<string, any> = {
  "ancient-civilizations": {
    id: "ancient-civilizations",
    title: "Ancient Civilizations",
    description: "Test your knowledge about ancient Egypt, Greece, Rome, and other early civilizations.",
    category: "History",
    difficulty: "Medium",
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
  "american-revolution": {
    id: "american-revolution",
    title: "American Revolution",
    description: "The founding of America and the fight for independence.",
    category: "History",
    difficulty: "Easy",
    questions: [
      {
        id: "1",
        question: "In which year did the American Revolution begin?",
        options: ["1773", "1775", "1776", "1777"],
        correctAnswer: 1,
        explanation: "The American Revolution began in 1775 with the Battles of Lexington and Concord.",
      },
      {
        id: "2",
        question: "Who was the primary author of the Declaration of Independence?",
        options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
        correctAnswer: 2,
        explanation: "Thomas Jefferson was the primary author of the Declaration of Independence in 1776.",
      },
      {
        id: "3",
        question: "Which battle is considered the turning point of the American Revolution?",
        options: ["Battle of Bunker Hill", "Battle of Saratoga", "Battle of Yorktown", "Battle of Lexington"],
        correctAnswer: 1,
        explanation: "The Battle of Saratoga (1777) convinced France to join the war as an American ally.",
      },
    ],
  },
  "world-war-2": {
    id: "world-war-2",
    title: "World War II",
    description: "Key events, figures, and outcomes of the Second World War.",
    category: "History",
    difficulty: "Hard",
    questions: [
      {
        id: "1",
        question: "Which event is generally considered the start of World War II?",
        options: [
          "Attack on Pearl Harbor",
          "Germany's invasion of Poland",
          "Germany's invasion of France",
          "Japan's invasion of China",
        ],
        correctAnswer: 1,
        explanation: "Germany's invasion of Poland on September 1, 1939, is generally considered the start of WWII.",
      },
      {
        id: "2",
        question: "What was the code name for the D-Day landings?",
        options: ["Operation Barbarossa", "Operation Overlord", "Operation Market Garden", "Operation Torch"],
        correctAnswer: 1,
        explanation: "Operation Overlord was the code name for the Allied invasion of Normandy on June 6, 1944.",
      },
      {
        id: "3",
        question: "Which cities were targeted by atomic bombs in 1945?",
        options: ["Tokyo and Osaka", "Hiroshima and Nagasaki", "Kyoto and Yokohama", "Kobe and Fukuoka"],
        correctAnswer: 1,
        explanation: "The United States dropped atomic bombs on Hiroshima (August 6) and Nagasaki (August 9), 1945.",
      },
    ],
  },
  "javascript-basics": {
    id: "javascript-basics",
    title: "JavaScript Fundamentals",
    description: "Variables, functions, objects, and basic JavaScript concepts.",
    category: "Programming",
    difficulty: "Easy",
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
  "react-concepts": {
    id: "react-concepts",
    title: "React Concepts",
    description: "Components, hooks, state management, and React patterns.",
    category: "Programming",
    difficulty: "Medium",
    questions: [
      {
        id: "1",
        question: "What is the purpose of the useEffect hook?",
        options: [
          "To manage component state",
          "To perform side effects in functional components",
          "To create context providers",
          "To handle form submissions",
        ],
        correctAnswer: 1,
        explanation:
          "useEffect is used to perform side effects like data fetching, subscriptions, or DOM manipulation.",
      },
      {
        id: "2",
        question: "Which hook would you use to store component state?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation: "useState is the primary hook for managing local component state in functional components.",
      },
      {
        id: "3",
        question: "What does JSX stand for?",
        options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON Syntax Extension"],
        correctAnswer: 0,
        explanation: "JSX stands for JavaScript XML and allows you to write HTML-like syntax in JavaScript.",
      },
    ],
  },
  "data-structures": {
    id: "data-structures",
    title: "Data Structures",
    description: "Arrays, linked lists, stacks, queues, and trees.",
    category: "Programming",
    difficulty: "Hard",
    questions: [
      {
        id: "1",
        question: "What is the time complexity of accessing an element in an array by index?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 0,
        explanation: "Array access by index is O(1) constant time because arrays store elements in contiguous memory.",
      },
      {
        id: "2",
        question: "Which data structure follows the Last In, First Out (LIFO) principle?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        correctAnswer: 1,
        explanation: "A stack follows LIFO principle where the last element added is the first one to be removed.",
      },
      {
        id: "3",
        question: "In a binary search tree, what is the maximum number of children a node can have?",
        options: ["1", "2", "3", "Unlimited"],
        correctAnswer: 1,
        explanation: "In a binary search tree, each node can have at most 2 children (left and right).",
      },
    ],
  },
  "basic-physics": {
    id: "basic-physics",
    title: "Basic Physics",
    description: "Fundamental concepts of motion, energy, and forces.",
    category: "Science",
    difficulty: "Easy",
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
  "chemistry-elements": {
    id: "chemistry-elements",
    title: "Chemical Elements",
    description: "Periodic table, atomic structure, and chemical properties.",
    category: "Science",
    difficulty: "Medium",
    questions: [
      {
        id: "1",
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum'.",
      },
      {
        id: "2",
        question: "How many protons does a carbon atom have?",
        options: ["4", "6", "8", "12"],
        correctAnswer: 1,
        explanation: "Carbon has 6 protons, which defines its atomic number and position in the periodic table.",
      },
      {
        id: "3",
        question: "Which gas makes up approximately 78% of Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        correctAnswer: 2,
        explanation: "Nitrogen (N₂) makes up about 78% of Earth's atmosphere by volume.",
      },
    ],
  },
  "human-biology": {
    id: "human-biology",
    title: "Human Biology",
    description: "Body systems, organs, and biological processes.",
    category: "Science",
    difficulty: "Medium",
    questions: [
      {
        id: "1",
        question: "Which organ is responsible for producing insulin?",
        options: ["Liver", "Pancreas", "Kidney", "Stomach"],
        correctAnswer: 1,
        explanation: "The pancreas produces insulin, which regulates blood sugar levels in the body.",
      },
      {
        id: "2",
        question: "How many chambers does a human heart have?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
        explanation: "The human heart has 4 chambers: two atria (upper chambers) and two ventricles (lower chambers).",
      },
      {
        id: "3",
        question: "Which blood type is considered the universal donor?",
        options: ["A", "B", "AB", "O"],
        correctAnswer: 3,
        explanation: "Type O blood is the universal donor because it lacks A and B antigens on red blood cells.",
      },
    ],
  },
  "algebra-basics": {
    id: "algebra-basics",
    title: "Algebra Fundamentals",
    description: "Linear equations, polynomials, and algebraic expressions.",
    category: "Mathematics",
    difficulty: "Easy",
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
  "geometry-shapes": {
    id: "geometry-shapes",
    title: "Geometry & Shapes",
    description: "Areas, perimeters, angles, and geometric theorems.",
    category: "Mathematics",
    difficulty: "Medium",
    questions: [
      {
        id: "1",
        question: "What is the area of a circle with radius 5?",
        options: ["25π", "10π", "5π", "15π"],
        correctAnswer: 0,
        explanation: "The area of a circle is πr². With radius 5, the area is π × 5² = 25π.",
      },
      {
        id: "2",
        question: "How many degrees are in the sum of interior angles of a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correctAnswer: 1,
        explanation: "The sum of interior angles in any triangle is always 180°.",
      },
      {
        id: "3",
        question: "What is the perimeter of a rectangle with length 8 and width 6?",
        options: ["14", "28", "48", "24"],
        correctAnswer: 1,
        explanation: "Perimeter of rectangle = 2(length + width) = 2(8 + 6) = 2(14) = 28.",
      },
    ],
  },
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const quizId = params.id

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const quiz = quizzes[quizId]

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
  }

  return NextResponse.json(quiz)
}
