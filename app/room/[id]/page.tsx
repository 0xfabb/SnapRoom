
import { useEffect, useState } from 'react';
import RoomClient from './RoomClient';

export default function RoomPage({ params }: { params: { id: string } }) {
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    // Extract the roomId from params and update the state
    if (params.id) {
      setRoomId(params.id);
    }
  }, [params.id]); // Only update if params.id changes

  if (!roomId) {
    return <div>Loading...</div>; // You can render a loading state until roomId is available
  }

  return <RoomClient roomId={roomId} />;
}
