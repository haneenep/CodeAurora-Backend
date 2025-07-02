import { Server } from "socket.io";
import { addUserSocket, removeUserSocket } from "../utils/socketStore";

export const initializeSocketEvents = (io: Server) => {
    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId as string;
        if(!userId) {
            socket.disconnect();
            return;
        }

        console.log(userId, 'user connected on socket successfuly');

        addUserSocket(userId, socket.id);

        socket.on('message', (data) => {
            console.log('Received:', data);
            io.emit('message', data);
        });


        socket.on('disconnect', () => {
            removeUserSocket(socket.id);
            console.log(`user ${userId} disconnected`);
        })
    });


}