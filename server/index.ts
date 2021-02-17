import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Dotenv from "dotenv";
import { connect, set } from "mongoose";
import cors from "cors";
import { Room, Message } from "./models";

Dotenv.config();

connect(process.env.DB_URI as string);

set("toJSON", {
  virtuals: true,
  transform: (_doc: never, converted: { _id?: string }) => {
    delete converted._id;
  },
});

const app = express();
app.use(cors({ origin: process.env.ALLOWED_HOST }));
const port = process.env.PORT || 3000;

app.post("/rooms", (_req, res) => {
  const room = new Room();
  res.json(room);
});

const httpServer = createServer(app);

const options = {
  cors: {
    origin: process.env.ALLOWED_HOST,
    methods: ["GET", "POST"],
  },
};

const io = new Server(httpServer, options);

type MessageInput = { roomId: string; body: string };

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("join", (roomId: string) => {
    socket.join(roomId);
    console.log(`a user joined to room (id: ${roomId})`);
    const room = new Room({ name: "test room" });
    room.save();
  });
  console.log("a user connected");
  socket.on("message", (input: MessageInput, callback: () => void) => {
    console.log("roomId: " + input.roomId);
    console.log("message: " + input.body);
    const message = new Message(input);
    message.save();
    io.in(input.roomId).emit("message", message);
    callback();
  });
});

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
