"use client"

import { Wand2 } from "lucide-react"

interface StyleSelectorProps {
  selected: string
  onSelect: (style: string) => void
}

const STYLES = [
  { id: "Cinematic", label: "Cinematic", emoji: "🎬" },
  { id: "Anime", label: "Anime", emoji: "🌸" },
  { id: "3D Pixar", label: "3D Pixar", emoji: "🧊" },
  { id: "Realistic", label: "Realistic", emoji: "📷" },
  { id: "Cyberpunk", label: "Cyberpunk", emoji: "🌌" },
  { id: "Cartoon", label: "Cartoon", emoji: "🪄" },
  { id: "Fantasy", label: "Fantasy", emoji: "🧿" },
  { id: "Travel Vlog", label: "Travel Vlog", emoji: "🏝️" },
]

export function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
      </div>

      <div className="grid grid-cols-4 gap-3">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={`p-4 rounded-xl font-medium transition-all duration-200 flex flex-col items-center gap-2 ${
              selected === style.id
                ? "bg-gradient-to-r from-primary to-secondary text-white ring-2 ring-primary/50 scale-105 shadow-lg shadow-primary/20"
                : "bg-white/10 text-foreground hover:bg-white/20 border border-border/20"
            }`}
          >
            <div className="text-3xl">{style.emoji}</div>
            <div className="text-xs text-center leading-tight">{style.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
