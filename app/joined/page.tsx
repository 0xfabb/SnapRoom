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
  Users,
  Download,
  Eye,
  Trash2,
  X,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ChatMessage = {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  type: "message" | "system" | "file";
  fileUrl?: string;
  fileName?: string;
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

export default function JoinedRoomPage() {
  const [activeTab, setActiveTab] = useState<"messages" | "files" | "settings">("messages");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "System",
      text: "Welcome to #design-sprint! Start collaborating.",
      timestamp: new Date(),
      type: "system"
    },
    {
      id: "2", 
      sender: "You",
      text: "Let's ship it! 🚀",
      timestamp: new Date(),
      type: "message"
    },
    {
      id: "3",
      sender: "Rohit",
      text: "Try the purple color scheme",
      timestamp: new Date(),
      type: "message"
    }
  ]);
  
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "design-mockup.png",
      size: "2.4 MB",
      type: "image/png",
      url: "/api/files/design-mockup.png",
      uploadedBy: "You",
      uploadedAt: new Date()
    }
  ]);

  const [onlineUsers] = useState<OnlineUser[]>([
    { id: "1", name: "You", status: "online" },
    { id: "2", name: "Rohit", status: "online" },
    { id: "3", name: "Vansh", status: "away" }
  ]);

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [roomName, setRoomName] = useState("design-sprint");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "You",
      text: message,
      timestamp: new Date(),
      type: "message"
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadedBy: "You",
        uploadedAt: new Date()
      };
      
      setFiles(prev => [newFile, ...prev]);
      
      const fileMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "You",
        text: `Uploaded ${file.name}`,
        timestamp: new Date(),
        type: "file",
        fileUrl: newFile.url,
        fileName: file.name
      };
      
      setMessages(prev => [...prev, fileMessage]);
      setIsUploading(false);
    }, 1500);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.includes('pdf')) return '📄';
    if (type.includes('video')) return '🎥';
    return '📄';
  };

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251, 191, 36, 0.25), transparent 70%), #000000",
        }}
      />
      
      {/* Top Bar */}
      <header className="relative z-10 bg-amber-950/20 backdrop-blur-xl border-b border-amber-400/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-xl font-bold text-white">SnapRoom</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-amber-200/80">Room:</span>
            <input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="text-lg font-semibold bg-transparent border-none outline-none text-amber-400 placeholder-amber-200/60"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {onlineUsers.slice(0, 3).map((user) => (
                <Avatar key={user.id} className="w-8 h-8 border-2 border-amber-400/30">
                  <AvatarFallback className={user.status === 'online' ? 'bg-amber-500 text-black' : 'bg-yellow-600 text-black'}>
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-amber-200/80 flex items-center">
              <div className="w-2 h-2 bg-amber-400 rounded-full mr-1"></div>
              {onlineUsers.filter(u => u.status === 'online').length} online
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 flex overflow-hidden">
        {/* Left Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 bg-amber-950/20 backdrop-blur-xl border-r border-amber-400/30 flex-col">
          <nav className="p-4 space-y-2">
            {[
              { id: "messages", icon: MessageCircle, label: "Messages" },
              { id: "files", icon: Folder, label: "Shared Files" },
              { id: "settings", icon: Settings, label: "Room Settings" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30 shadow-lg shadow-amber-400/10' 
                    : 'text-amber-200/80 hover:bg-amber-400/10 hover:text-amber-200'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {activeTab === "messages" && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-md px-4 py-2 rounded-lg backdrop-blur-sm ${
                        msg.type === 'system' 
                          ? 'bg-amber-950/30 text-amber-200/80 text-center text-sm border border-amber-400/20'
                          : msg.sender === 'You'
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25'
                          : 'bg-zinc-900/80 border border-amber-400/20 text-amber-100'
                      }`}>
                        {msg.type !== 'system' && (
                          <div className="text-xs opacity-70 mb-1">{msg.sender}</div>
                        )}
                        <div>{msg.text}</div>
                        {msg.fileUrl && (
                          <div className="mt-2 p-2 bg-black/20 rounded flex items-center space-x-2">
                            <span>{getFileIcon(msg.fileName?.split('.').pop() || '')}</span>
                            <span className="text-sm">{msg.fileName}</span>
                            <Button size="sm" variant="ghost" className="text-amber-200 hover:text-amber-400 hover:bg-amber-400/10">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
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
                    <div className="bg-amber-950/30 text-amber-400 px-4 py-2 rounded-lg border border-amber-400/30">
                      <Upload className="w-4 h-4 inline mr-2 animate-bounce" />
                      Uploading file...
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-amber-400/30 bg-amber-950/20 backdrop-blur-xl p-4">
                <div className="flex items-center space-x-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="text-amber-200 hover:text-amber-400 hover:bg-amber-400/10"
                  >
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 bg-zinc-900/80 border border-amber-400/30 rounded-lg text-amber-100 placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50"
                  />
                  <Button 
                    onClick={sendMessage} 
                    disabled={!message.trim()}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/25"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowSaveModal(true)}
                    className="border-amber-400/30 text-amber-200 hover:bg-amber-400/10 hover:text-amber-400"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Room
                  </Button>
                </div>
              </div>
            </>
          )}

          {activeTab === "files" && (
            <div className="flex-1 p-6">
              <h2 className="text-xl font-semibold mb-4 text-amber-100">Shared Files</h2>
              <div className="space-y-3">
                {files.map((file) => (
                  <div key={file.id} className="bg-zinc-900/80 border border-amber-400/20 rounded-lg p-4 flex items-center justify-between backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getFileIcon(file.type)}</span>
                      <div>
                        <div className="font-medium text-amber-100">{file.name}</div>
                        <div className="text-sm text-amber-200/60">{file.size} • {file.uploadedBy}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-amber-200 hover:text-amber-400 hover:bg-amber-400/10">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-amber-200 hover:text-amber-400 hover:bg-amber-400/10">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="flex-1 p-6">
              <h2 className="text-xl font-semibold mb-4 text-amber-100">Room Settings</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-200">Room Name</label>
                  <input
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900/80 border border-amber-400/30 rounded-lg text-amber-100 placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white">Leave Room</Button>
              </div>
            </div>
          )}
        </main>

        {/* Right Panel - Files (Desktop) */}
        <aside className="hidden lg:flex w-80 bg-amber-950/20 backdrop-blur-xl border-l border-amber-400/30 flex-col">
          <div className="p-4 border-b border-amber-400/30">
            <h3 className="font-semibold text-amber-100">Recent Files</h3>
          </div>
          <div className="flex-1 p-4 space-y-3">
            {files.slice(0, 5).map((file) => (
              <div key={file.id} className="bg-zinc-900/60 border border-amber-400/20 rounded-lg p-3 backdrop-blur-sm hover:bg-zinc-900/80 transition-colors">
                <div className="flex items-center space-x-2 mb-2">
                  <span>{getFileIcon(file.type)}</span>
                  <span className="text-sm font-medium truncate text-amber-100">{file.name}</span>
                </div>
                <div className="text-xs text-amber-200/60">{file.size}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="relative z-10 md:hidden bg-amber-950/20 backdrop-blur-xl border-t border-amber-400/30 px-4 py-2">
        <div className="flex justify-around">
          {[
            { id: "messages", icon: MessageCircle, label: "Chat" },
            { id: "files", icon: Folder, label: "Files" },
            { id: "settings", icon: Settings, label: "Settings" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                activeTab === tab.id ? 'text-amber-400' : 'text-amber-200/80'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Save Room Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900/95 backdrop-blur-xl border border-amber-400/30 rounded-lg p-6 w-96 max-w-[90vw] shadow-2xl shadow-amber-400/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-amber-100">Save Room</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSaveModal(false)} className="text-amber-200 hover:text-amber-400">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-200">Snapshot Name</label>
                  <input
                    placeholder="design-sprint-final"
                    className="w-full px-3 py-2 bg-zinc-900/80 border border-amber-400/30 rounded-lg text-amber-100 placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>
                <p className="text-sm text-amber-200/80">
                  This will save all messages and files to permanent storage.
                </p>
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/25">
                    Save Room
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowSaveModal(false)}
                    className="border-amber-400/30 text-amber-200 hover:bg-amber-400/10"
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