import React, { FC } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";

const App: FC = () => {
  io(process.env.WEBSOCKET_ENDPOINT);
  return <div>hello</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
