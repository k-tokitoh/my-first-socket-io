import { Server, Socket } from "socket.io";
import { Message, Room } from "../models";

type MessageInput = { room: string; body: string };

const listener = (io: Server, socket: Socket) => {
  socket.on("message", async (input: MessageInput, callback: () => void) => {
    console.log("roomId: " + input.room);
    console.log("message: " + input.body);
    const message = new Message(input);
    const room = await Room.findById(message.room);
    message.save();
    room?.messages.push(message.id);
    room?.save();
    io.in(input.room).emit("message", message);
    callback();
  });
};

export default listener;
