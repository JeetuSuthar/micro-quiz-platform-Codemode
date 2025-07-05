// Utility function to get the correct base URL for API calls
export function getBaseUrl(): string {
  // In production, use the environment variable
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL
  }

  // In development or build time, use localhost
  if (typeof window === "undefined") {
    // Server-side
    return process.env.NODE_ENV === "production"
      ? "https://your-app-domain.vercel.app" // Replace with your actual domain
      : "http://localhost:3000"
  }

  // Client-side
  return ""
}

// Generic API fetch function with error handling
export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const baseUrl = getBaseUrl()
    const url = `${baseUrl}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error)
    return null
  }
}
