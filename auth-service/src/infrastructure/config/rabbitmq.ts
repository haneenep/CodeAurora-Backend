import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();

  await channel.assertQueue("user.blocked", { durable: true });
  console.log("✅ RabbitMQ connected");
};

export const getRabbitChannel = (): amqp.Channel => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  return channel;
};
