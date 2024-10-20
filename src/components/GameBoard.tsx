"use client";
import React, { useEffect } from "react";
import { useGameContext } from "./GameContext";

const GameBoard: React.FC = () => {
  const { players, diceValue, currentTurn } = useGameContext();

  const greenPositions = [4, 5, 7, 10, 13, 16];
  const redPositions = [19, 31, 32, 33, 34, 35];
  const yellowPositions = [36, 37, 38, 39, 40, 52];
  const bluePositions = [55, 58, 61, 64, 66, 67];

  const getColorClass = (index: number) => {
    if (greenPositions.includes(index)) return "bg-green";
    if (redPositions.includes(index)) return "bg-red";
    if (yellowPositions.includes(index)) return "bg-yellow";
    if (bluePositions.includes(index)) return "bg-blue";
    return "";
  };

  useEffect(() => {
    if (diceValue === 0) return;
  }, [diceValue]);

  const renderPieces = (color: string, step: number) => {
    const path = players[color].path;
    return players[color].pieces.map((piece, index) => {
      if (typeof piece.position === "number" && piece.position !== -1) {
        const pieceStep = path[piece.position];
        if (pieceStep === step) {
          return (
            <button
              key={`${color}-${index}`}
              id={`movered${index + 1}`}
              className={`player movered${index + 1} bg-${color}`}
            ></button>
          );
        }
      }
    });
  };

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
      {Array.from({ length: 72 }).map((_, index) => (
        <div key={index} className={`step ${getColorClass(index)}`}>
          {renderPieces("red", index)}
          {renderPieces("green", index)}
          {renderPieces("blue", index)}
          {renderPieces("yellow", index)}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
