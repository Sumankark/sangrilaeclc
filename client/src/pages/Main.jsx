import React from "react";
import NavBar from "../components/NavBar";

const Main = () => {
  return (
    <div>
      <NavBar />
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
        <div className="static"></div>
      </div>
      Main
    </div>
  );
};

export default Main;
