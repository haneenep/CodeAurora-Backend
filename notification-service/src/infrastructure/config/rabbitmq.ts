import amqp from 'amqplib';

let channel: amqp.Channel;

export const connectRabbitMQ = async(): Promise<amqp.Channel> => {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    return channel;
}

export const getRabbitChanel = (): amqp.Channel => {
    if(!channel) throw new Error('Rabbit<Q channel not initialized');
    return channel;
}