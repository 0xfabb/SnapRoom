// lib/yjs.ts
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export function createSharedDoc(roomId: string, serverUrl: string) {
  const ydoc = new Y.Doc()

  const provider = new WebsocketProvider(serverUrl, roomId, ydoc)
  const yText = ydoc.getText('shared-text')

  return { ydoc, provider, yText }
}
