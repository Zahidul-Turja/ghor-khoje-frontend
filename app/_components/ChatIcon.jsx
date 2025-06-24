"use client";

import { useState, useEffect, useRef } from "react";
import { MdMarkChatUnread, MdClose, MdSend } from "react-icons/md";
import { Tooltip } from "react-tooltip";

import useAuthStore from "../_store/authStore";
import { useWebSocket } from "@/app/_lib/hooks"; // Adjust import path as needed

function ChatIcon({ receiver }) {
  const { user } = useAuthStore();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  // WebSocket URL and token from your environment and localStorage
  const wsUrl = `${process.env.NEXT_PUBLIC_CHAT_SOCKET_ENDPOINT}/ws/chat/`;
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("access_token")
      : null;

  // Only connect to WebSocket when chat is open
  const { socket, isConnected, error, sendMessage, disconnect } = useWebSocket(
    wsUrl,
    isChatOpen && token ? token : null,
  );

  // Listen for incoming messages only when chat is open
  useEffect(() => {
    if (socket && isChatOpen) {
      const handleMessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          console.log("Received WebSocket message:", data); // Debug log

          if (data.error) {
            console.error("WebSocket error:", data.error);
            return;
          }

          // Add new message matching your API structure
          const newMessage = {
            id: data.message_id || Date.now(), // Use server ID if available
            sender: {
              id: data.sender_id,
              full_name: data.sender,
              profile_image: data.sender_image || null,
            },
            content: data.message,
            created_at: data.timestamp,
            is_read: false,
            is_edited: false,
            is_deleted: false,
            attachment: null,
            conversation_id: data.conversation_id,
          };

          // Add message regardless of conversation match for this simple chat
          setMessages((prev) => {
            // Check if message already exists to prevent duplicates
            const exists = prev.some(
              (msg) =>
                msg.id === newMessage.id ||
                (msg.content === newMessage.content &&
                  msg.sender.id === newMessage.sender.id &&
                  Math.abs(
                    new Date(msg.created_at) - new Date(newMessage.created_at),
                  ) < 1000),
            );

            if (exists) {
              console.log("Message already exists, skipping");
              return prev;
            }

            console.log("Adding new message:", newMessage);
            return [...prev, newMessage];
          });
        } catch (err) {
          console.error("Failed to parse message:", err);
        }
      };

      socket.addEventListener("message", handleMessage);
      return () => socket.removeEventListener("message", handleMessage);
    }
  }, [socket, isChatOpen]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !isConnected) return;

    // First check if conversation exists, if not create one
    let conversationId = null;

    try {
      // Try to find or create conversation
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/chat/conversations/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            participant_id: receiver.id,
          }),
        },
      );

      if (response.ok) {
        const result = await response.json();
        conversationId = result.data?.id;
      }
    } catch (err) {
      console.error("Error creating/finding conversation:", err);
    }

    const messageData = {
      conversation_id: conversationId,
      receiver_id: receiver.id,
      message: inputMessage,
    };

    const success = sendMessage(messageData);

    if (success) {
      // Only clear input, don't add to local state - let WebSocket handle it
      setInputMessage("");
    }
  };

  const toggleChat = () => {
    if (isChatOpen) {
      // Disconnect when closing chat
      disconnect();
      setMessages([]); // Clear messages when closing
    }
    setIsChatOpen(!isChatOpen);
  };

  if (!user) return null;

  return (
    <>
      {/* Chat Icon */}
      <div
        className={`tooltip-chat fixed bottom-12 right-20 z-[1000] cursor-pointer rounded-full bg-primary p-3 text-white shadow-lg transition hover:scale-110 ${isChatOpen ? "hidden" : "block"}`}
        onClick={toggleChat}
      >
        <MdMarkChatUnread className="text-2xl" />
      </div>

      {/* Tooltip - only show when chat is closed */}
      {!isChatOpen && (
        <Tooltip
          anchorSelect=".tooltip-chat"
          place="left"
          className="tooltip !rounded-xl !border !border-gray-200 !bg-white !p-0 !shadow-xl transition-all"
        >
          <div className="flex w-48 flex-col items-center p-4">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Chat with the host
            </p>
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-300">
              <img
                src={receiver?.profile_image || "/profile-1.jpg"}
                alt="Host Profile"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-gray-800">
              {receiver?.full_name || "John Doe"}
            </p>
          </div>
        </Tooltip>
      )}

      {/* Chat Card */}
      {isChatOpen && (
        <ChatCard
          isOpen={isChatOpen}
          onClose={toggleChat}
          messages={messages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={handleSendMessage}
          isConnected={isConnected}
          error={error}
          receiver={receiver}
          user={user}
        />
      )}
    </>
  );
}

function ChatCard({
  isOpen,
  onClose,
  messages,
  inputMessage,
  setInputMessage,
  onSendMessage,
  isConnected,
  error,
  receiver,
  user,
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`fixed bottom-12 right-20 z-[1000] w-80 rounded-lg border border-gray-200 bg-white shadow-xl transition-all duration-300 ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-lg border-b border-gray-200 bg-primary p-4">
        <div className="flex items-center space-x-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white">
            <img
              src={receiver?.profile_image || "/profile-1.jpg"}
              alt="Host Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {receiver?.full_name || "John Doe"}
            </p>
            <p className="text-xs text-gray-200">
              {isConnected ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-white transition hover:bg-white/20"
        >
          <MdClose className="text-lg" />
        </button>
      </div>

      {/* Connection Status */}
      {error && (
        <div className="border-b border-red-200 bg-red-50 p-2">
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {!isConnected && (
        <div className="border-b border-yellow-200 bg-yellow-50 p-2">
          <p className="text-xs text-yellow-600">
            Connecting to chat server...
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="h-64 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-sm text-gray-500">
            Start a conversation...
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender.id === user.id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-xs items-end space-x-2 ${message.sender.id === user.id ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {/* Avatar for received messages */}
                {message.sender.id !== user.id && (
                  <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
                    <img
                      src={
                        message.sender.profile_image ||
                        receiver?.profile_image ||
                        "/profile-1.jpg"
                      }
                      alt={message.sender.full_name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={`rounded-lg px-3 py-2 text-sm ${
                    message.sender.id === user.id
                      ? "rounded-br-none bg-primary text-white"
                      : "rounded-bl-none bg-gray-100 text-gray-800"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`mt-1 text-xs ${
                      message.sender.id === user.id
                        ? "text-gray-200"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(message.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={onSendMessage} className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={!isConnected}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || !isConnected}
            className="rounded-lg bg-primary px-3 py-2 text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MdSend className="text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatIcon;
