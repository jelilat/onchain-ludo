import React from "react";
import WelcomeScreen from "../components/WelcomeScreen";
import GameBoard from "../components/GameBoard";
import PlayerControls from "../components/PlayerControls";
import { GameProvider } from "../components/GameContext";

import "../styles/globals.css";
import "../styles/main.css";
import "../styles/dice.css";

const Home: React.FC = () => {
  return (
    <div>
      <GameProvider>
        <WelcomeScreen />
        <div className="flex flex-col sm:flex-row justify-center items-center h-screen w-screen p-3 sm:p-0">
          <div className="m-3 w-full sm:w-auto">
            <GameBoard />
          </div>
          <div className="m-3 w-full sm:w-auto">
            <PlayerControls />
          </div>
        </div>
      </GameProvider>
    </div>
  );
};

export default Home;
