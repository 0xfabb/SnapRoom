import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

type SharedDoc = {
  yDoc: Y.Doc;
  yText: Y.Text;
  provider: WebrtcProvider;
};

const docs = new Map<string, SharedDoc>();

export function createSharedDoc(roomId: string) {
  // Return existing doc if it exists
  if (docs.has(roomId)) {
    const existing = docs.get(roomId)!;
    return {
      yDoc: existing.yDoc,
      yText: existing.yText,
    };
  }

  // Create a new Yjs document
  const yDoc = new Y.Doc();

  // Create a WebRTC provider
  const provider = new WebrtcProvider(roomId, yDoc, {
    signaling: ['wss://signaling.yjs.dev'],
  });

  // Get the shared text
  const yText = yDoc.getText('shared-text');

  // Store everything so it doesn't get GC'd
  docs.set(roomId, { yDoc, yText, provider });

  return { yDoc, yText };
}
