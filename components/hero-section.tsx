"use client"

import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const scrollToGenerator = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
        {/* Main Headline */}
        <div className="space-y-6">
          <div className="inline-block">
            <span
              className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-sm text-primary font-semibold animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              AI-Powered Video Generation
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Turn text into{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              stunning videos
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Create professional-quality videos in seconds. Just describe what you want to see, and let AI handle the
            rest.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <button
            onClick={scrollToGenerator}
            className="group px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold btn-hover shadow-lg shadow-primary/40 flex items-center justify-center gap-2"
          >
            Start Creating
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
