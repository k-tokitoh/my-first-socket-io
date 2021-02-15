import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Dotenv from "dotenv";

Dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("<h1>Hello world</h1>");
});

const httpServer = createServer(app);

const options = {
  cors: {
    origin: process.env.ALLOWED_HOST,
    methods: ["GET", "POST"],
  },
};

const io = new Server(httpServer, options);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (msg: string, callback: () => void) => {
    console.log("message: " + msg);
    io.emit("message", msg);
    callback();
  });
});

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
