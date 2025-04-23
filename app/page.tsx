'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  function handleCreateRoom() {
    const roomId = Math.random().toString(36).substring(2, 8)
    router.push(`/room/${roomId}`)
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome to SnapRoom</h1>
      <button
        onClick={handleCreateRoom}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Create SnapRoom
      </button>
    </main>
  )
}
