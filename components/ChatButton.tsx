"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

interface Message {
  text: string;
  sender: "User" | "AI";
}

const ChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I assist you today?", sender: "AI" },
  ]); // Default value

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load messages from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []); // Empty dependency array to run once on mount

  // Save messages to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessages: Message[] = [...messages, { text: userMessage, sender: "User" }];
    setMessages(newMessages);
    setUserMessage("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userCommand: userMessage }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiMessage = "";

      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          aiMessage += decoder.decode(value, { stream: true });
          setMessages([...newMessages, { text: aiMessage, sender: "AI" }]);
        }
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <>
      {/* Chat Button - Yellow with transparency */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 p-3 sm:p-4 md:p-5 bg-yellow-400/80 text-blue-800 rounded-full shadow-lg hover:bg-yellow-500/90 transition z-50"
      >
        <FaRobot className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </button>

      {isChatOpen && (
        <div className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 w-[90vw] max-w-[400px] sm:w-[400px] h-[70vh] max-h-[500px] sm:h-[400px] bg-gray-900/80 backdrop-blur-md text-white rounded-lg shadow-xl flex flex-col z-50 border border-yellow-400/50">
          {/* Header - Blue with yellow text */}
          <div className="flex justify-between items-center p-2 sm:p-3 bg-blue-600/80 rounded-t-lg">
            <span className="font-semibold text-sm sm:text-base text-yellow-300">Chat</span>
            <button onClick={toggleChat} className="text-yellow-300 hover:text-yellow-500">
              <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Messages Area - Semi-transparent background */}
          <div
            className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-3 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-blue-900/50"
            style={{ maxHeight: "85%", scrollbarWidth: "thin", scrollbarColor: "#facc15 #1e3a8a" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                  message.sender === "AI"
                    ? "bg-blue-600/70 text-yellow-200"
                    : "bg-yellow-400/70 text-blue-900"
                }`}
              >
                <strong>{message.sender}:</strong> {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Semi-transparent with yellow and blue */}
          <div className="p-2 sm:p-4 border-t border-yellow-400/50 flex gap-2 sm:gap-3">
            <textarea
              value={userMessage}
              onChange={handleInputChange}
              className="flex-1 p-2 bg-blue-900/50 text-yellow-200 rounded-lg resize-none outline-none focus:ring-2 focus:ring-yellow-400 text-xs sm:text-sm"
              placeholder="Ask me anything..."
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-400/80 text-blue-900 rounded-lg hover:bg-yellow-500/90 transition text-xs sm:text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatButton;