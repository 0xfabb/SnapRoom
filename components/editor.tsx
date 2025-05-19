'use client'

import { useEffect, useRef, useState } from 'react'
import { createSharedDoc } from '@/lib/yjs'

export default function Editor({
  roomId,
  serverUrl,
}: {
  roomId: string
  serverUrl: string
}) {
  const [content, setContent] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const { yText } = createSharedDoc(roomId, serverUrl)

    // Sync: Yjs -> UI
    const updateFromYjs = () => {
      const newText = yText.toString()
      setContent(newText)
    }

    yText.observe(updateFromYjs)

    // Sync once on mount
    updateFromYjs()

    // Sync: UI -> Yjs
    const textarea = textAreaRef.current
    const onInput = () => {
      if (textarea) {
        yText.delete(0, yText.length)
        yText.insert(0, textarea.value)
      }
    }

    textarea?.addEventListener('input', onInput)

    return () => {
      textarea?.removeEventListener('input', onInput)
    }
  }, [roomId, serverUrl])

  return (
    <textarea
      ref={textAreaRef}
      className="w-full lg:h-3/4 border p-4 text-sm font-mono resize-none rounded-lg"
      value={content}
      onChange={() => {}} 
      placeholder="Start typing..."
    />
  )
}
