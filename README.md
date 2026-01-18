# 🎥 Video Gen — AI Text-to-Video Generator (Next.js + Replicate + Perplexity)

A full-stack AI Video Generation project that:
1) Takes a user prompt + style  
2) Refines the prompt using **Perplexity (Sonar model)**  
3) Generates a short AI video using **Replicate (minimax/video-01)**  
4) Returns the final video URL + generation metadata

---

## ✨ Features

- ✅ Text → Refined Prompt (Perplexity Sonar)
- ✅ Refined Prompt → Video (Replicate Minimax / Hailuo)
- ✅ Supports styles (cinematic / realistic / anime / etc.)
- ✅ Returns:
  - video URL
  - prediction ID
  - time taken (seconds)
- ✅ Built with modern UI stack (Radix UI + Tailwind + React Hook Form)

---

## 🧠 Tech Stack

### Frontend
- **Next.js 16**
- **React 19**
- **Tailwind CSS**
- **Radix UI**
- **React Hook Form + Zod**

### Backend / AI Integrations
- **Replicate API** (Video Generation)
- **Perplexity API** (Prompt Refinement)

---

## 📦 Dependencies Used (Important Imports)

### AI / API
- `replicate` → used to create and poll video generation predictions
- `requests` → used to call Perplexity Chat Completions API
- `dotenv` → loads API keys from `.env`

### Node / UI (from package.json)
- `next`, `react`, `react-dom`
- `replicate` (Node SDK)
- `zod`, `react-hook-form`
- `@radix-ui/*` components
- `lucide-react`, `recharts`, etc.

---

## 🎬 Video Generation (Replicate)

### Model Used
- **Replicate Model:** `minimax/video-01`
- Default model in code:
  ```py
  def generate_video_with_replicate(prompt: str, model: str = "minimax/video-01"):
How it Works
Creates a prediction:

py
Copy code
replicate.predictions.create(
    model=model,
    input={"prompt": prompt}
)
Polls until status becomes:

succeeded

failed

canceled

Output
If succeeded:

returns video_url

returns prediction_id

returns time_taken_sec

✍️ Prompt Refinement (Perplexity)
Model Used
Perplexity model: sonar

Endpoint Used
https://api.perplexity.ai/chat/completions

Behavior
The system prompt ensures:

ONLY refined prompt is returned

No extra headings like “Refined Prompt:”

No explanation text

🔑 Environment Variables
Create a .env file in the root and add:

env
Copy code
REPLICATE_API_TOKEN=your_replicate_api_token
PERPLEXITY_API_KEY=your_perplexity_api_key
🚀 Run Locally
1) Install dependencies
bash
Copy code
npm install
2) Start development server
bash
Copy code
npm run dev
3) Build for production
bash
Copy code
npm run build
npm start
🧾 API Keys / Credits Info
Replicate Credits
Video generation uses Replicate credits

Billing depends on the model provider + video duration / compute

Perplexity Credits
Prompt refinement uses Perplexity API credits

Model used: Sonar

You must have an active API key with remaining credits

📜 License & Attribution
This project uses external services and libraries:

External Services
Replicate API (video generation)

Perplexity API (prompt refinement)

Libraries
replicate SDK

requests

python-dotenv

Next.js, React, Tailwind, Radix UI, etc.

⚠️ Note: The generated videos are subject to the terms of the model provider (minimax/video-01) and Replicate’s policies.

📌 Notes / Best Practices
Never expose API keys in frontend code

Always keep .env in .gitignore

Polling is done every 5 seconds until completion

Handle failed predictions gracefully

👤 Author
Ridhima Garg
GitHub: ridhimagarg23
