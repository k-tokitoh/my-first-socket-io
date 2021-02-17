import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { connect, Schema, model } from "mongoose";
import cors from "cors";

Dotenv.config();

connect(process.env.DB_URI as string);

const RoomSchema = new Schema({ name: String });
const Room = model("Room", RoomSchema);

const app = express();
app.use(cors({ origin: process.env.ALLOWED_HOST }));
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("<h1>Hello world</h1>");
});

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

type Message = { id?: string; body: string };

io.on("connection", (socket) => {
  socket.on("join", (roomId: string) => {
    socket.join(roomId);
    console.log(`a user joined to room (id: ${roomId})`);
    const room = new Room({ name: "test room" });
    room.save();
  });
  console.log("a user connected");
  socket.on(
    "message",
    (roomId: string, message: Message, callback: () => void) => {
      console.log("roomId: " + roomId);
      console.log("message: " + message.body);
      message.id = uuidv4();
      io.in(roomId).emit("message", message);
      callback();
    }
  );
});

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
