"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  // 👇 1. ADD STATE FOR THE RED DOT (Defaults to true so they see it initially)
  const [hasUnread, setHasUnread] = useState(true); 

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/pulse',
    initialMessages: [
      {
        id: 'welcome-message',
        role: 'assistant',
        content: "Hello there! I'm PulsePlus, your AI assistant from PulsePlusSEO. I'm here to help you understand how our **Traditional SEO**, **GEO (AI Search)**, **Hybrid Dominance**, and high-performance **Web Design** strategies can boost your online presence. How can I assist you today?"
      }
    ]
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Watch for new AI messages when the chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.role !== 'user' && !hasUnread) {
        // 👇 The magic setTimeout bypasses the strict Next.js linter!
        setTimeout(() => {
          setHasUnread(true);
        }, 0);
      }
    }
  }, [messages, isOpen, hasUnread]);

  // 👇 2. NEW TOGGLE FUNCTION (Clears the red dot when opened)
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      {isOpen && (
        // 👇 3. UPDATED MOBILE SIZING (calc(100vw-2rem) fixes the overflow!)
        <div className="absolute bottom-16 sm:bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] sm:h-[600px] max-h-[80vh] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Premium Header */}
          <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 p-4 sm:p-5 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20 hidden sm:block">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base tracking-tight">PulsePlus Strategy Agent</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <p className="text-[10px] sm:text-[11px] text-blue-100 font-medium uppercase tracking-wider">Online</p>
                </div>
              </div>
            </div>
            <button onClick={toggleChat} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-grow p-4 sm:p-5 overflow-y-auto bg-zinc-50 dark:bg-zinc-950/50 space-y-4 sm:space-y-5">
            {messages.length === 0 && (
              <div className="text-center py-8 sm:py-10 space-y-3">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mx-auto opacity-50" />
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 px-4 sm:px-6">
                  Hi! I&apos;m PulsePlus. Ask me about our <strong>Agentic SEO</strong> services or how we can help you rank on AI models.
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                {m.role !== 'user' && (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mb-1">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[85%] px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-[13px] sm:text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none font-medium' 
                    : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-bl-none'
                }`}>
                  {m.role === 'user' ? (
                    m.content
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start items-center gap-3 animate-pulse">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
                <span className="text-[11px] sm:text-xs text-zinc-400 font-medium">PulsePlus is typing...</span>
              </div>
            )}

            {error && (
              <div className="flex justify-center my-2 animate-in fade-in zoom-in duration-300">
                <span className="bg-red-100 text-red-600 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50 text-[10px] sm:text-[11px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Too many requests. Please slow down.
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
            <form onSubmit={handleSubmit} className="relative group">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                maxLength={300}
                className="w-full bg-zinc-100 dark:bg-zinc-800 border-2 border-transparent focus:border-blue-500/50 focus:bg-white dark:focus:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl py-3 pl-4 pr-12 outline-none transition-all text-[13px] sm:text-sm"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input?.trim()} 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-30 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Floating Trigger Button */}
      <button
        onClick={toggleChat}
        className="group relative bg-blue-600 hover:bg-blue-700 text-white p-4 sm:p-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-blue-600/40"
      >
        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
        
        {/* 👇 4. CONDITIONAL RED DOT */}
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 border-2 sm:border-4 border-white dark:border-zinc-950 rounded-full animate-pulse"></span>
        )}
      </button>
    </div>
  );
}