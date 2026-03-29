"use client"
import { Loader2 } from 'lucide-react'

interface LanguageLoadingOverlayProps {
  isLoading: boolean
}

export default function LanguageLoadingOverlay({ isLoading }: LanguageLoadingOverlayProps) {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-md z-50 flex items-center justify-center transition-opacity duration-300">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          <div className="absolute inset-0 w-12 h-12 animate-ping bg-blue-600/20 rounded-full"></div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold text-gray-900">
            Setting up your language
          </p>
          <p className="text-sm text-gray-600">
            Please wait...
          </p>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}
