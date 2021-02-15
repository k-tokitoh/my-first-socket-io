import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("<h1>Hello world</h1>");
});

const httpServer = createServer(app);

const options = {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
};

const io = new Server(httpServer, options);

io.on("connection", (_socket) => {
  console.log("a user connected");
});

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
