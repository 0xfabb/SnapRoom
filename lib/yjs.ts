import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

const docs = new Map<string, Y.Doc>();

export function createSharedDoc(roomId: string) {
  if (docs.has(roomId)) {
    const doc = docs.get(roomId)!;
    return {
      yDoc: doc,
      yText: doc.getText('shared-text'),
    };
  }

  const yDoc = new Y.Doc();

  // Simple config — let it use default signaling (wss://signaling.yjs.dev)
  new WebrtcProvider(roomId, yDoc); // We don’t need to store this instance unless you want to disconnect later

  const yText = yDoc.getText('shared-text');
  docs.set(roomId, yDoc);

  return { yDoc, yText };
}
