export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { prompt, style, duration, aspect_ratio } = body

    // Validation
    if (!prompt || !style || !duration || !aspect_ratio) {
      return Response.json({ status: "error", message: "Missing required fields" }, { status: 400 })
    }

    // Call Flask backend
    const flaskUrl = process.env.FLASK_API_URL || "http://localhost:5000"
    const response = await fetch(`${flaskUrl}/api/generate-video`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        style,
        duration,
        aspect_ratio,
      }),
    })

    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return Response.json({ status: "error", message: "Server error" }, { status: 500 })
  }
}
