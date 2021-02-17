import express from "express";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import Dotenv from "dotenv";
import cors from "cors";
import dbClient from "./db/client";
import rooms from "./routes/rooms";
import joinListener from "./listeners/join";
import messageListener from "./listeners/message";
import disconnectListener from "./listeners/disconnect";

Dotenv.config();

dbClient.initialize();

const app = express();

app.use(cors({ origin: process.env.ALLOWED_HOST }));

app.use("/rooms", rooms);

const httpServer = createServer(app);

const socketOptions = {
  cors: {
    origin: process.env.ALLOWED_HOST,
    methods: ["GET", "POST"],
  },
};

const io = new SocketServer(httpServer, socketOptions);

io.on("connection", (socket) => {
  console.log("a user connected");

  joinListener(io, socket);
  messageListener(io, socket);
  disconnectListener(io, socket);
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
