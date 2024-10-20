"use client";
import React, { useEffect } from "react";
import { useGameContext } from "./GameContext";

const GameBoard: React.FC = () => {
  const { players, diceValue, currentTurn } = useGameContext();

  useEffect(() => {
    if (diceValue === 0) return;
  }, [diceValue, currentTurn]);

  return (
    <div className="ludo-board">
      <div className="red-home red-home-bg bg-red super-center">
        <div className="white-box super-center">
          <div className="player-room">
            {players.red.pieces.map((piece, index) => (
              <div key={index}>
                {piece.status === "home" && (
                  <button
                    id={`movered${index + 1}`}
                    className={`player movered${index + 1} bg-red`}
                  ></button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="step"></div>
      <div className="step"></div>
      <div className="step"></div>

      <div className="green-home green-home-bg bg-green super-center">
        <div className="white-box super-center">
          <div className="player-room">
            {players.green.pieces.map((piece, index) => (
              <div key={index}>
                {piece.status === "home" && (
                  <button
                    id={`movegreen${index + 1}`}
                    className={`player movegreen${index + 1} bg-green`}
                  ></button>
                )}
              </div>
            ))}
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
        <div className="rwh stack">
          {players.red.pieces.map((piece, index) => (
            <button
              key={index}
              style={{ display: piece.status !== "win" ? "none" : "block" }}
              className={`player movered${index + 1} bg-red`}
            ></button>
          ))}
        </div>
        <div className="gwh stack">
          {players.green.pieces.map((piece, index) => (
            <button
              key={index}
              style={{ display: piece.status !== "win" ? "none" : "block" }}
              className={`player movegreen${index + 1} bg-green`}
            ></button>
          ))}
        </div>
        <div className="bwh stack">
          {players.blue.pieces.map((piece, index) => (
            <button
              key={index}
              style={{ display: piece.status !== "win" ? "none" : "block" }}
              className={`player moveblue${index + 1} bg-blue`}
            ></button>
          ))}
        </div>
        <div className="ywh stack">
          {players.yellow.pieces.map((piece, index) => (
            <button
              key={index}
              style={{ display: piece.status !== "win" ? "none" : "block" }}
              className={`player moveyellow${index + 1} bg-yellow`}
            ></button>
          ))}
        </div>
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
            {players.blue.pieces.map((piece, index) => (
              <div key={index}>
                {piece.status === "home" && (
                  <button
                    id={`moveblue${index + 1}`}
                    className={`player moveblue${index + 1} bg-blue`}
                  ></button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="yellow-home yellow-home-bg bg-yellow super-center">
        <div className="white-box super-center">
          <div className="player-room">
            {players.yellow.pieces.map((piece, index) => (
              <div key={index}>
                {piece.status === "home" && (
                  <button
                    id={`moveyellow${index + 1}`}
                    className={`player moveyellow${index + 1} bg-yellow`}
                  ></button>
                )}
              </div>
            ))}
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
