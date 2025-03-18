const WEBSOCKET_URL = "wss://9410-203-145-47-225.ngrok-free.app/ws";
import { useEffect, useState, useRef } from "react";

export const useWebSocket = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(WEBSOCKET_URL);

    socketRef.current.onopen = () => {
      console.log("ws connected");
    };

    socketRef.current.onmessage = (event) => {
      console.log("recived from backend:", event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    socketRef.current.onerror = (error) => {
      console.error("ws error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("ws closed");
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = (msg: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log("send message:", msg);
      socketRef.current.send(msg);
    } else {
      console.warn("ws not connected. Message not sent.");
    }
  };

  return { messages, sendMessage };
};
