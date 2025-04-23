import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

const docs = new Map<string, Y.Doc>();

export function createSharedDoc(roomId: string) {
  // Check if the document for the roomId already exists
  if (docs.has(roomId)) {
    const doc = docs.get(roomId)!;
    return {
      yDoc: doc,
      yText: doc.getText("shared-text"),
    };
  }

  // Create a new Yjs document if it doesn't exist
  const yDoc = new Y.Doc();

  // Setup the WebRTC provider with proper signaling and STUN/TURN servers
  const provider = new WebrtcProvider(roomId, yDoc, {
    signaling: ["wss://signaling.yjs.dev"], // Public default signaling server

    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
    ],

    // Additional configuration for WebRTC connections can be added here
  });

  // Get the shared text object from Yjs
  const yText = yDoc.getText("shared-text");

  // Store the document for future use
  docs.set(roomId, yDoc);

  // Return the Yjs document and the shared text object
  return { yDoc, yText };
}
