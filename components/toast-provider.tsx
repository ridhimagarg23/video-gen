"use client"

import type React from "react"
import { useState } from "react"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg text-white font-medium shadow-lg animate-fade-in-up ${
              toast.type === "success" ? "bg-green-500" : toast.type === "error" ? "bg-red-500" : "bg-blue-500"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </>
  )
}
