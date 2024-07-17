"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()

  /* We don't want this component to render until it's mounted,
  as the server doesn't understand nor care about a user's theme preference */

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <ThemeToggleWrapper className="h-10 w-10">
        <Skeleton className="rounded-full bg-accent h-4 w-4 mt-3 mr-3" />
      </ThemeToggleWrapper>
    )
  }

  return (
    <ThemeToggleWrapper>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Choose between dark and light modes"
          >
            <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 h-4 w-4" />
            <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 h-4 w-4" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background">
          {["light", "dark", "system"].map((theme) => (
            <DropdownMenuItem
              className="capitalize hover:cursor-pointer"
              key={theme}
              onClick={() => setTheme(theme)}
            >
              {theme}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ThemeToggleWrapper>
  )
}

export function ThemeContextProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

function ThemeToggleWrapper({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn("flex justify-end", className)}>{children}</div>
}
