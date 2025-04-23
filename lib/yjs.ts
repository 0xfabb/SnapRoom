import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

const docs = new Map<string, { yDoc: Y.Doc; provider: WebsocketProvider }>()

export function createSharedDoc(roomId: string) {
  if (docs.has(roomId)) {
    const { yDoc } = docs.get(roomId)!
    return {
      yDoc,
      yText: yDoc.getText('shared-text'),
    }
  }

  const yDoc = new Y.Doc()

  // Use public WebSocket provider for now
  const provider = new WebsocketProvider('wss://snap-room.vercel.app', roomId, yDoc)

  // ⛔ don't ignore this — store provider so it's retained in memory
  docs.set(roomId, { yDoc, provider })

  const yText = yDoc.getText('shared-text')

  return { yDoc, yText }
}
