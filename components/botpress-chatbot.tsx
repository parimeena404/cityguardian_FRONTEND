"use client"

import { useState } from "react"
import { MessageCircle, X, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BotpressChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleBackButton = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <>
      {/* Floating Chat Button - Made smaller */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-green-400 hover:bg-green-500 rounded-full shadow-lg shadow-green-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
          title="Chat with CityGuardian Assistant"
        >
          <MessageCircle className="w-6 h-6 text-black" />
        </button>
      )}

      {/* Chat Window - Made smaller */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 h-96 bg-black border-2 border-green-400/50 rounded-lg shadow-2xl shadow-green-500/30 flex flex-col overflow-hidden">
          {/* Header with Back Button */}
          <div className="bg-black border-b-2 border-green-400/50 text-green-400 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handleBackButton}
                className="hover:bg-green-400/10 rounded-full p-1 transition-colors mr-2"
                aria-label="Go back"
                title="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-sm font-mono">CITYGUARDIAN</h3>
                <p className="text-xs text-green-300/70 font-mono">AI ASSISTANT</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-400/10 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Botpress Webchat Iframe */}
          <div className="flex-1 relative">
            <iframe
              src="https://cdn.botpress.cloud/webchat/v3.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/11/06/19/20251106193508-2J3C80EK.json"
              className="w-full h-full border-0"
              title="CityGuardian Chatbot"
              allow="microphone; camera"
            />
          </div>
        </div>
      )}
    </>
  )
}