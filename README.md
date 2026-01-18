# Video Gen — AI Prompt Refinement and Text-to-Video Generation

Video Gen is a full-stack AI application that refines user prompts into high-quality video-generation prompts and then generates short videos using a text-to-video model. The project combines prompt engineering with automated video generation to produce more consistent and visually aligned results.

---

## Overview

The application is designed around a two-stage pipeline:

1. Prompt refinement to enhance clarity, detail, and style consistency  
2. Text-to-video generation using the refined prompt as input  

This approach improves output quality compared to directly sending raw user prompts to a video model.

---

## Key Features

- Prompt refinement for improved video generation quality
- Style-aware prompt enhancement (e.g., cinematic, realistic, animated)
- Text-to-video generation using a hosted inference model
- Prediction tracking with status polling until completion
- Returns generation metadata:
  - output video URL
  - prediction ID
  - time taken for generation

---

## Tech Stack

Frontend:
- Next.js
- React
- Tailwind CSS
- Radix UI
- React Hook Form
- Zod

AI / API Integrations:
- Perplexity API (prompt refinement)
- Replicate API (video generation)

---

## Models Used

Prompt Refinement:
- Provider: Perplexity
- Model: sonar
- Purpose: Enhances and rewrites user prompts into a format optimized for video generation

Video Generation:
- Provider: Replicate
- Model: minimax/video-01
- Purpose: Generates short videos from text prompts

---

## How It Works

1. The user submits a prompt and selects a style  
2. The prompt is refined using Perplexity to produce a video-ready version  
3. The refined prompt is sent to Replicate for video generation  
4. The system waits for the prediction to complete and returns the final output  

---

## Environment Variables

The project requires the following environment variables:

- REPLICATE_API_TOKEN  
- PERPLEXITY_API_KEY  

These values should be stored in a `.env` file and must not be committed to source control.

---

## Running the Project Locally

1. Install dependencies  
```bash
npm install
2. Start the developement server
npm run dev
3. Build and run in production mode
npm run build
npm start
