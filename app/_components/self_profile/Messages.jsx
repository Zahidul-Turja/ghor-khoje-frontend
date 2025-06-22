import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Clock,
  AlertCircle,
  Send,
  User,
  MessageCircle,
  Wifi,
  WifiOff,
} from "lucide-react";

function Messages() {
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(window.localStorage.getItem("user")),
  );
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // setCurrentUser(JSON.parse(window.localStorage.getItem("user")));
    console.log("Current User:", currentUser);
  }, [messages]);

  // Initialize WebSocket connection
  const connectWebSocket = useCallback(() => {
    if (socket) {
      socket.close();
    }

    const wsUrl = `${process.env.NEXT_PUBLIC_CHAT_SOCKET_ENDPOINT}/ws/chat/?token=${window.localStorage.getItem(
      "access_token",
    )}`;
    const newSocket = new WebSocket(wsUrl);

    newSocket.onopen = () => {
      console.log("WebSocket connected");
      setConnectionStatus("connected");
      setError(null);
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.error) {
        setError(data.error);
        return;
      }

      // Handle incoming message
      const newMessage = {
        id: Date.now(),
        conversation_id: data.conversation_id,
        sender: data.sender,
        sender_id: data.sender_id,
        content: data.message,
        timestamp: data.timestamp,
        isOwn: data.sender_id === currentUser.id,
      };

      setMessages((prev) => [...prev, newMessage]);

      // Update conversation list (move to top or update last message)
      setConversations((prev) => {
        const updatedConversations = [...prev];
        const conversationIndex = updatedConversations.findIndex(
          (conv) => conv.id === data.conversation_id,
        );

        if (conversationIndex !== -1) {
          const conversation = updatedConversations[conversationIndex];
          conversation.lastMessage = data.message;
          conversation.lastMessageTime = data.timestamp;

          // Move to top
          updatedConversations.splice(conversationIndex, 1);
          updatedConversations.unshift(conversation);
        }

        return updatedConversations;
      });
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
      setConnectionStatus("disconnected");
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("error");
      setError("Connection error occurred");
    };

    setSocket(newSocket);
  }, [currentUser.token]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connectWebSocket]);

  // Mock conversations data - replace with API call
  useEffect(() => {
    // This would typically be an API call to fetch user's conversations
    const mockConversations = [
      {
        id: 1,
        name: "John Doe",
        lastMessage: "Hey, how are you?",
        lastMessageTime: "2025-06-22T10:30:00Z",
        unreadCount: 2,
        isOnline: true,
      },
      {
        id: 2,
        name: "Jane Smith",
        lastMessage: "Thanks for your help!",
        lastMessageTime: "2025-06-22T09:15:00Z",
        unreadCount: 0,
        isOnline: false,
      },
      {
        id: 3,
        name: "Admin Support",
        lastMessage: "We'll get back to you soon",
        lastMessageTime: "2025-06-21T16:45:00Z",
        unreadCount: 1,
        isOnline: true,
      },
    ];
    setConversations(mockConversations);
  }, []);

  const sendMessage = () => {
    if (!messageInput.trim() || !socket || !activeConversation) return;

    const messageData = {
      conversation_id: activeConversation.id,
      message: messageInput.trim(),
      to_admin: activeConversation.name === "Admin Support",
    };

    socket.send(JSON.stringify(messageData));
    setMessageInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const selectConversation = (conversation) => {
    setActiveConversation(conversation);
    setMessages([]); // Clear messages, in real app you'd load conversation messages

    // Mock loading messages for the conversation
    setTimeout(() => {
      const mockMessages = [
        {
          id: 1,
          conversation_id: conversation.id,
          sender: conversation.name,
          sender_id: conversation.id,
          content: "Hello there!",
          timestamp: "2025-06-22T10:00:00Z",
          isOwn: false,
        },
        {
          id: 2,
          conversation_id: conversation.id,
          sender: currentUser.name,
          sender_id: currentUser.id,
          content: "Hi! How can I help you?",
          timestamp: "2025-06-22T10:01:00Z",
          isOwn: true,
        },
      ];
      setMessages(mockMessages);
    }, 500);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <Wifi size={16} className="text-green-500" />;
      case "disconnected":
        return <WifiOff size={16} className="text-red-500" />;
      case "error":
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
              {getConnectionIcon()}
              <span className="text-sm font-medium capitalize text-gray-600">
                {connectionStatus}
              </span>
            </div>
            <div className="rounded-full bg-primary/80 p-2 shadow-md">
              <MessageCircle size={20} className="text-white" />
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        <div className="grid h-[calc(100vh-200px)] grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Conversations List */}
          <div className="overflow-hidden rounded-xl bg-white shadow-lg lg:col-span-1">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Conversations
              </h2>
            </div>
            <div className="h-full overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => selectConversation(conversation)}
                  className={`cursor-pointer border-b border-gray-100 p-4 transition-colors hover:bg-gray-50 ${
                    activeConversation?.id === conversation.id
                      ? "border-l-4 border-l-blue-500 bg-blue-50"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                        <User size={20} className="text-white" />
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="truncate font-medium text-gray-900">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessageTime)}
                        </span>
                      </div>
                      <p className="truncate text-sm text-gray-600">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                        <span className="text-xs font-bold text-white">
                          {conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg lg:col-span-2">
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="border-b border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                        <User size={16} className="text-white" />
                      </div>
                      {activeConversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full border border-white bg-green-500"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {activeConversation.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {activeConversation.isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                          message.isOwn
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`mt-1 text-xs ${
                            message.isOwn ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={connectionStatus !== "connected"}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={
                        !messageInput.trim() || connectionStatus !== "connected"
                      }
                      className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageCircle
                    size={48}
                    className="mx-auto mb-4 text-gray-300"
                  />
                  <p className="mb-2 text-lg font-medium">
                    Select a conversation
                  </p>
                  <p className="text-sm">
                    Choose a conversation from the sidebar to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
