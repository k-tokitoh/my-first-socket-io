import { Server, Socket } from "socket.io";
import { Message } from "../models";

type MessageInput = { roomId: string; body: string };

const listener = (io: Server, socket: Socket) => {
  socket.on("message", (input: MessageInput, callback: () => void) => {
    console.log("roomId: " + input.roomId);
    console.log("message: " + input.body);
    const message = new Message(input);
    message.save();
    io.in(input.roomId).emit("message", message);
    callback();
  });
};

export default listener;
