"use client"

import type { GeneratorState } from "./generator-section"

interface HistorySectionProps {
  history: GeneratorState[]
  onRegenerate: (item: GeneratorState) => void
}

export function HistorySection({ history, onRegenerate }: HistorySectionProps) {
  if (history.length === 0) {
    return null
  }

  return (
    <section id="history" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/20">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2">Recent Generations</h2>
        <p className="text-muted-foreground">Your last 5 video generations</p>
      </div>

      <div className="space-y-3">
        {history.map((item, idx) => (
          <div
            key={idx}
            className="glass p-4 flex items-center justify-between gap-4 group hover:bg-white/50 transition-all"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{item.prompt}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{item.style}</span>
                <span className="text-xs text-muted-foreground">{item.duration}s</span>
                <span className="text-xs text-muted-foreground">{item.aspectRatio}</span>
              </div>
            </div>

            <button
              onClick={() => onRegenerate(item)}
              className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all text-sm whitespace-nowrap"
            >
              Regenerate
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
