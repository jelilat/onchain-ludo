"use client";
import React, { useRef, useState } from "react";
import { useGameContext, Piece, Player } from "./GameContext";

// import Image from "next/image";

const PlayerControls: React.FC = () => {
  const { players, currentTurn, diceValue, setCurrentTurn, setDiceValue } =
    useGameContext();
  const [winners, setWinners] = useState<string[]>([]);
  const turns = ["RED", "GREEN", "YELLOW", "BLUE"];
  const sixes = useRef(0);

  const getNextTurn = (
    currentTurn: string,
    winners: string[],
    turns: string[]
  ) => {
    let nextIndex = (turns.indexOf(currentTurn) + 1) % turns.length;
    while (winners.includes(turns[nextIndex])) {
      nextIndex = (nextIndex + 1) % turns.length;
    }
    return turns[nextIndex];
  };

  const diceValueGenerator = () => {
    const localDiceValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(localDiceValue);
    const currentPlayer = players[currentTurn.toLowerCase()];
    const activePieces = currentPlayer.pieces.filter(
      (piece) => piece.status === "active"
    );

    setTimeout(() => {
      if (localDiceValue === 6) {
        sixes.current += 1;
      }

      if (
        (activePieces.length === 0 && localDiceValue != 6) ||
        sixes.current === 3
      ) {
        sixes.current = 0;
        setCurrentTurn(getNextTurn(currentTurn, winners, turns));
        setDiceValue(0);
        return;
      }
      if (activePieces.length === 1 && localDiceValue != 6) {
        movePlayer(localDiceValue, activePieces[0], currentPlayer);
      }
    }, 500);
  };

  const handleCollision = (
    path: (number | string)[],
    value: number,
    position: number
  ) => {
    Object.keys(players).forEach((color) => {
      if (color !== currentTurn.toLowerCase()) {
        players[color].pieces.forEach((otherPiece) => {
          const otherPiecePath = players[color].path;
          if (
            path[position] === otherPiecePath[otherPiece.position as number] &&
            otherPiece.status === "active" &&
            otherPiece.position !== 0
          ) {
            // Send the other piece back home
            otherPiece.status = "home";
            otherPiece.position = -1;

            return;
          }
        });
      }
    });

    if (value != 6) {
      sixes.current = 0;
      setCurrentTurn(getNextTurn(currentTurn, winners, turns));
    }
  };

  const movePlayer = (
    localDiceValue: number,
    piece: Piece,
    currentPlayer: Player
  ) => {
    if (piece.status === "active") {
      const newPosition = (piece.position as number) + localDiceValue;
      if (newPosition === currentPlayer.path.length) {
        piece.status = "win";
        // check if all the piece status are wins
        const allWin = players[currentTurn.toLowerCase()].pieces.every(
          (piece) => piece.status === "win"
        );
        if (allWin) {
          setWinners((prevWinners) => [...prevWinners, currentTurn]);
        }
      } else if (newPosition < currentPlayer.path.length) {
        piece.position = newPosition;
        handleCollision(currentPlayer.path, localDiceValue, newPosition);
      } else {
        alert(
          `You need an ${
            currentPlayer.path.length - (piece.position as number)
          } to win.`
        );
        return;
      }
    } else if (piece.status === "home") {
      if (localDiceValue === 6) {
        piece.status = "active";
        piece.position = 0;
        handleCollision(currentPlayer.path, localDiceValue, 0);
      } else {
        alert("You need a 6 to move from home");
        return;
      }
    }

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
        className={`d${diceValue} ${diceValue > 0 ? "opacity-50" : ""}`}
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
