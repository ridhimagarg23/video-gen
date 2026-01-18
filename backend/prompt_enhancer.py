import os
import requests
from dotenv import load_dotenv

load_dotenv()

PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")

def refine_prompt_with_perplexity(prompt, style):
    url = "https://api.perplexity.ai/chat/completions"

    system_message = (
        "You are a prompt refiner for AI video generation.\n"
        "Return ONLY the refined prompt.\n"
        "Do NOT add explanations, disclaimers, notes, headings, or bullet points.\n"
        "Do NOT mention policies or your role.\n"
        "Output must be plain text only."
    )

    user_message = f"""
Refine and enhance the following prompt for AI video generation.

Prompt: {prompt}
Style: {style}

IMPORTANT:
- Return ONLY the refined prompt text.
- No extra lines like "Refined Prompt:".
- No explanations.
"""

    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "sonar",
        "messages": [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ]
    }

    response = requests.post(url, headers=headers, json=payload, timeout=60)
    response.raise_for_status()

    data = response.json()
    refined = data["choices"][0]["message"]["content"]

    refined = refined.replace("Refined Prompt:", "").strip()
    return refined
