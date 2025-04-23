import RoomClient from './RoomClient'

export default function RoomPage({ params }: { params: { id: string } }) {
  return <RoomClient roomId={params.id} />
}
