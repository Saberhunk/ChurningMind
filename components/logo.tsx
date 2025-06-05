"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && theme === "dark"

  const dimensions = {
    small: { width: 28, height: 28, fontSize: 12 },
    default: { width: 36, height: 36, fontSize: 16 },
    large: { width: 48, height: 48, fontSize: 20 },
  }

  const { width, height, fontSize } = dimensions[size]

  return (
    <div className="relative" style={{ width, height }}>
      {/* Animated glow effect */}
      <div
        className="absolute inset-0 rounded-full blur-md animate-pulse"
        style={{
          background: "linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)",
          opacity: 0.7,
        }}
      />

      {/* Logo shape */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hexagon background */}
          <path
            d="M12 2L4 6V12C4 15.31 7.58 20 12 22C16.42 20 20 15.31 20 12V6L12 2Z"
            stroke="url(#logoGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isDark ? "rgba(131, 58, 180, 0.3)" : "rgba(131, 58, 180, 0.1)"}
          />

          {/* CX text */}
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="url(#logoGradient)"
            fontWeight="bold"
            fontSize={fontSize}
            fontFamily="monospace"
            style={{ letterSpacing: "-0.5px" }}
          >
            CX
          </text>

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#833ab4" />
              <stop offset="50%" stopColor="#fd1d1d" />
              <stop offset="100%" stopColor="#fcb045" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Animated particle effect */}
      <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent animate-ping"></div>
    </div>
  )
}
