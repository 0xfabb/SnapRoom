'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../components/editor'), { ssr: false });

export default function HomePage() {
  const roomId = 'main'; // shared room for all users

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">SnapRoom – Shared Space</h1>
      <Editor roomId={roomId} />
    </main>
  );
}
