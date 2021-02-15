import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

type Message = { id?: string; body: string };

const App: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  useEffect(() => {
    setSocket(io(process.env.WEBSOCKET_ENDPOINT));
  }, []);

  const { register, handleSubmit, reset } = useForm<Message>();
  const onSubmit = handleSubmit(async (data) => {
    socket?.emit("message", data, () => reset());
  });

  socket?.on("message", (message: Message) => {
    setMessages([...messages, message]);
  });

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.body}</li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <input type="text" ref={register({ required: true })} name="body" />
        <button>post</button>
      </form>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
