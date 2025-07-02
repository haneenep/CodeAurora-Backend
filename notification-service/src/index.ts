import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { pubClient, subClient } from "./infrastructure/config/redis";
import { setSocketInstance } from "./utils/socketInstance";
import { initializeSocketEvents } from "./socket/connection";
import { ENV, validateEnv } from "./utils/validateEnv";
import { config } from "dotenv";
import { consumerUserBlockedQueue } from "./queue/consumer";

config();

(async () => {
  validateEnv();

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  try {
    console.log("Connecting Redis clients");
    await pubClient.connect();
    await subClient.connect();
    console.log("✅ Redis connected");

    io.adapter(createAdapter(pubClient, subClient));
    
    setSocketInstance(io);
    initializeSocketEvents(io);
    consumerUserBlockedQueue(io);

    server.listen(ENV.PORT, () => {
      console.log(`🚀 Notification Service running on port ${ENV.PORT}`);
    });
  } catch (err) {
    console.error("Error during server startup:", err);
  }
})();
