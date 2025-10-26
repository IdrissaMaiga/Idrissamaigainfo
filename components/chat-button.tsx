"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageCircle,
  FiSend,
  FiX,
  FiUser,
  FiCode,
  FiTerminal,
  FiClipboard,
  FiCheckCircle,
  FiTrash2,
  FiMaximize,
  FiMinimize,
} from "react-icons/fi";

interface Message {
  text: string;
  sender: "User" | "AI";
  timestamp: number;
  code?: boolean;
  isStreaming?: boolean;
  fullText?: string;
}

export default function ChatButton() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm Idrissa's assistant. How can I help you today?",
      sender: "AI",
      timestamp: Date.now(),
    },
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showCopied, setShowCopied] = useState(false);
  const [fontSize, setFontSize] = useState<number>(14); // Default font size
  const [hasUnreadMessage, setHasUnreadMessage] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatHistory = useRef<HTMLDivElement | null>(null);
  const streamingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to parse saved messages", e);
      }
    }

    // Load font size preference if available
    const savedFontSize = localStorage.getItem("chatFontSize");
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const completedMessages = messages.map((msg) => ({
        ...msg,
        text: msg.fullText || msg.text,
        isStreaming: false,
        fullText: undefined,
      }));
      localStorage.setItem("chatMessages", JSON.stringify(completedMessages));
    }
  }, [messages]);

  // Save font size preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatFontSize", fontSize.toString());
    }
  }, [fontSize]);

  // Scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) weakenAnimation(() => {
      messagesEndRef.current!.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages]);

  // Focus the input when chat is opened
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      setHasUnreadMessage(false);
    }
  }, [isChatOpen]);

  // Clean up streaming timer on unmount
  useEffect(() => {
    return () => {
      if (streamingTimerRef.current) {
        clearTimeout(streamingTimerRef.current);
      }
    };
  }, []);

  // Adjust textarea height based on content
  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; // Reduced max height for mobile
  };

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value);
    adjustTextareaHeight(e.target);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Copy chat history
  const copyChat = () => {
    if (typeof window === "undefined" || !chatHistory.current) return;

    const chatText = messages
      .map((msg) => `${msg.sender}: ${msg.fullText || msg.text}`)
      .join("\n\n");

    navigator.clipboard.writeText(chatText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // Clear chat history
  const clearChat = () => {
    const initialMessage: Message = {
      text: "Chat history cleared. How can I help you today?",
      sender: "AI",
      timestamp: Date.now(),
    };
    setMessages([initialMessage]);
  };

  // Increase font size
  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 20)); // Reduced max font size for mobile
  };

  // Decrease font size
  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12)); // Min font size
  };

  // Format timestamp
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Stream text character by character
  const streamText = (fullText: string, messageIndex: number) => {
    let currentIndex = 0;
    const streamingSpeed = 30;
    const punctuationPause = 150;

    const streamNextChar = () => {
      if (currentIndex <= fullText.length) {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[messageIndex] = {
            ...updatedMessages[messageIndex],
            text: fullText.substring(0, currentIndex),
            fullText: fullText,
            isStreaming: currentIndex < fullText.length,
          };
          return updatedMessages;
        });

        currentIndex++;
        const delay =
          currentIndex > 1 && /[.,!?;:]/.test(fullText[currentIndex - 2])
            ? punctuationPause
            : streamingSpeed;
        streamingTimerRef.current = setTimeout(streamNextChar, delay);
      } else {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[messageIndex] = {
            ...updatedMessages[messageIndex],
            isStreaming: false,
          };
          return updatedMessages;
        });
      }
    };

    streamNextChar();
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const userMsg: Message = {
      text: userMessage,
      sender: "User",
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setUserMessage("");
    setIsTyping(true);

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userCommand: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      if (!data.response) {
        throw new Error("Invalid response format");
      }

      const containsCode =
        userMessage.toLowerCase().includes("code") ||
        userMessage.toLowerCase().includes("example") ||
        data.response.includes("```");

      const aiResponseIndex = newMessages.length;
      setMessages([
        ...newMessages,
        {
          text: "",
          fullText: data.response,
          sender: "AI",
          timestamp: Date.now(),
          code: containsCode,
          isStreaming: true,
        },
      ]);

      if (!isChatOpen) {
        setHasUnreadMessage(true);
      }

      setTimeout(() => {
        streamText(data.response, aiResponseIndex);
      }, 500);
    } catch (error) {
      console.error("Error processing message:", error);
      setMessages([
        ...newMessages,
        {
          text: "Sorry, I encountered an error processing your request. Please try again later.",
          sender: "AI",
          timestamp: Date.now(),
        },
      ]);

      if (!isChatOpen) {
        setHasUnreadMessage(true);
      }
    } finally {
      setIsTyping(false);
    }
  };

  // Render message content with code formatting
  const renderMessageContent = (message: Message) => {
    const textToRender = message.text;

    const cursorElement = message.isStreaming ? (
      <span className="inline-block w-2 h-4 ml-0.5 bg-blue-400 dark:bg-blue-300 animate-pulse"></span>
    ) : null;

    if (message.code && textToRender.includes("```")) {
      return (
        <div className="whitespace-pre-wrap" style={{ fontSize: `${fontSize}px` }}>
          {textToRender.split(/(```[\s\S]*?```)/g).map((part, i) => {
            if (part.startsWith("```") && part.endsWith("```")) {
              const match = part.match(/```(.+?)\n([\s\S]*?)```/);
              if (match) {
                const [, lang, code] = match;
                return (
                  <div key={i}>
                    <div className="mt-2 mb-1 text-xs font-semibold text-gray-200">{lang}</div>
                    <div
                      className="bg-gray-800 text-gray-100 p-2 sm:p-3 rounded-md font-mono overflow-x-auto"
                      style={{ fontSize: `${Math.max(fontSize - 2, 10)}px` }}
                    >
                      {code.replace(/</g, "<").replace(/>/g, ">")}
                    </div>
                  </div>
                );
              }
              return <span key={i}>{part}</span>;
            }
            return <span key={i}>{part}</span>;
          })}
          {cursorElement}
        </div>
      );
    }

    return (
      <div className="whitespace-pre-wrap" style={{ fontSize: `${fontSize}px` }}>
        {textToRender}
        {cursorElement}
      </div>
    );
  };

  // Weaken animations for mobile devices
  const weakenAnimation = (callback: () => void) => {
    if (typeof window === "undefined" || window.innerWidth < 640) {
      // Reduce animation intensity or skip for mobile
      callback();
    } else {
      callback();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button with notification badge */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-50 p-3 sm:p-4 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        aria-label="Open chat"
        style={{ boxShadow: "0 0 15px rgba(37, 99, 235, 0.5)" }}
      >
        <FiMessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        {hasUnreadMessage && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            1
          </span>
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className={`fixed z-50 bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-2xl flex flex-col ${
              isFullscreen
                ? "inset-2 sm:inset-4 md:inset-16"
                : "bottom-16 right-4 w-[90vw] max-w-[360px] sm:w-96 md:w-[450px]"
            }`}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ boxShadow: "0 0 25px rgba(0, 0, 0, 0.2)" }}
          >
            {/* Chat Header */}
            <div className="p-3 sm:p-4 bg-blue-600 dark:bg-blue-700 text-white flex justify-between items-center">
              <div className="flex items-center">
                <FiTerminal className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="font-medium text-base sm:text-lg">Idrissa's Assistant</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={decreaseFontSize}
                  className="p-1 sm:p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Decrease text size"
                  title="Decrease text size"
                >
                  <span className="text-xs font-bold">A-</span>
                </button>
                <button
                  onClick={increaseFontSize}
                  className="p-1 sm:p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Increase text size"
                  title="Increase text size"
                >
                  <span className="text-xs font-bold">A+</span>
                </button>
                <button
                  onClick={copyChat}
                  className="p-1 sm:p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Copy chat"
                  title="Copy chat history"
                >
                  {showCopied ? (
                    <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <FiClipboard className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </button>
                <button
                  onClick={clearChat}
                  className="p-1 sm:p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Clear chat"
                  title="Clear chat history"
                >
                  <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-1 sm:p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <FiMinimize className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <FiMaximize className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1 sm:p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close chat"
                  title="Close chat"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              className={`flex-1 p-3 sm:p-4 overflow-y-auto ${
                isFullscreen ? "max-h-full" : "max-h-[400px] sm:max-h-[500px]"
              } bg-gray-50 dark:bg-gray-800`}
              ref={chatHistory}
              style={{ scrollbarWidth: "thin", scrollbarColor: "#4B5563 transparent" }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 ${
                    message.sender === "AI"
                      ? "bg-blue-600 dark:bg-blue-700 text-white ml-0 mr-auto max-w-[85%]"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white ml-auto mr-0 max-w-[85%]"
                  }`}
                  style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-xs sm:text-sm opacity-80">
                      {message.sender === "AI" ? (
                        <>
                          <FiCode className="mr-1 w-3 h-3 sm:w-4 sm:h-4" /> Assistant
                        </>
                      ) : (
                        <>
                          <FiUser className="mr-1 w-3 h-3 sm:w-4 sm:h-4" /> You
                        </>
                      )}
                    </div>
                    <div className="text-xs opacity-70">{formatTime(message.timestamp)}</div>
                  </div>
                  {renderMessageContent(message)}
                </div>
              ))}

              {isTyping && (
                <div className="p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 max-w-[85%] bg-blue-600 dark:bg-blue-700 text-white ml-0">
                  <div className="flex items-center mb-2 text-xs sm:text-sm opacity-80">
                    <FiCode className="mr-1 w-3 h-3 sm:w-4 sm:h-4" /> Assistant
                  </div>
                  <div className="flex space-x-2 p-2">
                    <div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-bounce"
                      style={{ animationDelay: "200ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-bounce"
                      style={{ animationDelay: "400ms" }}
                    ></div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 border-t-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-end">
              <textarea
                ref={inputRef}
                value={userMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 resize-none outline-none bg-transparent text-gray-900 dark:text-white py-1 px-1 mr-2 sm:mr-3 border-b border-gray-300 dark:border-gray-700 focus:border-blue-500 transition-colors"
                style={{
                  minHeight: "40px",
                  fontSize: `${fontSize}px`,
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!userMessage.trim() || isTyping}
                className="p-2 sm:p-3 rounded-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center justify-center disabled:opacity-50"
                aria-label="Send message"
              >
                <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for scrollbars and animations */}
      <style jsx global>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 5px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(107, 114, 128, 0.5);
          border-radius: 20px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background-color: rgba(107, 114, 128, 0.7);
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}