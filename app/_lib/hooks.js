import { useState, useEffect, useRef, useCallback } from "react";

export const useWebSocket = (url, token) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3; // Reduced to prevent infinite loops
  const socketRef = useRef(null);

  const connect = useCallback(() => {
    // Don't connect if no token or already connecting
    if (!token || socketRef.current) {
      console.log("Skipping connection - no token or already connecting");
      return;
    }

    console.log(
      "Attempting WebSocket connection with token:",
      token ? "Present" : "Missing",
    );

    try {
      const wsUrl = `${url}?token=${encodeURIComponent(token)}`;
      console.log("Connecting to:", wsUrl);

      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = (event) => {
        console.log("WebSocket connected successfully", event);
        setIsConnected(true);
        setError(null);
        reconnectAttempts.current = 0;
        setSocket(ws);
      };

      ws.onclose = (event) => {
        console.log("WebSocket disconnected:", {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
        });

        setIsConnected(false);
        setSocket(null);
        socketRef.current = null;

        // Handle different close codes
        if (event.code === 1006) {
          setError("Connection failed - Check authentication token");
        } else if (event.code === 1011) {
          setError("Server error occurred");
        } else if (event.code === 4000) {
          setError("Authentication failed");
          return; // Don't reconnect on auth failure
        }

        // Only auto-reconnect on unexpected disconnections
        if (
          !event.wasClean &&
          reconnectAttempts.current < maxReconnectAttempts
        ) {
          const delay = Math.min(
            Math.pow(2, reconnectAttempts.current) * 1000,
            10000,
          );
          console.log(
            `Reconnection attempt ${reconnectAttempts.current + 1} in ${delay}ms`,
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttempts.current += 1;
            connect();
          }, delay);
        } else if (reconnectAttempts.current >= maxReconnectAttempts) {
          setError("Failed to reconnect after multiple attempts");
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("Connection error occurred");
      };

      // Add timeout for connection
      const connectionTimeout = setTimeout(() => {
        if (ws.readyState === WebSocket.CONNECTING) {
          console.log("Connection timeout");
          ws.close();
          setError("Connection timeout");
        }
      }, 10000);

      ws.onopen = (event) => {
        clearTimeout(connectionTimeout);
        console.log("WebSocket connected successfully", event);
        setIsConnected(true);
        setError(null);
        reconnectAttempts.current = 0;
        setSocket(ws);
      };
    } catch (err) {
      console.error("Failed to create WebSocket:", err);
      setError("Failed to connect to chat server");
      socketRef.current = null;
    }
  }, [url, token]);

  const disconnect = useCallback(() => {
    console.log("Manually disconnecting WebSocket");

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.close(1000, "Manual disconnect");
      socketRef.current = null;
    }

    setSocket(null);
    setIsConnected(false);
    reconnectAttempts.current = 0;
  }, []);

  const sendMessage = useCallback(
    (data) => {
      if (socket && isConnected && socket.readyState === WebSocket.OPEN) {
        try {
          socket.send(JSON.stringify(data));
          console.log("Message sent:", data);
          return true;
        } catch (err) {
          console.error("Failed to send message:", err);
          setError("Failed to send message");
          return false;
        }
      }
      console.log("Cannot send message - not connected");
      return false;
    },
    [socket, isConnected],
  );

  // Debug token changes
  useEffect(() => {
    console.log("Token changed:", token ? "Present" : "Missing");
  }, [token]);

  useEffect(() => {
    if (token) {
      connect();
    } else {
      console.log("No token available, not connecting");
      setError("No authentication token available");
    }

    return () => {
      console.log("Cleaning up WebSocket connection");
      disconnect();
    };
  }, [token]); // Only depend on token, not connect/disconnect

  return {
    socket,
    isConnected,
    error,
    sendMessage,
    reconnect: connect,
    disconnect,
  };
};
