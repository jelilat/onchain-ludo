"use client";
import React, { useState } from "react";
import { useGameContext, Piece, Player } from "./GameContext";

// import Image from "next/image";

const PlayerControls: React.FC = () => {
  const { players, currentTurn, diceValue, setCurrentTurn, setDiceValue } =
    useGameContext();
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const turns = ["RED", "GREEN", "YELLOW", "BLUE"];

  const diceValueGenerator = () => {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(diceValue);
    console.log(diceValue);
    const currentPlayer = players[currentTurn.toLowerCase()];
    const activePieces = currentPlayer.pieces.filter(
      (piece) => piece.status === "active"
    );
    const homePieces = currentPlayer.pieces.filter(
      (piece) => piece.status === "home"
    );
    if (activePieces.length === 0 && diceValue != 6) {
      setCurrentTurn(turns[(turns.indexOf(currentTurn) + 1) % turns.length]);
      setDiceValue(0);
      return;
    }
    if (activePieces.length === 1 && diceValue != 6) {
      movePlayer(diceValue, activePieces[0], currentPlayer);
    }
  };

  const movePlayer = (
    diceValue: number,
    piece: Piece,
    currentPlayer: Player
  ) => {
    if (piece.status === "active") {
      piece.position = (piece.position as number) + diceValue;
      if ((piece.position as number) >= currentPlayer.path.length) {
        piece.status = "win";
      }
      setCurrentTurn(turns[(turns.indexOf(currentTurn) + 1) % turns.length]);
    } else if (piece.status === "home") {
      if (diceValue === 6) {
        piece.status = "active";
        piece.position = (piece.position as number) + diceValue;
      } else {
        alert("You need a 6 to move from home");
        return;
      }
    }

    setSelectedPiece(null);
    setDiceValue(0);
  };

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
          Turn: <span className="current_turn">{currentTurn}</span>
          <span id="dice_value"></span>
        </div>
      </div>
      <button
        id="dice"
        className="d0"
        disabled={diceValue > 0}
        onClick={diceValueGenerator}
      ></button>
      {currentTurn === "RED" && (
        <div className="red_control control">
          {players.red.pieces.map((piece, index) => {
            return (
              <button
                key={index}
                id={`movered${index + 1}`}
                className={`player movered${index + 1} ${
                  piece.status === "win" ? "bg-gray-400 opacity-50" : "bg-red"
                }`}
                onClick={() => {
                  movePlayer(diceValue, piece, players.red);
                }}
              ></button>
            );
          })}
        </div>
      )}
      {currentTurn === "GREEN" && (
        <div className="green_control control">
          {players.green.pieces.map((piece, index) => {
            return (
              <button
                key={index}
                id={`movegreen${index + 1}`}
                className={`player movegreen${index + 1} ${
                  piece.status === "win" ? "bg-gray-400 opacity-50" : "bg-green"
                }`}
                onClick={() => {
                  movePlayer(diceValue, piece, players.green);
                }}
              ></button>
            );
          })}
        </div>
      )}
      {currentTurn === "YELLOW" && (
        <div className="yellow_control control">
          {players.yellow.pieces.map((piece, index) => {
            return (
              <button
                key={index}
                id={`moveyellow${index + 1}`}
                className={`player moveyellow${index + 1} ${
                  piece.status === "win"
                    ? "bg-gray-400 opacity-50"
                    : "bg-yellow"
                }`}
                onClick={() => {
                  movePlayer(diceValue, piece, players.yellow);
                }}
              ></button>
            );
          })}
        </div>
      )}
      {currentTurn === "BLUE" && (
        <div className="blue_control control">
          {players.blue.pieces.map((piece, index) => {
            return (
              <button
                key={index}
                id={`moveblue${index + 1}`}
                className={`player moveblue${index + 1} ${
                  piece.status === "win" ? "bg-gray-400 opacity-50" : "bg-blue"
                }`}
                onClick={() => {
                  movePlayer(diceValue, piece, players.blue);
                }}
              ></button>
            );
          })}
        </div>
      )}

      <h1 className="red_control rc_name"></h1>
      <h1 className="green_control gc_name"></h1>
      <h1 className="yellow_control yc_name"></h1>
      <h1 className="blue_control bc_name"></h1>
    </div>
  );
};

export default PlayerControls;
