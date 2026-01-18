"use client"

import { useState } from "react"
import { Wand2, Zap, Monitor } from "lucide-react"
import { PromptInput } from "./prompt-input"
import { StyleSelector } from "./style-selector"
import { DurationSelector } from "./duration-selector"
import { AspectRatioSelector } from "./aspect-ratio-selector"
import { PreviewPanel } from "./preview-panel"

export interface GeneratorState {
  prompt: string
  style: string
  duration: number
  aspectRatio: string
}

export interface GenerationResult {
  status: "idle" | "loading" | "success" | "error"
  data?: {
    video_url: string
    refined_prompt: string
    message: string
  }
  error?: string
}

export function GeneratorSection() {
  const [state, setState] = useState<GeneratorState>({
    prompt: "",
    style: "Cinematic",
    duration: 5,
    aspectRatio: "16:9",
  })

  const [result, setResult] = useState<GenerationResult>({ status: "idle" })
  const [history, setHistory] = useState<GeneratorState[]>([])

  const handleGenerate = async () => {
    if (!state.prompt.trim()) {
      alert("Please enter a prompt")
      return
    }

    setResult({ status: "loading" })

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: state.prompt,
          style: state.style,
          duration: state.duration,
          aspect_ratio: state.aspectRatio,
        }),
      })

      const data = await response.json()

      if (data.status === "success") {
        setResult({
          status: "success",
          data: {
            video_url: data.video_url,
            refined_prompt: data.refined_prompt,
            message: data.message,
          },
        })
        setHistory([state, ...history.slice(0, 4)])
      } else {
        setResult({
          status: "error",
          error: data.message || "Generation failed",
        })
      }
    } catch (error) {
      setResult({
        status: "error",
        error: error instanceof Error ? error.message : "Connection error",
      })
    }
  }

  const handleCopyPrompt = () => {
    if (result.data?.refined_prompt) {
      navigator.clipboard.writeText(result.data.refined_prompt)
    }
  }

  const handleGenerateAgain = () => {
    setResult({ status: "idle" })
  }

  return (
    <section id="generator" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Create Your Video
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Configure your video in just a few clicks and watch AI bring your vision to life
          </p>
        </div>

        <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {/* Prompt Input Card */}
          <div className="bg-card/50 border border-border/40 rounded-2xl p-8 backdrop-blur-sm hover:border-border/60 transition-all duration-300">
            <PromptInput value={state.prompt} onChange={(prompt) => setState({ ...state, prompt })} maxLength={500} />
          </div>

          {/* Settings Grid - Improved spacing */}
          <div className="space-y-8">
            {/* Style Section */}
            <div className="bg-card/50 border border-border/40 rounded-2xl p-8 backdrop-blur-sm hover:border-border/60 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Wand2 className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">Style</h3>
              </div>
              <StyleSelector selected={state.style} onSelect={(style) => setState({ ...state, style })} />
            </div>

            {/* Duration Section */}
            <div className="bg-card/50 border border-border/40 rounded-2xl p-8 backdrop-blur-sm hover:border-border/60 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold">Duration</h3>
              </div>
              <DurationSelector selected={state.duration} onSelect={(duration) => setState({ ...state, duration })} />
            </div>

            {/* Aspect Ratio Section */}
            <div className="bg-card/50 border border-border/40 rounded-2xl p-8 backdrop-blur-sm hover:border-border/60 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Monitor className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">Aspect Ratio</h3>
              </div>
              <AspectRatioSelector
                selected={state.aspectRatio}
                onSelect={(aspectRatio) => setState({ ...state, aspectRatio })}
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!state.prompt.trim() || result.status === "loading"}
            className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-lg"
          >
            {result.status === "loading" ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Generate Video
              </>
            )}
          </button>

          {/* Preview Panel - Full Width */}
          <PreviewPanel
            result={result}
            state={state}
            onCopyPrompt={handleCopyPrompt}
            onGenerateAgain={handleGenerateAgain}
          />
        </div>
      </div>
    </section>
  )
}
