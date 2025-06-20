#  SnapRoom

**SnapRoom** is a real-time, private collaboration space that lets users create temporary rooms to chat, share files, and optionally save their conversations. No login. No friction. Just enter your name and room name — and you're in!

Built with **Next.js**, **Yjs**, **WebSocket**, and deployed on **Vercel** and **Railway**, SnapRoom offers a blazing-fast, minimal, and powerful team communication tool for the web.

---

## ✨ Features

- 🔒 **Private Rooms**: Anyone with the room name can join — others can’t see your space.
- 🧠 **Real-Time Messaging**: All users in a room can see messages instantly via WebSockets.
- 📂 **File Sharing** _(coming soon)_: Upload and share files (images, docs, etc.) that are instantly visible to others in the room.
- 💾 **Save Your Room** _(coming soon)_: Persist the chat and file history to a database, so it can be accessed again using the same room ID.
- ⚡ **Zero Setup**: No login. No sign up. Just type your name and room ID to get started.
- ☁️ **Deployed on Vercel (frontend) and Railway (backend)**

---

## 📸 Preview

![SnapRoom Preview](./preview.png)

---

## 🧠 Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, shadcn/ui
- **Realtime Engine**: Yjs + custom WebSocket signaling server
- **WebSocket Backend**: Node.js + Express + `ws`
- **File Storage & Persistence**: Appwrite or Supabase (WIP)
- **Deployment**:
  - Vercel (Next.js frontend)
  - Railway (WebSocket backend)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/0xfabb/SnapRoom.git
cd SnapRoom
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

#### 🖥️ Frontend (Next.js)

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

#### 🔌 Backend (WebSocket Server)

Go to the `/ws-server` folder:

```bash
cd ws-server
npm install
node index.js
```

Make sure it's running on `ws://localhost:8080`.

---

## 🔧 Project Structure

```
/app
  /room/[id]     → Room-based routing using Next.js App Router
/components
  editor.tsx     → Shared real-time text editor using Yjs
  ui/            → Reusable shadcn/ui components
/lib
  yjs.ts         → WebRTC provider + Yjs logic
/ws-server
  index.js       → Node.js WebSocket backend
```

---

## 🔐 Environment Variables

Frontend:

```env
NEXT_PUBLIC_WS_SERVER_URL=wss://snaproom-production.up.railway.app
```

Backend (optional if you're integrating file uploads or DB persistence):

```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=...
APPWRITE_API_KEY=...
```

---

## 🛠 Upcoming Features

- ✅ Room-based real-time messaging
- ⏳ File Upload & Sharing (in progress)
- ⏳ Save Room to DB with metadata & restore capability
- ⏳ Typing indicators & user avatars
- ⏳ Admin panel for rooms
- ⏳ Invite links

---

## 💡 Use Cases

- Private team discussions
- Remote study group
- Anonymous collaboration
- Quick project brainstorms
- Real-time code/text sharing without signup

---

## 🧑‍💻 Author

Made with ❤️ by [Vansh Khanna (0xfabb)](https://github.com/0xfabb)

> “Launch fast. Build fast. Think fast.”

---

## 📜 License

MIT

---

## 🧭 Live Demo

**Frontend**: [https://snap-room.vercel.app](https://snap-room.vercel.app)  
**WebSocket Server**: Deployed on Railway at `wss://snaproom-production.up.railway.app`
