import io, { Socket } from "socket.io-client";

const URL =
  process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:3001";

export type SocketType = typeof Socket | null;
let socket: SocketType = null;

export const initiateSocketConnection = (): SocketType => {
  if (!socket) {
    socket = io(URL);
    console.log("Connecting to socket.io server...");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Disconnected from socket.io server.");
  }
};

export const getSocket = (): SocketType | null => socket;
