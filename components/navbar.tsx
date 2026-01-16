"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Videogen
            </span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium hidden sm:block">
              Sign In
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-sm btn-hover">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
