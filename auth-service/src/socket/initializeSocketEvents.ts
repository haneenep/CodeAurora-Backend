import { addUserSocket, removeUserSocket } from "../utils/socketStore";
import { Server, Socket } from "socket.io";

export const initializeSocketEvents = (io: Server): void => {
  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;

    if (!userId) {
      socket.disconnect();
      return;
    }

    console.log(userId,"user connected successfully");

    addUserSocket(userId, socket.id);

    socket.on("message", (data) => {
      console.log("Received:", data);
      io.emit("message", data);
    });

    socket.on("disconnect", () => {
      removeUserSocket(socket.id);
      console.log(`User ${userId} disconnected`);
    });
  });
};
