# Micro-Quiz Platform

A modern, responsive quiz application built with Next.js that demonstrates various rendering strategies, dynamic routing, and API integration.

## 🚀 Features

- **Static Site Generation (SSG)** for the home page with quiz categories
- **Server-Side Rendering (SSR)** for category-specific quiz listings
- **Dynamic Routing** for categories and individual quizzes
- **Client-Side State Management** for interactive quiz taking
- **Next.js API Routes** for data fetching
- **Image Optimization** with next/image
- **Responsive Design** with Tailwind CSS
- **SEO Optimization** with dynamic metadata

## 🏗️ Architecture

### Rendering Strategies

1. **Home Page (/)** - Static Site Generation
   - Pre-rendered at build time using App Router's default caching
   - Fetches category data from API route
   - Optimized for performance and SEO

2. **Category Pages (/quizzes/[category])** - Server-Side Rendering
   - Rendered on each request for fresh data
   - Dynamic metadata based on category
   - Uses `cache: 'no-store'` for fresh data fetching

3. **Quiz Pages (/quiz/[id])** - Hybrid Approach
   - Server Component for initial data fetching
   - Client Component for interactive quiz functionality
   - State management with useReducer for complex quiz state

### API Routes

- `/api/categories` - Returns all quiz categories
- `/api/quizzes/[category]` - Returns quizzes for a specific category
- `/api/quiz/[id]` - Returns detailed quiz data with questions

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React useReducer
- **Image Optimization**: next/image
- **Routing**: Next.js file-based routing

## 📦 Installation & Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd micro-quiz-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set environment variables** (optional)
   \`\`\`bash
   # Create .env.local file
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏃‍♂️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

\`\`\`
micro-quiz-platform/
├── app/
│   ├── api/
│   │   ├── categories/route.ts
│   │   ├── quizzes/[category]/route.ts
│   │   └── quiz/[id]/route.ts
│   ├── quiz/[id]/
│   │   ├── page.tsx
│   │   └── quiz-client.tsx
│   ├── quizzes/[category]/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── public/
├── README.md
└── package.json
\`\`\`

## 🎯 Key Implementation Details

### Static Site Generation (SSG)
The home page uses App Router's default caching behavior to achieve static generation:
\`\`\`typescript
async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
    cache: 'force-cache' // Equivalent to getStaticProps
  })
  return response.json()
}
\`\`\`

### Server-Side Rendering (SSR)
Category pages use `cache: 'no-store'` to ensure fresh data on each request:
\`\`\`typescript
async function getQuizzesByCategory(categoryId: string): Promise<Quiz[]> {
  const response = await fetch(`${baseUrl}/api/quizzes/${categoryId}`, {
    cache: 'no-store' // Equivalent to getServerSideProps
  })
  return response.json()
}
\`\`\`

### Client-Side State Management
Quiz functionality uses useReducer for complex state management:
\`\`\`typescript
const [state, dispatch] = useReducer(quizReducer, initialState)
\`\`\`

### Image Optimization
All images use next/image for automatic optimization:
\`\`\`typescript
<Image
  src="/placeholder.svg?height=80&width=80"
  alt="Quiz Platform Logo"
  width={80}
  height={80}
  priority
/>
\`\`\`

### Data Fetching Strategy

Due to the challenges of making HTTP requests during build time and server-side rendering in the development environment, this implementation uses a hybrid approach:

**Server Components (SSG/SSR)**: Import mock data directly from the lib/mock-data.ts file. This simulates database queries and ensures reliable server-side rendering.

**API Routes**: Remain fully functional for any client-side data fetching needs and demonstrate proper Next.js API route implementation.

**Production Considerations**: In a production environment, you would:
- Replace mock data imports with actual database queries
- Use environment variables to determine data source
- Implement proper error handling and fallbacks
- Consider using a database connection pool for optimal performance

This approach ensures the application works reliably while still demonstrating all required Next.js concepts (SSG, SSR, API Routes, Dynamic Routing).

## 🧪 Testing

The application includes comprehensive testing coverage:

- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: API routes and data fetching
- **E2E Tests**: Complete user workflows

Run tests with:
\`\`\`bash
npm test
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Deployment
\`\`\`bash
npm run build
npm run start
\`\`\`

## 🎨 Design Decisions

1. **App Router over Pages Router**: Leveraged Next.js 13+ App Router for better performance and developer experience
2. **Tailwind CSS**: Chosen for rapid development and consistent design system
3. **TypeScript**: Ensures type safety and better developer experience
4. **useReducer over useState**: Complex quiz state management benefits from reducer pattern
5. **Mock Data**: Simplified data layer focuses on Next.js concepts rather than database complexity

## 🔧 Challenges & Solutions

### Challenge: Implementing SSG vs SSR
**Solution**: Used App Router's caching strategies (`force-cache` vs `no-store`) to achieve the required rendering behaviors.

### Challenge: Client-Server State Synchronization
**Solution**: Separated concerns with Server Components for data fetching and Client Components for interactivity.

### Challenge: Dynamic Metadata Generation
**Solution**: Implemented `generateMetadata` function for SEO-optimized dynamic pages.

## 🤖 AI Development Tools

This project was developed with assistance from AI coding tools:

- **Code Generation**: AI helped generate boilerplate components and API routes
- **Problem Solving**: AI assisted in debugging complex state management issues
- **Documentation**: AI contributed to comprehensive README and code comments
- **Testing**: AI helped create test cases and scenarios

## 📈 Performance Optimizations

- Static generation for frequently accessed pages
- Image optimization with next/image
- Code splitting with dynamic imports
- Efficient state management with useReducer
- Proper caching strategies for API calls

## 🔮 Future Enhancements

- User authentication and progress tracking
- Quiz creation interface for administrators
- Real-time multiplayer quiz functionality
- Advanced analytics and reporting
- Mobile app with React Native

## 📄 License

This project is licensed under the MIT License.
