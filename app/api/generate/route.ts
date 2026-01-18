export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt, style, duration, aspect_ratio } = body

    // Validation
    if (!prompt || !style) {
      return Response.json(
        { status: "error", message: "Missing required fields: prompt, style" },
        { status: 400 }
      )
    }

    // Call Flask backend
    const flaskUrl = process.env.FLASK_API_URL || "http://localhost:5000"

    const response = await fetch(`${flaskUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        style,
        duration,      // optional
        aspect_ratio,  // optional
      }),
    })

    // const data = await response.json()
    const text = await response.text()
    console.log("FLASK RAW RESPONSE:", text)

    let data
    try {
      data = JSON.parse(text)
    } catch {
      return Response.json(
        { status: "error", message: "Flask returned HTML/Non-JSON", raw: text },
        { status: 500 }
      )
    }


    // If Flask returns error
    if (!response.ok) {
      return Response.json(
        { status: "error", message: data?.message || "Flask error", data },
        { status: response.status }
      )
    }

    // Expected Flask response includes:
    // refined_prompt + video_url
    return Response.json({
      status: "success",
      refined_prompt: data.refined_prompt,
      video_url: data.video_url,
      prediction_id: data.prediction_id,
      time_taken_sec: data.time_taken_sec,
    })
  } catch (error) {
    console.error("API Error:", error)
    return Response.json(
      { status: "error", message: "Server error" },
      { status: 500 }
    )
  }
}
