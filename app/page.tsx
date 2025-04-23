// app/room/[id]/page.tsx

'use client'; // Ensure this is marked as a client-side component

import { useEffect, useState } from 'react';
import RoomClient from '../app/room/[id]/RoomClient';

// This is for handling dynamic routes properly
export default function RoomPage({ params }: { params: { id: string } }) {
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    // Extract the roomId from params and update the state
    if (params.id) {
      setRoomId(params.id);
    }
  }, [params.id]);

  if (!roomId) {
    return <div>Loading...</div>; // You can render a loading state until roomId is available
  }

  return <RoomClient roomId={roomId} />;
}
