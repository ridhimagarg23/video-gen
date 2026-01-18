import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

from prompt_enhancer import refine_prompt_with_perplexity
from video_gen import generate_video_with_replicate

load_dotenv()

app = Flask(__name__)
CORS(app)

PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")


@app.route("/", methods=["GET"])
def home():
    return "Flask backend is running!"


@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.get_json(silent=True) or {}


    prompt = data.get("prompt")
    style = data.get("style")
    duration = data.get("duration")
    aspect_ratio = data.get("aspect_ratio")

    if not prompt or not style:
        return jsonify({
            "status": "error",
            "message": "Missing required fields: prompt, style",
            "received": data
        }), 400

    if not PERPLEXITY_API_KEY:
        return jsonify({
            "status": "error",
            "message": "PERPLEXITY_API_KEY is missing in .env"
        }), 500

    try:
        # 1) refine prompt
        refined_prompt = refine_prompt_with_perplexity(prompt, style)

        # 2) generate video using refined prompt
        video_url, prediction_id, time_taken_sec = generate_video_with_replicate(refined_prompt)

        # 3) send everything to frontend
        return jsonify({
            "status": "success",
            "message": "Video generated successfully",
            "refined_prompt": refined_prompt,
            "video_url": video_url,
            "prediction_id": prediction_id,
            "time_taken_sec": time_taken_sec,
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
