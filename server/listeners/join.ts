import { Server, Socket } from "socket.io";
import { Room } from "../models";

const listener = (_io: Server, socket: Socket) => {
  socket.on("join", (roomId: string) => {
    socket.join(roomId);
    console.log(`a user joined to room (id: ${roomId})`);
  });
};

export default listener;
