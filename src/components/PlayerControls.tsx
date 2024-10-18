import React from "react";
// import Image from "next/image";

const PlayerControls: React.FC = () => {
  return (
    <div className="test_controller">
      <div className="topbar">
        {/* <div className="timer">
          <Image
            src="/img/clock.png"
            width={20}
            height={20}
            className="icon"
            alt="Clock"
          />
          <span id="watch">00:00:00</span>
        </div> */}
        <div className="timer">
          Turn: <span className="current_turn">...</span>
          <span id="dice_value"></span>
        </div>
      </div>
      <button id="dice" className="d0"></button>
      <div className="red_control control">
        <button id="movered1" className="player movered1 bg-red"></button>
        <button id="movered2" className="player movered2 bg-red"></button>
        <button id="movered3" className="player movered3 bg-red"></button>
        <button id="movered4" className="player movered4 bg-red"></button>
      </div>

      <div className="green_control control">
        <button id="movegreen1" className="player movegreen1 bg-green"></button>
        <button id="movegreen2" className="player movegreen2 bg-green"></button>
        <button id="movegreen3" className="player movegreen3 bg-green"></button>
        <button id="movegreen4" className="player movegreen4 bg-green"></button>
      </div>
      <div className="yellow_control control">
        <button
          id="moveyellow1"
          className="player moveyellow1 bg-yellow"
        ></button>
        <button
          id="moveyellow2"
          className="player moveyellow2 bg-yellow"
        ></button>
        <button
          id="moveyellow3"
          className="player moveyellow3 bg-yellow"
        ></button>
        <button
          id="moveyellow4"
          className="player moveyellow4 bg-yellow"
        ></button>
      </div>
      <div className="blue_control control">
        <button id="moveblue1" className="player moveblue1 bg-blue"></button>
        <button id="moveblue2" className="player moveblue2 bg-blue"></button>
        <button id="moveblue3" className="player moveblue3 bg-blue"></button>
        <button id="moveblue4" className="player moveblue4 bg-blue"></button>
      </div>

      <h1 className="red_control rc_name"></h1>
      <h1 className="green_control gc_name"></h1>
      <h1 className="yellow_control yc_name"></h1>
      <h1 className="blue_control bc_name"></h1>
    </div>
  );
};

export default PlayerControls;
