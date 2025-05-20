// "use client";

// import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
// import { IconHome2, IconSettings } from "@tabler/icons-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";

// export default function HomePage() {
//   const serverUrl = "wss://chat-backend-g-hunt.up.railway.app";
//   const [roomId, setRoomId] = useState("");
//   const [room, setRoom] = useState<WebSocket | null>(null);
//   const [type, setType] = useState("intro");
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<string[]>([]);

//   class Person {
//     RoomId: string;
//     Name: string;
//     Type: string;
//     constructor(RoomId: string, Name: string, Type: string) {
//       this.Name = Name;
//       this.RoomId = RoomId;
//       this.Type = Type;
//     }
//   }
// const setupSocketListeners = (socket: WebSocket) => {
//   socket.onmessage = (event) => {
//     try {
//       const parsed = JSON.parse(event.data);
//       const { Name, data } = parsed;
//       const label = Name === name ? "You" : Name;
//       setMessages((prev) => [...prev, { sender: label, text: data }]);
//     } catch {
//       // Fallback if data is just a string
//       setMessages((prev) => [...prev, { sender: "Server", text: event.data }]);
//     }
//   };

//   socket.onerror = (err) => {
//     console.error("WebSocket error:", err);
//     localStorage.removeItem("roomInfo");
//     setRoom(null);
//   };
// };

//   useEffect(() => {
//     const existingRoom = localStorage.getItem("roomInfo");
//     if (existingRoom) {
//       const { roomId, name, type } = JSON.parse(existingRoom);

//       const socket = new WebSocket(serverUrl);

//       socket.onopen = () => {
//         const data = new Person(roomId, name, type);
//         socket.send(JSON.stringify(data));
//         setRoom(socket);
//         setRoomId(roomId);
//         setName(name);
//         setType(type);

//         // ✅ Attach listeners here
//         setupSocketListeners(socket);

//         console.log("Reconnected to room:", roomId);
//       };

//       socket.onerror = (err) => {
//         console.error("WebSocket reconnect error:", err);
//         localStorage.removeItem("roomInfo");
//         setRoom(null);
//       };
//     }
//   }, []);

//   const JoinAroom = async () => {
//     try {
//       const socket = new WebSocket(serverUrl);

//       socket.onopen = () => {
//         const data = new Person(roomId, name, type);
//         socket.send(JSON.stringify(data));

//         setRoom(socket);
//         setupSocketListeners(socket);

//         setType("");
//         localStorage.setItem(
//           "roomInfo",
//           JSON.stringify({ roomId, name, type })
//         );
//       };
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const sendTexts = async () => {
//     if (room && message.trim()) {
//       room.send(JSON.stringify({ Name: name, data: message, roomId: roomId }));
//       setMessages((prev) => [...prev, `You: ${message}`]);
//       setMessage("");
//     }
//   };

//   return (
//     <Sidebar>
//       <div className="sm:flex h-screen bg-black text-white overflow-hidden">
//         <SidebarBody className="sm:flex sm:justify-between">
//           <div>
//             <SidebarLink
//               link={{
//                 href: "/room",
//                 label: "Home",
//                 icon: <IconHome2 className="text-white" />,
//               }}
//             />
//             <SidebarLink
//               link={{
//                 href: "/settings",
//                 label: "Settings",
//                 icon: <IconSettings className="text-white" />,
//               }}
//             />
//           </div>

//           <div>
//             <Avatar>
//               <AvatarImage src="https://github.com/shadcn.png" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//           </div>
//         </SidebarBody>

//         <main className="flex-1 p-8 overflow-auto">
//           <h1 className="text-2xl font-bold mb-4">SnapRoom - {roomId}</h1>
//           {!room ? (
//             <div className="flex gap-12">
//               <input
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Your Name"
//                 type="text"
//               />
//               <input
//                 onChange={(e) => setRoomId(e.target.value)}
//                 placeholder="Enter a Room Id"
//                 type="text"
//               />
//               <Button onClick={JoinAroom} className="bg-red-500">
//                 Join or Create your own room!
//               </Button>
//             </div>
//           ) : (
//             <>
//               <div className="mt-6 bg-black p-4 rounded max-h-96 overflow-auto">
//                 {messages.map((msg, index) => (
//                   <div key={index} className="mb-2 text-white">
//                     {msg}
//                   </div>
//                 ))}
//               </div>
//               <div className="flex gap-1 ">
//                 <input
//                   onChange={(e) => {
//                     setMessage(e.target.value);
//                   }}
//                   value={message}
//                   className="p-2 m-3 text-white border-2 rounded-xl"
//                   placeholder="Send a Message on your room"
//                   type="text"
//                 />
//                 <Button
//                   disabled={!message.trim()}
//                   onClick={sendTexts}
//                   className=" rounded-xl mt-4 bg-blue-400"
//                 >
//                   Send
//                 </Button>
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </Sidebar>
//   );
// }

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
  const confirmDelete = confirm("Do you want to delete the temporary room? This action is irreversible.");
  if (!confirmDelete) return;

  localStorage.removeItem("roomInfo");
  localStorage.removeItem("chatMessages");

  // Trigger useEffect re-run
  setRoom(null);
  setMessages([]);
  setRefreshTrigger((prev) => prev + 1);
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
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </SidebarBody>

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-6">SnapRoom – {roomId}</h1>
            <Button onClick={removeEnd} className="bg-red-500">
              Leave Room
            </Button>
          </div>

          {!room ? (
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <input
                className="p-3 rounded bg-gray-800 placeholder-gray-400"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="p-3 rounded bg-gray-800 placeholder-gray-400"
                placeholder="Room ID"
                onChange={(e) => setRoomId(e.target.value)}
              />
              <Button className="bg-purple-600" onClick={joinRoom}>
                Join / Create
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-gray-900 p-4 rounded-lg h-96 overflow-y-auto space-y-3">
                {messages.map((m, i) => (
                  <div key={i}>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-xl text-sm break-words ${
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
                  className="flex-1 p-3 rounded-lg bg-gray-800 placeholder-gray-400"
                />
                <Button
                  disabled={!message.trim()}
                  onClick={sendMsg}
                  className="bg-blue-500"
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
