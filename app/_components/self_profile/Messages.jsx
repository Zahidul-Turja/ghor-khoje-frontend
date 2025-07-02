import React, { useState, useEffect } from "react";
import { AlertCircle, Construction } from "lucide-react";
import { useWebSocket } from "@/app/_lib/hooks";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get current user from localStorage
  const [currentUser] = useState(() => {
    const user = window.localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  // Get token for WebSocket authentication
  const [token, setToken] = useState(() => {
    const storedToken = window.localStorage.getItem("access_token");
    console.log(
      "Retrieved token from localStorage:",
      storedToken ? "Present" : "Missing",
    );
    return storedToken;
  });

  // Debug current user
  useEffect(() => {
    console.log("Current user:", currentUser);
    console.log("Token available:", token ? "Yes" : "No");

    // Check if token is valid format
    if (token) {
      try {
        const parts = token.split(".");
        if (parts.length !== 3) {
          console.error("Invalid JWT token format");
          setError("Invalid authentication token format");
        } else {
          console.log("Token appears to be valid JWT format");
        }
      } catch (err) {
        console.error("Error checking token:", err);
      }
    }
  }, [currentUser, token]);

  // WebSocket connection - only connect if we have token and current user
  const {
    socket,
    isConnected,
    sendMessage,
    error: wsError,
  } = useWebSocket(
    `${process.env.NEXT_PUBLIC_CHAT_SOCKET_ENDPOINT}/ws/chat/`,
    token && currentUser ? token : null,
  );

  // Fetch conversations on component mount
  useEffect(() => {
    fetchConversations();
  }, []);

  // Setup WebSocket message listener
  useEffect(() => {
    if (socket) {
      const handleMessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.error) {
          console.error("WebSocket error:", data.error);
          setError(data.error);
          return;
        }

        // Add new message to the current conversation
        if (
          data.conversation_id &&
          selectedConversation?.id === data.conversation_id
        ) {
          const newMessage = {
            id: Date.now(), // Temporary ID
            sender: { id: data.sender_id, full_name: data.sender },
            content: data.message,
            created_at: data.timestamp,
            is_read: false,
            is_edited: false,
            is_deleted: false,
            attachment: null,
            conversation: data.conversation_id,
          };

          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }

        // Update conversations list with new message
        setConversations((prevConversations) =>
          prevConversations.map((conv) =>
            conv.id === data.conversation_id
              ? {
                  ...conv,
                  last_message: {
                    content: data.message,
                    created_at: data.timestamp,
                    sender: { id: data.sender_id, full_name: data.sender },
                  },
                }
              : conv,
          ),
        );
      };

      socket.addEventListener("message", handleMessage);

      return () => {
        socket.removeEventListener("message", handleMessage);
      };
    }
  }, [socket, selectedConversation]);

  const fetchConversations = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/chat/conversations/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch conversations");
      }

      const result = await response.json();
      setConversations(result.data || []);
    } catch (err) {
      console.error("Error fetching conversations:", err);
      setError("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/chat/messages/${conversationId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const result = await response.json();
      setMessages(result.data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages");
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    fetchMessages(conversation.id);
  };

  const handleSendMessage = (messageText) => {
    if (!selectedConversation || !messageText.trim()) return;

    const messageData = {
      conversation_id: selectedConversation.id,
      receiver_id: selectedConversation.other_user.id,
      message: messageText,
    };

    const success = sendMessage(messageData);

    if (!success) {
      setError("Failed to send message. Please check your connection.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="mx-auto flex h-screen flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 shadow-sm dark:bg-gray-900">
          <h1 className="text-3xl font-bold">Messages</h1>
          <div className="flex items-center gap-2">
            {!isConnected && (
              <div className="mr-4 flex items-center text-sm text-amber-600">
                <AlertCircle size={16} className="mr-2" />
                Connecting...
              </div>
            )}
            <div className="rounded-full bg-primary/80 p-2 shadow-md">
              <Construction
                size={20}
                className="text-white transition-colors duration-200 hover:text-gray-300 dark:text-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex flex-1 overflow-hidden">
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            currentUser={currentUser}
          />

          <ChatWindow
            conversation={selectedConversation}
            messages={messages}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
            isConnected={isConnected}
          />
        </div>
      </div>
    </div>
  );
}

export default Messages;
