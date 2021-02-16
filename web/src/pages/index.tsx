import React, { FC } from "react";
import { Link } from "react-router-dom";

const Index: FC = () => {
  return (
    <>
      this is index page.
      <Link to="/rooms/foo">click here to enter a room.</Link>
    </>
  );
};

export default Index;
