let socket: WebSocket | null = null;
const WEBSOCKET_URL = "ws://localhost:8181/ws";
const listeners = new Set<(data: any) => void>();

export const connectWebSocket = () => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      console.log("websocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        listeners.forEach((callback) => callback(data));
      } catch (error) {
        console.error("websocket message error:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("websocket error:", error);
    };

    socket.onclose = () => {
      console.warn("websocket disconnected...");
      setTimeout(connectWebSocket, 5000);
    };
  }
};

export const addListener = (callback: (data: any) => void) => {
  listeners.add(callback);
};

export const removeListener = (callback: (data: any) => void) => {
  listeners.delete(callback);
};

export const callElevator = (floor: number, direction: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ floor, direction }));
  } else {
    console.warn("websocket not connected");
  }
};
