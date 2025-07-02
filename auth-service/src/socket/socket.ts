import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | null = null;

export const setSocketInstance = (instance: SocketIOServer): void => {
  io = instance;
};

export const getSocketInstance = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.IO instance has not been initialized.");
  }
  return io;
};