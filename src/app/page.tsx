import React from "react";
import WelcomeScreen from "../components/WelcomeScreen";
import GameBoard from "../components/GameBoard";
import PlayerControls from "../components/PlayerControls";

import "../styles/globals.css";
import "../styles/main.css";
import "../styles/dice.css";

const Home: React.FC = () => {
  return (
    <div>
      <WelcomeScreen />
      <div className="flex justify-center items-center h-screen w-screen ">
        <div className="m-3">
          <GameBoard />
        </div>
        <div className="m-3">
          <PlayerControls />
        </div>
      </div>
    </div>
  );
};

export default Home;
