"use client"

import { Zap } from "lucide-react"

interface DurationSelectorProps {
  selected: number
  onSelect: (duration: number) => void
}

const DURATIONS = [3, 5, 8, 10, 15]

export function DurationSelector({ selected, onSelect }: DurationSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
      </div>

      <div className="flex gap-3 flex-wrap">
        {DURATIONS.map((duration) => (
          <button
            key={duration}
            onClick={() => onSelect(duration)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              selected === duration
                ? "bg-gradient-to-r from-primary to-secondary text-white scale-105 shadow-lg shadow-primary/20 ring-2 ring-primary/50"
                : "bg-white/10 text-foreground hover:bg-white/20 border border-border/20"
            }`}
          >
            {duration}s
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">Longer duration may take more time to generate</p>
    </div>
  )
}
