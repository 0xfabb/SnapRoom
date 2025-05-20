"use client";

import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import { IconHome2, IconSettings } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

type ChatMsg = { sender: string; text: string };

class Person {
  roomId: string;
  Name: string;
  type: string;
  constructor(roomId: string, Name: string, type: string) {
    this.roomId = roomId;
    this.Name = Name;
    this.type = type;
  }
}

export default function HomePage() {
  const serverUrl = "wss://chat-backend-g-hunt.up.railway.app";
  const [roomId, setRoomId] = useState("");
  const [room, setRoom] = useState<WebSocket | null>(null);
  const [type, setType] = useState("intro");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const setupSocketListeners = (socket: WebSocket) => {
    socket.onmessage = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);

        // CASE 1: Full structured message from backend
        if (typeof parsed === "object" && parsed.Name && parsed.data) {
          const sender = parsed.Name === name ? "You" : parsed.Name;
          const text = parsed.data;
          setMessages((prev) => [...prev, { sender, text }]);
        }
        // CASE 2: Backend just sends a string like `"Hello"`
        else if (typeof parsed === "string") {
          setMessages((prev) => [...prev, { sender: "Unknown", text: parsed }]);
        }
      } catch (e) {
        console.log(e);

        // CASE 3: Data wasn't JSON at all
        setMessages((prev) => [
          ...prev,
          { sender: "Unknown", text: event.data },
        ]);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      localStorage.removeItem("roomInfo");
      setRoom(null);
    };
  };

  const removeEnd = () => {
    const confirmDelete = confirm(
      "Do you want to delete the temporary room? This action is irreversible."
    );
    if (!confirmDelete) return;

    setTimeout(() => {
      localStorage.removeItem("roomInfo");
      localStorage.removeItem("chatMessages");
      setRoom(null);
      setMessages([]);
      setRefreshTrigger((prev) => prev + 1);
    }, 800);
  };

  useEffect(() => {
    const saved = localStorage.getItem("roomInfo");
    console.log(saved);

    if (!saved) return;
    const { roomId: roomId, name: name, type: type } = JSON.parse(saved);

    console.log(roomId, name, type);

    const socket = new WebSocket(serverUrl);

    socket.onopen = () => {
      const setUpMsg = new Person(roomId, name, type);
      console.log(setUpMsg);
      socket.send(JSON.stringify(setUpMsg));
      setRoom(socket);
      setRoomId(roomId);
      setName(name);
      setType(type);
      setupSocketListeners(socket);
      console.log("Reconnected to room:", roomId);
    };
  }, [refreshTrigger]);

  const joinRoom = () => {
    if (!roomId.trim() || !name.trim()) return;

    const socket = new WebSocket(serverUrl);
    socket.onopen = () => {
      const setUpMsg = new Person(roomId, name, type);
      console.log(setUpMsg);

      socket.send(JSON.stringify(setUpMsg));
      setRoom(socket);
      setType("");
      localStorage.setItem("roomInfo", JSON.stringify({ roomId, name, type }));
      setupSocketListeners(socket);
    };
  };

  // Save messages to localStorage on update
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMsgs = localStorage.getItem("chatMessages");
    if (savedMsgs) {
      setMessages(JSON.parse(savedMsgs));
    }
  }, []);

  const sendMsg = () => {
    if (!room || !message.trim()) return;

    const msgData = { Name: name, data: message, roomId };
    room.send(JSON.stringify(msgData));
    setMessages((prev) => [...prev, { sender: "You", text: message }]);
    setMessage("");
  };

  return (
    <Sidebar>
      <div className="sm:flex h-screen bg-black text-white overflow-hidden">
        <SidebarBody className="sm:flex sm:justify-between">
          <div>
            <SidebarLink
              link={{ href: "/room", label: "Home", icon: <IconHome2 /> }}
            />
            <SidebarLink
              link={{
                href: "/settings",
                label: "Settings",
                icon: <IconSettings />,
              }}
            />
          </div>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </SidebarBody>

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-6">SnapRoom – {roomId}</h1>
            {room ? (
              <Button onClick={removeEnd} className="bg-red-500 cursor-pointer">
                Leave Room
              </Button>
            ) : (
              <></>
            )}
          </div>

          {!room ? (
            <>
              <h1 className="text-center font-bold font-sans text-2xl mb-12">Create or Join a Private Space</h1>
            <div className="flex flex-col sm:flex-row items-stretch gap-4 max-w-2xl mx-auto p-4 bg-zinc-900 rounded-2xl shadow-xl">
              <input
              value={name}
                className="flex-1 min-w-[200px] px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
                />
              <input
              value={roomId}
                className="flex-1 min-w-[200px] px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Room ID"
                onChange={(e) => setRoomId(e.target.value)}
                />
              <Button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-2  transition w-full sm:w-auto"
                onClick={joinRoom}
                >
                Join / Create
              </Button>
            </div>
                </>
          ) : (
            <>
              <div className="bg-zinc-900 p-4 rounded-lg h-[500px] overflow-y-auto space-y-3">
                <p className="text-center opacity-20 mb-2">
                  Warning: This chat is temporary. Avoid sharing sensitive info,
                  and copy your data before closing.
                </p>
                {messages.map((m, i) => (
                  <div key={i}>
                    <div
                      className={`mt-5 max-w-xs px-4 py-2 rounded-xl text-sm break-words ${
                        m.sender === "You"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      <span className="block text-xs font-semibold opacity-70 mb-1">
                        {m.sender}
                      </span>
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-3 items-center mt-4">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                  placeholder="Type a message…"
                  className="flex-1 p-3 rounded-lg bg-zinc-900 placeholder-gray-400"
                />
                <Button
                  disabled={!message.trim()}
                  onClick={sendMsg}
                  className="bg-blue-500 p-5.5 mb-1 cursor-pointer"
                >
                  Send
                </Button>
              </div>
            </>
          )}
        </main>
      </div>
    </Sidebar>
  );
}
