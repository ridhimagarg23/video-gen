"use client"

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  maxLength: number
}

export function PromptInput({ value, onChange, maxLength }: PromptInputProps) {
  return (
    <div className="glass p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Prompt</h3>
        <span className="text-sm text-muted-foreground">
          {value.length}/{maxLength}
        </span>
      </div>

      <div className="flex gap-2 mb-4">
        <button className="px-4 py-2 bg-primary/20 text-primary rounded-lg font-medium hover:bg-primary/30 transition-colors text-sm">
          ✨ Enhance Prompt
        </button>
        <button className="px-4 py-2 bg-secondary/20 text-secondary rounded-lg font-medium hover:bg-secondary/30 transition-colors text-sm">
          🎲 Surprise Me
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder="Example: A cinematic shot of a neon cyberpunk city at night, rain reflections, smooth camera movement…"
        className="w-full h-32 bg-white/40 border border-white/20 rounded-xl p-4 text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
      />

      <p className="text-xs text-muted-foreground">Tip: add lighting + camera movement for best results</p>
    </div>
  )
}
