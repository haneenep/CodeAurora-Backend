import { Server } from "socket.io";
import { connectRabbitMQ } from "../infrastructure/config/rabbitmq";
import { getSocketIdByUserId } from "../utils/socketStore";

export const consumerUserBlockedQueue = async(io: Server) => {
    const channel = await connectRabbitMQ();
    const queueName = 'user.blocked';

    await channel.assertQueue(queueName, {durable: true});

    channel.consume(queueName, async(mssge) => {
        if(!mssge) return;

        const {userId, reason} = JSON.parse(mssge.content.toString());
        console.log(`Received block event for user: ${userId}`)

        const socketId = getSocketIdByUserId(userId);
        if(socketId) {
            io.to(socketId).emit('user-blocked', {
                message: reason || 'You have been blocked by the admin',
            });
        } else {
            console.warn(`Socket ID not found for user ${userId}`);
        }
        channel.ack(mssge);
    })
}