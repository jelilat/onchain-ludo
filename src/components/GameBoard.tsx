import React from "react";

const GameBoard: React.FC = () => {
  return (
    <div className="ludo-board">
      <div className="red-home red-home-bg bg-red super-center">
        <div className="white-box super-center">
          <div className="player-room">
            <button id="movered1" className="player movered1 bg-red"></button>
            <button id="movered2" className="player movered2 bg-red"></button>
            <button id="movered3" className="player movered3 bg-red"></button>
            <button id="movered4" className="player movered4 bg-red"></button>
          </div>
        </div>
      </div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>

      <div className="green-home green-home-bg bg-green super-center">
        <div className="white-box super-center">
          <div className="player-room">
            <button
              id="movegreen1"
              className="player movegreen1 bg-green"
            ></button>
            <button
              id="movegreen2"
              className="player movegreen2 bg-green"
            ></button>
            <button
              id="movegreen3"
              className="player movegreen3 bg-green"
            ></button>
            <button
              id="movegreen4"
              className="player movegreen4 bg-green"
            ></button>
          </div>
        </div>
      </div>
      <div className="step"></div>
      <div className="step bg-green"></div>
      <div className="step bg-green"></div>
      <div className="step"></div>
      <div className="step bg-green"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step bg-green"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step bg-green"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step bg-green"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step bg-red"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="winner-home">
        <div className="rwh stack"></div>
        <div className="gwh stack"></div>
        <div className="bwh stack"></div>
        <div className="ywh stack"></div>
      </div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step bg-red"></div>
      <div className="step bg-red"></div>
      <div className="step bg-red"></div>
      <div className="step bg-red"></div>
      <div className="step bg-red"></div>
      <div className="step bg-yellow"></div>
      <div className="step bg-yellow"></div>
      <div className="step bg-yellow"></div>
      <div className="step bg-yellow"></div>
      <div className="step bg-yellow"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step bg-yellow"></div>
      <div className="step"></div>
      <div className="blue-home bg-blue blue-home-bg super-center">
        <div className="white-box super-center">
          <div className="player-room">
            <button
              id="moveblue1"
              className="player moveblue1 bg-blue"
            ></button>
            <button
              id="moveblue2"
              className="player moveblue2 bg-blue"
            ></button>
            <button
              id="moveblue3"
              className="player moveblue3 bg-blue"
            ></button>
            <button
              id="moveblue4"
              className="player moveblue4 bg-blue"
            ></button>
          </div>
        </div>
      </div>
      <div className="yellow-home yellow-home-bg bg-yellow super-center">
        <div className="white-box super-center">
          <div className="player-room">
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
        </div>
      </div>
      <div className="winner-home">
        <div className="rwh stack"></div>
        <div className="gwh stack"></div>
        <div className="bwh stack"></div>
        <div className="ywh stack"></div>
      </div>
      <div className="step"></div>
      <div className="step bg-blue"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step bg-blue"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step bg-blue"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step bg-blue"></div>
      <div className="step"></div>
      <div className="step bg-blue"></div>
      <div className="step bg-blue"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>
    </div>
  );
};

export default GameBoard;
