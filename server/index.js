// server.ts (TypeScript for enhanced type safety)
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Broadcast messages to all clients
  socket.on("chatMessage", (message) => {
    console.log("Message received:", message);
    io.emit("chatMessage", { id: socket.id, message });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(8080, () => {
  console.log("Server is running on port 8080");
});
