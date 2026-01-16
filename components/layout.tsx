"use client"

import type React from "react"

import { Navbar } from "./navbar"
import { ToastProvider } from "./toast-provider"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
    </ToastProvider>
  )
}
