import { Server, Socket } from "socket.io";

const listener = (_io: Server, socket: Socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};

export default listener;
