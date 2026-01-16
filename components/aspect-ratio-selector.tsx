"use client"

import { Monitor } from "lucide-react"

interface AspectRatioSelectorProps {
  selected: string
  onSelect: (ratio: string) => void
}

const RATIOS = [
  { id: "16:9", label: "YouTube", emoji: "📺" },
  { id: "9:16", label: "Reels/TikTok", emoji: "📱" },
  { id: "1:1", label: "Instagram", emoji: "🟦" },
]

export function AspectRatioSelector({ selected, onSelect }: AspectRatioSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
      </div>

      <div className="grid grid-cols-3 gap-3">
        {RATIOS.map((ratio) => (
          <button
            key={ratio.id}
            onClick={() => onSelect(ratio.id)}
            className={`p-4 rounded-xl font-medium transition-all duration-200 flex flex-col items-center gap-2 ${
              selected === ratio.id
                ? "bg-gradient-to-r from-primary to-secondary text-white ring-2 ring-primary/50 scale-105 shadow-lg shadow-primary/20"
                : "bg-white/10 text-foreground hover:bg-white/20 border border-border/20"
            }`}
          >
            <div className="text-3xl">{ratio.emoji}</div>
            <div className="text-xs text-center leading-tight">{ratio.label}</div>
            <div className="text-xs opacity-70 font-medium">{ratio.id}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
