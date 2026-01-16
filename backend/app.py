import os
from dotenv import load_dotenv
import requests

from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")

@app.route("/", methods=["GET"])
def home():
    return "Flask backend is running!"

def refine_prompt_with_perplexity(prompt, style, duration, aspect_ratio):
    url = "https://api.perplexity.ai/chat/completions"

    system_message = (
        "You are a Prompt Engineer. Your task is to take the user's input and enhance/refine "
        "the prompt for better video generation. The user will provide: (1) a prompt, "
        "(2) duration, (3) style, (4) aspect ratio. Return ONLY the refined prompt text."
    )

    user_message = f"""
Prompt: {prompt}
Style: {style}
Duration: {duration} seconds
Aspect Ratio: {aspect_ratio}
"""

    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "sonar-pro",
        "messages": [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ]
    }

    response = requests.post(url, headers=headers, json=payload, timeout=60)
    response.raise_for_status()

    data = response.json()
    refined = data["choices"][0]["message"]["content"]
    return refined.strip()

@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.get_json()

    prompt = data.get("prompt")
    style = data.get("style")
    duration = data.get("duration")
    aspect_ratio = data.get("aspect_ratio")

    if not prompt or not style or not duration or not aspect_ratio:
        return jsonify({
            "status": "error",
            "message": "Missing required fields",
            "received": data
        }), 400

    if not PERPLEXITY_API_KEY:
        return jsonify({
            "status": "error",
            "message": "PERPLEXITY_API_KEY is missing in .env"
        }), 500

    try:
        refined_prompt = refine_prompt_with_perplexity(prompt, style, duration, aspect_ratio)

        return jsonify({
            "status": "success",
            "message": "Prompt refined successfully",
            "video_url": "https://www.w3schools.com/html/mov_bbb.mp4",
            "refined_prompt": refined_prompt
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
