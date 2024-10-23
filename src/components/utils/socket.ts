import io, { Socket } from "socket.io-client";

const URL =
  process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:3001";

export type SocketType = typeof Socket | null;
let socket: SocketType = null;

export const getSocket = (): SocketType => {
  if (!socket) {
    console.log("Creating new socket connection");
    socket = io(URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    socket.on("connect_error", (error: string) => {
      console.error("Socket connection error:", error);
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("Disconnecting socket");
    socket.disconnect();
    socket = null;
  }
};
