import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

const App: FC = () => {
  const [messages, setMessages] = useState<Array<String>>([]);
  const socket = io(process.env.WEBSOCKET_ENDPOINT);
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    socket.emit("message", data.body);
  });

  socket.on("message", (message: string) => {
    setMessages([...messages, message]);
  });

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
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
