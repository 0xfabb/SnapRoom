'use client'

import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('../../../components/editor'), { ssr: false })

export default function RoomClient({ roomId }: { roomId: string }) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">SnapRoom: {roomId}</h1>
      <Editor roomId={roomId} />
    </main>
  )
}
