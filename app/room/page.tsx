"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle,
  Folder,
  Settings,
  Paperclip,
  Send,
  Save,
  Download,
  Eye,
  Trash2,
  X,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileUploader } from "@/components/FileUploader";

type ChatMsg = {
  sender: string;
  text: string;
  url?: string;
  file_url?: string;
};

type UploadedFile = {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
};

type OnlineUser = {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "away";
};

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
  const serverUrl = process.env.NEXT_PUBLIC_SERVERURL ?? "";
  const [roomId, setRoomId] = useState("");
  const [room, setRoom] = useState<WebSocket | null>(null);
  const [type, setType] = useState("intro");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // New UI states
  const [activeTab, setActiveTab] = useState<"messages" | "files" | "settings">(
    "messages"
  );
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Dummy data for new features
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "design-mockup.png",
      size: "2.4 MB",
      type: "image/png",
      url: "/api/files/design-mockup.png",
      uploadedBy: "You",
      uploadedAt: new Date(),
    },
  ]);

  const [onlineUsers] = useState<OnlineUser[]>([
    { id: "1", name: "You", status: "online" },
    { id: "2", name: "Alice", status: "online" },
    { id: "3", name: "Bob", status: "away" },
  ]);

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
          const url = parsed.file_url;
          setMessages((prev) => [...prev, { sender, text, url }]);
        } else if (typeof parsed === "object" && parsed.file_url) {
          const url = parsed.file_url;
          console.log(url);
          const sender = parsed.Name;
          const text = parsed.data;
          setMessages((prev) => [...prev, { sender, text, url }]);
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
      localStorage.removeItem(`chatMessages_${roomId}`);
      setRoom(null);
      setMessages([]);
      setRefreshTrigger((prev) => prev + 1);
    }, 800);
  };

  // Clean up WebSocket on unmount
  useEffect(() => {
    return () => {
      if (room) {
        room.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  useEffect(() => {
    const saved = localStorage.getItem("roomInfo");
    console.log(saved);

    if (!saved) return;
    const {
      roomId: savedRoomId,
      name: savedName,
      type: savedType,
    } = JSON.parse(saved);

    console.log(savedRoomId, savedName, savedType);

    const socket = new WebSocket(serverUrl);

    socket.onopen = () => {
      const setUpMsg = new Person(savedRoomId, savedName, savedType);
      console.log(setUpMsg);
      socket.send(JSON.stringify(setUpMsg));
      setRoom(socket);
      setRoomId(savedRoomId);
      setName(savedName);
      setType(savedType);
      setupSocketListeners(socket);
      console.log("Reconnected to room:", savedRoomId);
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

  // Save messages to localStorage on update (per room)
  useEffect(() => {
    if (messages.length > 0 && roomId) {
      localStorage.setItem(`chatMessages_${roomId}`, JSON.stringify(messages));
    }
  }, [messages, roomId]);

  // Define a type for stored messages (could be partial, as old messages may not have url)
  type StoredMsg = {
    sender: string;
    text: string;
    url?: string;
    file_url?: string;
  };

  // Load messages from localStorage on mount (per room)
  useEffect(() => {
    if (!roomId) return;
    const savedMsgs = localStorage.getItem(`chatMessages_${roomId}`);
    if (savedMsgs) {
      // Map file_url to url for compatibility
      const parsedMsgs = (JSON.parse(savedMsgs) as StoredMsg[]).map((msg) => ({
        ...msg,
        url: msg.url || msg.file_url, // support both
      }));
      setMessages(parsedMsgs);
    }
  }, [roomId]);

  const sendMsg = () => {
    if (!room || !message.trim()) return;

    const msgData = { Name: name, data: message, roomId };
    room.send(JSON.stringify(msgData));
    setMessages((prev) => [...prev, { sender: "You", text: message }]);
    setMessage("");
  };

  // Renamed for consistency
  const handleFileSelect = (file: File) => {
    console.log("File selected:", file.name);
    setIsUploading(true);

    // Simulate upload for now
    setTimeout(() => {
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadedBy: "You",
        uploadedAt: new Date(),
      };

      setFiles((prev) => [newFile, ...prev]);
      setIsUploading(false);
    }, 1500);
  };

  function sendMessageToWS(message: string) {
    if (room?.readyState === WebSocket.OPEN) {
      setIsUploading(true);
      const data = JSON.stringify({
        type: "file-url",
        roomId: roomId,
        Name: name,
        data: message,
      });
      room.send(data);
      setMessages((prev) => [...prev, { sender: "You", text: message }]);
      setMessage("");
      console.log(data);

      // Simulate upload completion
      setTimeout(() => {
        setIsUploading(false);
      }, 1500);
    } else {
      console.warn("WS not open yet");
    }
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return "🖼️";
    if (type.includes("pdf")) return "📄";
    if (type.includes("video")) return "🎥";
    return "📄";
  };

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251, 191, 36, 0.15), transparent 70%), #000000",
        }}
      />

      {/* Top Bar */}
      <header className="relative z-10 bg-amber-950/20 backdrop-blur-xl border-b border-amber-400/20 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs md:text-sm">S</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-white">SnapRoom</h1>
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-xs md:text-sm text-amber-200/60">Room:</span>
            <span className="text-sm md:text-lg font-semibold text-amber-400">
              {roomId || "Not Connected"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="flex items-center space-x-1 md:space-x-2">
            <div className="flex -space-x-1 md:-space-x-2">
              {onlineUsers.slice(0, 3).map((user) => (
                <Avatar
                  key={user.id}
                  className="w-6 h-6 md:w-8 md:h-8 border-2 border-amber-400/20"
                >
                  <AvatarFallback
                    className={
                      user.status === "online"
                        ? "bg-amber-500 text-black text-xs"
                        : "bg-yellow-600 text-black text-xs"
                    }
                  >
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs md:text-sm text-amber-200/60 flex items-center">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400 rounded-full mr-1"></div>
              <span className="hidden sm:inline">{onlineUsers.filter((u) => u.status === "online").length} online</span>
              <span className="sm:hidden">{onlineUsers.filter((u) => u.status === "online").length}</span>
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 flex overflow-hidden">
        {/* Left Sidebar - Desktop only */}
        <aside className="hidden lg:flex w-64 bg-amber-950/20 backdrop-blur-xl border-r border-amber-400/20 flex-col">
          <nav className="p-4 space-y-2">
            {[
              { id: "messages", icon: MessageCircle, label: "Messages" },
              { id: "files", icon: Folder, label: "Shared Files" },
              { id: "settings", icon: Settings, label: "Room Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-amber-400/20 text-amber-400 border border-amber-400/20"
                    : "text-amber-200/60 hover:bg-amber-400/10 hover:text-amber-200"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {!room ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
              <h1 className="text-center font-bold font-sans text-xl md:text-2xl mb-8 md:mb-12 text-white">
                Create or Join a Private Space
              </h1>
              <div className="w-full max-w-md lg:max-w-2xl">
                <div className="flex flex-col lg:flex-row items-stretch gap-3 md:gap-4 p-4 bg-amber-950/20 backdrop-blur-xl border border-amber-400/20 rounded-2xl">
                  <input
                    value={name}
                    className="w-full lg:flex-1 px-4 py-3 rounded-xl border border-amber-400/20 bg-zinc-900/80 text-white placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition"
                    placeholder="Your name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    value={roomId}
                    className="w-full lg:flex-1 px-4 py-3 rounded-xl border border-amber-400/20 bg-zinc-900/80 text-white placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition"
                    placeholder="Room ID"
                    onChange={(e) => setRoomId(e.target.value)}
                  />
                  <Button
                    className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold transition"
                    onClick={joinRoom}
                  >
                    Join / Create
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {activeTab === "messages" && (
                <>
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4">
                    <p className="text-center text-amber-200/40 mb-2 text-xs md:text-sm">
                      Warning: This chat is temporary. Avoid sharing sensitive info,
                      and copy your data before closing.
                    </p>
                    <AnimatePresence>
                      {messages.map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex mb-3 ${
                            m.sender === "You" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-md px-3 md:px-4 py-2 md:py-3 rounded-2xl backdrop-blur-sm ${
                              m.sender === "You"
                                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-br-md"
                                : "bg-zinc-900/90 border border-amber-400/20 text-amber-100 rounded-bl-md"
                            }`}
                          >
                            {m.sender !== "You" && (
                              <div className="text-xs opacity-70 mb-1 text-amber-300">{m.sender}</div>
                            )}
                            <div className="text-sm md:text-base break-words">{m.text}</div>
                            {m.url && (
                              <Button
                                onClick={() => {
                                  window.open(m.url, "_blank");
                                }}
                                className="mt-2 bg-black/20 text-amber-200 hover:bg-black/30 text-xs md:text-sm h-8"
                                size="sm"
                              >
                                Download File
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {isUploading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center"
                      >
                        <div className="bg-amber-950/30 text-amber-400 px-3 md:px-4 py-2 rounded-lg border border-amber-400/20 text-sm">
                          <Upload className="w-4 h-4 inline mr-2 animate-bounce" />
                          File upload in progress...
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="border-t border-amber-400/20 bg-amber-950/20 backdrop-blur-xl p-3 md:p-4">
                    <div className="flex items-end space-x-2 md:space-x-3">
                      <FileUploader
                        onFileSelect={handleFileSelect}
                        sendMessageToWS={sendMessageToWS}
                      />
                      <div className="flex-1 flex items-end space-x-2">
                        <input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                          placeholder="Type a message..."
                          className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-zinc-900/80 border border-amber-400/20 rounded-xl md:rounded-lg text-amber-100 placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 text-sm md:text-base"
                        />
                        <Button
                          onClick={sendMsg}
                          disabled={!message.trim()}
                          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white h-10 w-10 md:h-11 md:w-11 p-0 rounded-xl"
                        >
                          <Send className="w-4 h-4 md:w-5 md:h-5" />
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setShowSaveModal(true)}
                        className="hidden md:flex border-amber-400/20 text-amber-200 hover:bg-amber-400/10 hover:text-amber-400"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Room
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "files" && (
                <div className="flex-1 p-4 md:p-6 overflow-y-auto">
                  <h2 className="text-lg md:text-xl font-semibold mb-4 text-amber-100">
                    Shared Files
                  </h2>
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="bg-zinc-900/80 border border-amber-400/20 rounded-lg p-3 md:p-4 flex items-center justify-between backdrop-blur-sm"
                      >
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <span className="text-xl md:text-2xl">{getFileIcon(file.type)}</span>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-amber-100 text-sm md:text-base truncate">
                              {file.name}
                            </div>
                            <div className="text-xs md:text-sm text-amber-200/60">
                              {file.size} • {file.uploadedBy}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 md:space-x-2 ml-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-amber-200 hover:text-amber-400 hover:bg-amber-400/10 h-8 w-8 p-0"
                          >
                            <Eye className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-amber-200 hover:text-amber-400 hover:bg-amber-400/10 h-8 w-8 p-0"
                          >
                            <Download className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="flex-1 p-4 md:p-6 overflow-y-auto">
                  <h2 className="text-lg md:text-xl font-semibold mb-4 text-amber-100">
                    Room Settings
                  </h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-amber-200">
                        Room ID
                      </label>
                      <input
                        value={roomId}
                        readOnly
                        className="w-full px-3 py-2 bg-zinc-900/80 border border-amber-400/20 rounded-lg text-amber-100 placeholder-amber-200/60 focus:outline-none text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-amber-200">
                        Your Name
                      </label>
                      <input
                        value={name}
                        readOnly
                        className="w-full px-3 py-2 bg-zinc-900/80 border border-amber-400/20 rounded-lg text-amber-100 placeholder-amber-200/60 focus:outline-none text-sm md:text-base"
                      />
                    </div>
                    <Button
                      onClick={removeEnd}
                      className="bg-red-600 hover:bg-red-700 text-white w-full md:w-auto"
                    >
                      Leave Room
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Right Panel - Files (Desktop only) */}
        {room && (
          <aside className="hidden xl:flex w-80 bg-amber-950/20 backdrop-blur-xl border-l border-amber-400/20 flex-col">
            <div className="p-4 border-b border-amber-400/20">
              <h3 className="font-semibold text-amber-100">Recent Files</h3>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {files.slice(0, 5).map((file) => (
                <div
                  key={file.id}
                  className="bg-zinc-900/60 border border-amber-400/20 rounded-lg p-3 backdrop-blur-sm hover:bg-zinc-900/80 transition-colors"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span>{getFileIcon(file.type)}</span>
                    <span className="text-sm font-medium truncate text-amber-100">
                      {file.name}
                    </span>
                  </div>
                  <div className="text-xs text-amber-200/60">{file.size}</div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      {room && (
        <nav className="relative z-10 lg:hidden bg-amber-950/20 backdrop-blur-xl border-t border-amber-400/20 px-2 py-2">
          <div className="flex justify-around">
            {[
              { id: "messages", icon: MessageCircle, label: "Chat" },
              { id: "files", icon: Folder, label: "Files" },
              { id: "settings", icon: Settings, label: "Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors min-w-0 ${
                  activeTab === tab.id ? "text-amber-400" : "text-amber-200/60"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Save Room Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900/95 backdrop-blur-xl border border-amber-400/20 rounded-lg p-4 md:p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-amber-100">Save Room</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSaveModal(false)}
                  className="text-amber-200 hover:text-amber-400 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-200">
                    Snapshot Name
                  </label>
                  <input
                    placeholder={`${roomId}-snapshot`}
                    className="w-full px-3 py-2 bg-zinc-900/80 border border-amber-400/20 rounded-lg text-amber-100 placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-sm md:text-base"
                  />
                </div>
                <p className="text-sm text-amber-200/60">
                  This will save all messages and files to permanent storage.
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <Button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                    Save Room
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSaveModal(false)}
                    className="flex-1 border-amber-400/20 text-amber-200 hover:bg-amber-400/10"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
