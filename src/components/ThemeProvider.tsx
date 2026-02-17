"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// We can just use React.ComponentProps to get the types automatically
// instead of trying to import specific internal types that might move.
export function ThemeProvider({ 
  children, 
  ...props 
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}