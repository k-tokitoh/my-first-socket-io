import { Server, Socket } from "socket.io";
import { Room } from "../models";

const listener = (_io: Server, socket: Socket) => {
  socket.on("join", (roomId: string) => {
    socket.join(roomId);
    console.log(`a user joined to room (id: ${roomId})`);
    const room = new Room({ name: "test room" });
    room.save();
  });
};

export default listener;
