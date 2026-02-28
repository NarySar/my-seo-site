"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/pulse'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] sm:w-[420px] h-[600px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Premium Header */}
          <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 p-5 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-tight">Pulse Strategy Agent</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <p className="text-[11px] text-blue-100 font-medium uppercase tracking-wider">Online</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-grow p-5 overflow-y-auto bg-zinc-50 dark:bg-zinc-950/50 space-y-5">
            {messages.length === 0 && (
              <div className="text-center py-10 space-y-3">
                <Sparkles className="w-10 h-10 text-blue-500 mx-auto opacity-50" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400 px-6">
                  Hi! I’m Pulse. Discover how our integrated SEO and GEO approach helps you rank in traditional search results and AI-generated answers.
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                {m.role !== 'user' && (
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mb-1">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none font-medium' 
                    : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-bl-none'
                }`}>
                  {m.role === 'user' ? (
                    m.content
                  ) : (
                    /* This instantly formats the **asterisks** into beautiful bold text! */
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center gap-3 animate-pulse">
                <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
                <span className="text-xs text-zinc-400 font-medium">Pulse is typing...</span>
              </div>
            )}
            
            {/* 👇 ADD THIS ERROR ALERT SECTION 👇 */}
            {error && (
              <div className="flex justify-center my-2 animate-in fade-in zoom-in duration-300">
                <span className="bg-red-100 text-red-600 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50 text-[11px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Too many requests. Please slow down.
                </span>
              </div>
            )}
            {/* 👆 END ERROR ALERT SECTION 👆 */}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
            <form onSubmit={handleSubmit} className="relative group">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                maxLength={300} // 👈 ADD THIS: Limits input to 300 characters
                className="w-full bg-zinc-100 dark:bg-zinc-800 border-2 border-transparent focus:border-blue-500/50 focus:bg-white dark:focus:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl py-3.5 pl-5 pr-14 outline-none transition-all text-sm"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input?.trim()} 
                className="absolute right-2 top-1.5 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-30 transition-all shadow-lg shadow-blue-500/20"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-blue-600/40"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-4 border-white dark:border-zinc-950 rounded-full"></span>
      </button>
    </div>
  );
}