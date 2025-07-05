import { NextResponse } from "next/server"
import { categories } from "@/lib/mock-data"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json(categories)
}
