import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

type Message = { body: string };

const App: FC = () => {
  const [messages, setMessages] = useState<Array<string>>([]);
  const socket = io(process.env.WEBSOCKET_ENDPOINT);

  const { register, handleSubmit, reset } = useForm<Message>();
  const onSubmit = handleSubmit(async (data) => {
    socket.emit("message", data.body, () => reset());
  });

  socket.on("message", (message: string) => {
    setMessages([...messages, message]);
  });

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message}>{message}</li>
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
