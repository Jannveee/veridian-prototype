'use client'
import React, { useEffect, useState } from 'react'

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [isRising, setIsRising] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  
  const quoteWords = [
    {text:'Every',accent:false},{text:'line',accent:false},{text:'of',accent:false},
    {text:'code',accent:true},{text:'has',accent:false},{text:'a',accent:false},
    {text:'cost.',accent:false},{text:' ',accent:false},{text:'Make',accent:false},
    {text:'yours',accent:false},{text:'green.',accent:true},
  ]

  useEffect(() => {
    // Exact timing from vanilla JS: 4200ms start
    const liftTimer = setTimeout(() => setIsRising(true), 4200)
    const hideTimer = setTimeout(() => setIsHidden(true), 4800) // 4200 + 600
    const completeTimer = setTimeout(() => onComplete(), 5600) // 4200 + 1400

    return () => {
      clearTimeout(liftTimer)
      clearTimeout(hideTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  if (isHidden) return null

  return (
    <div id="intro" className="fixed inset-0 z-[9999] bg-black flex items-center justify-center font-mono overflow-hidden">
      <div id="curtain" className={`absolute inset-0 bg-black z-10 transition-transform duration-600 ease-in-out ${isRising ? '-translate-y-full' : 'translate-y-0'}`} />
      
      <div id="quote" className="text-center text-2xl md:text-5xl tracking-tight max-w-4xl px-10 flex flex-wrap justify-center gap-y-4">
        {quoteWords.map((w, i) => (
          w.text === ' ' ? <span key={i} className="w-2" /> : (
            <span 
              key={i} 
              className={`word inline-block ${w.accent ? 'accent text-emerald-500 font-bold' : 'text-white'}`}
              style={{ animationDelay: `${0.9 + i * 0.12}s` }}
            >
              {w.text}
            </span>
          )
        ))}
      </div>
    </div>
  )
}
