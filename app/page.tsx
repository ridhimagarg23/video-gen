"use client"

import { Layout } from "@/components/layout"
import { HeroSection } from "@/components/hero-section"
import { GeneratorSection } from "@/components/generator-section"
import { GallerySection } from "@/components/gallery-section"
import { HistorySection } from "@/components/history-section"
import { useState } from "react"
import type { GeneratorState } from "@/components/generator-section"

export default function Home() {
  const [history, setHistory] = useState<GeneratorState[]>([])

  const handleRegenerate = (item: GeneratorState) => {
    const generator = document.getElementById("generator")
    generator?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Layout>
      <div className="bg-background">
        <HeroSection />
        <GeneratorSection />
        <GallerySection />
        <HistorySection history={history} onRegenerate={handleRegenerate} />

        <footer className="border-t border-border bg-card/30 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  videogen
                </h3>
                <p className="text-sm text-muted-foreground">Transform your ideas into stunning Videos with AI</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-sm">Connect</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Discord
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2026 Videogen. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  )
}
