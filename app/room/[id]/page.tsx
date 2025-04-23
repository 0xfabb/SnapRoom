// app/room/[id]/page.tsx
import RoomClient from './RoomClient'; // ✅ Add this line
type Props = {
  params: { id: string }
}

export default function RoomPage({ params }: Props) {
  return <RoomClient roomId={params.id} />;
}
