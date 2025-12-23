import { revalidateTag, revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // Walidacja secretu
  const secret = request.nextUrl.searchParams.get("secret")

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const { tag, path } = body

    // Jeśli brak tag i path, rewaliduj wszystko
    if (!tag && !path) {
      revalidatePath("/", "layout") // Rewaliduje całą stronę od roota
      console.log("Revalidated entire site")

      return NextResponse.json({
        revalidated: true,
        scope: "all",
        timestamp: Date.now(),
      })
    }

    // Rewaliduj po tagu (preferowane)
    if (tag) {
      revalidateTag(tag, "default")
      console.log(`Revalidated tag: ${tag}`)
    }

    // Lub rewaliduj po ścieżce
    if (path) {
      revalidatePath(path, "page")
      console.log(`Revalidated path: ${path}`)
    }

    return NextResponse.json({
      revalidated: true,
      tag,
      path,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 },
    )
  }
}
