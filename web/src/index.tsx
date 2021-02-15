import React, { FC } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";

const App: FC = () => {
  io("http://localhost:3000");
  return <div>hello</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
