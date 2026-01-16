"use client"

import { Download, Copy, RotateCcw, AlertCircle, Loader } from "lucide-react"
import type { GeneratorState, GenerationResult } from "./generator-section"

interface PreviewPanelProps {
  result: GenerationResult
  state: GeneratorState
  onCopyPrompt: () => void
  onGenerateAgain: () => void
}

export function PreviewPanel({ result, state, onCopyPrompt, onGenerateAgain }: PreviewPanelProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-gradient-shift opacity-60"></div>
        <div
          className="absolute top-1/2 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-gradient-shift opacity-60"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="sticky top-24 bg-card/50 border border-border/40 rounded-2xl p-6 backdrop-blur-sm hover:border-border/60 transition-all duration-300">
  
{/* Main Preview Area */}
{result.status === "idle" && (
  <div className="text-center space-y-4 py-12">

    {/* Outer box (main container) */}
    <div className="relative group max-w-4xl mx-auto rounded-3xl">

      {/* Glow OUTER box */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl opacity-40 blur-xl group-hover:opacity-70 transition-opacity duration-300"></div>

      {/* Outer box body */}
      <div className="relative bg-card/30 border border-primary/20 rounded-3xl shadow-2xl p-10 backdrop-blur-md">

        {/* Small circle icon (top) */}
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <div className="w-8 h-8 text-primary/40" />
        </div>

        {/* Inner preview box */}
        <div className="relative bg-card border-2 border-primary/20 rounded-2xl overflow-hidden shadow-xl max-w-3xl mx-auto">

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 aspect-video flex items-center justify-center relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

            {/* TEXT INSIDE INNER BOX */}
            <div className="relative z-10 text-center">
              <p className="text-muted-foreground text-sm">
                Your video will appear here
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Configure and generate to see preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

        {result.status === "loading" && (
          <div className="text-center space-y-4 py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto animate-glow-pulse">
              <Loader className="w-8 h-8 text-white animate-spin" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Generating video...</p>
              <p className="text-sm text-muted-foreground">This may take a moment</p>
            </div>
          </div>
        )}

        {result.status === "success" && result.data && (
          <div className="space-y-4">
            <div className="bg-background border border-border/40 rounded-xl overflow-hidden shadow-lg group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
              <video src={result.data.video_url} controls className="w-full h-full" />
            </div>
            <div className="bg-background/50 border border-border/40 rounded-lg p-3 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Refined Prompt:</p>
              <p className="text-xs text-foreground whitespace-pre-wrap break-words">{result.data.refined_prompt}</p>

            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2 bg-primary/20 text-primary rounded-lg font-medium hover:bg-primary/30 transition-all duration-300 text-sm flex items-center justify-center gap-2 group">
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Download</span>
              </button>
              <button
                onClick={onCopyPrompt}
                className="py-2 bg-accent/20 text-accent rounded-lg font-medium hover:bg-accent/30 transition-all duration-300 text-sm flex items-center justify-center gap-2 group"
              >
                <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Copy</span>
              </button>
            </div>
            <button
              onClick={onGenerateAgain}
              className="w-full py-2 border border-border/40 text-foreground rounded-lg font-medium hover:bg-card transition-all duration-300 text-sm flex items-center justify-center gap-2 group"
            >
              <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              New
            </button>
          </div>
        )}

        {result.status === "error" && (
          <div className="text-center space-y-4 py-12">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <p className="font-semibold text-red-600">Generation Failed</p>
              <p className="text-sm text-muted-foreground mt-1">{result.error}</p>
            </div>
            <button
              onClick={onGenerateAgain}
              className="w-full py-2 mt-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 text-sm"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


