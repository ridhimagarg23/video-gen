"use client"

import { Play } from "lucide-react"

interface GalleryCard {
  id: string
  style: string
  duration: number
  prompt: string
  thumbnail: string
}

const EXAMPLE_GALLERY: GalleryCard[] = [
  {
    id: "1",
    style: "Cinematic",
    duration: 8,
    prompt: "A breathtaking sunrise over misty mountains with dramatic lighting",
    thumbnail: "/cinematic-sunrise-misty-mountains-dramatic-lightin.jpg",
  },
  {
    id: "2",
    style: "Anime",
    duration: 5,
    prompt: "Magical girl transformation sequence with sparkles and ribbons",
    thumbnail: "/anime-magical-girl-transformation-sparkles.jpg",
  },
  {
    id: "3",
    style: "3D Pixar",
    duration: 10,
    prompt: "Cute animated character walking through a colorful candy world",
    thumbnail: "/pixar-3d-animated-character-candy-world.jpg",
  },
  {
    id: "4",
    style: "Cyberpunk",
    duration: 8,
    prompt: "Neon-lit digital cityscape with flying vehicles and holographic signs",
    thumbnail: "/cyberpunk-neon-city-flying-vehicles.jpg",
  },
  {
    id: "5",
    style: "Realistic",
    duration: 5,
    prompt: "Ocean waves crashing on a tropical beach at golden hour",
    thumbnail: "/ocean-waves-tropical-beach-sunset.jpg",
  },
  {
    id: "6",
    style: "Fantasy",
    duration: 15,
    prompt: "Epic dragon flying over enchanted castle ruins with magical aura",
    thumbnail: "/fantasy-dragon-flying-castle-magical.jpg",
  },
]

export function GallerySection() {
  const handleUsePrompt = (prompt: string) => {
    // This would populate the generator section with this prompt
    console.log("Using prompt:", prompt)
  }

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Get Inspired - Amazing Videos Created with videogen
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">Click any prompt to generate a similar Video.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXAMPLE_GALLERY.map((item, index) => (
          <div
            key={item.id}
            className="group rounded-2xl overflow-hidden border border-border/40 hover:border-primary/60 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 aspect-video overflow-hidden">
              <img
                src={item.thumbnail || "/placeholder.svg"}
                alt={item.prompt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="w-14 h-14 bg-white/20 group-hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Play className="w-7 h-7 text-white fill-white" />
                </div>
              </div>
            </div>

            <div className="p-5 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1.5 bg-gradient-to-r from-primary/30 to-accent/30 text-primary rounded-lg text-xs font-semibold border border-primary/20">
                  {item.style}
                </span>
                <span className="text-xs font-medium text-muted-foreground bg-white/10 px-2.5 py-1.5 rounded-lg">
                  {item.duration}s
                </span>
              </div>

              <p className="text-sm text-foreground line-clamp-2 mb-4 leading-relaxed">{item.prompt}</p>

              <button
                onClick={() => handleUsePrompt(item.prompt)}
                className="w-full py-2.5 bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent text-white rounded-lg font-semibold transition-all duration-300 text-sm whitespace-nowrap"
              >
                Generate similar Video
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
