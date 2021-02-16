import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

type Params = { id: string };

type Message = { id?: string; body: string };

const Room: FC = () => {
  const { id: roomId } = useParams<Params>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  useEffect(() => {
    const socket = io(process.env.WEBSOCKET_ENDPOINT);
    setSocket(socket);
    socket.emit("join", roomId);
  }, []);

  socket?.on("message", (message: Message) => {
    setMessages([...messages, message]);
  });

  const { register, handleSubmit, reset } = useForm<Message>();
  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    socket?.emit("message", roomId, data, () => {
      reset();
      setSubmitting(false);
    });
  });

  return (
    <>
      <div>this is a room. (id: {roomId})</div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.body}</li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <input type="text" ref={register({ required: true })} name="body" />
        <button disabled={isSubmitting}>post</button>
      </form>
    </>
  );
};

export default Room;
