import React, { FC } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

const App: FC = () => {
  const socket = io(process.env.WEBSOCKET_ENDPOINT);
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    socket.emit("create message", data.body);
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="text" ref={register({ required: true })} name="body" />
      <button>post</button>
    </form>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
