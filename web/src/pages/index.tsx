import React, { FC } from "react";
import { useHistory } from "react-router-dom";

const Index: FC = () => {
  const history = useHistory();

  const enterRoom = async () => {
    const res = await fetch(`${process.env.BACKEND_BASE_URI}/rooms`, {
      method: "POST",
    });
    const room = await res.json();
    history.push(`/rooms/${room._id}`);
  };

  return (
    <>
      this is index page.
      <button onClick={enterRoom}>click here to enter a room.</button>
    </>
  );
};

export default Index;
