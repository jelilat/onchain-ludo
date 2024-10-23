"use client";
import React, { useRef, useState, useEffect } from "react";
import { useGameContext, Piece, Player } from "./GameContext";

const PlayerControls: React.FC = () => {
  const {
    roomCode,
    players,
    currentTurn,
    diceValue,
    color,
    socket,
    setCurrentTurn,
    setDiceValue,
    setPlayers,
  } = useGameContext();
  const [winners, setWinners] = useState<string[]>([]);
  const turns = ["RED", "GREEN", "YELLOW", "BLUE"];
  const sixes = useRef(0);

  useEffect(() => {
    if (socket) {
      socket.on("diceRolled", (data: { value: number; turn: string }) => {
        setDiceValue(data.value);
        setCurrentTurn(data.turn);
      });

      socket.on(
        "gameStateUpdated",
        (data: {
          players: Record<string, Player>;
          turn: string;
          winners: string[];
        }) => {
          console.log("gameStateUpdated", data);
          setDiceValue(0);
          setPlayers(data.players);
          setCurrentTurn(data.turn);
          setWinners(data.winners);
        }
      );
      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

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

    socket!.emit("rollDice", {
      roomCode,
      value: localDiceValue,
      turn: currentTurn,
    });

    setTimeout(() => {
      if (localDiceValue === 6) {
        sixes.current += 1;
      }

      if (
        (activePieces.length === 0 && localDiceValue != 6) ||
        sixes.current === 3
      ) {
        sixes.current = 0;
        const nextTurn = getNextTurn(currentTurn, winners, turns);
        setCurrentTurn(nextTurn);
        socket!.emit("updateGameState", {
          roomCode,
          players,
          turn: nextTurn,
          winners,
        });
      } else if (activePieces.length === 1 && localDiceValue != 6) {
        movePlayer(localDiceValue, activePieces[0], currentPlayer);
      }
    }, 500);
  };

  const handleCollision = (
    path: (number | string)[],
    value: number,
    position: number
  ) => {
    const updatedPlayers = { ...players };
    Object.keys(updatedPlayers).forEach((color) => {
      if (color !== currentTurn.toLowerCase()) {
        updatedPlayers[color].pieces.forEach((otherPiece) => {
          const otherPiecePath = updatedPlayers[color].path;
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
    }
    const nextTurn = getNextTurn(currentTurn, winners, turns);

    socket!.emit("updateGameState", {
      roomCode,
      players: updatedPlayers,
      turn: value === 6 ? currentTurn : nextTurn,
      winners,
    });
  };

  const movePlayer = (
    localDiceValue: number,
    piece: Piece,
    currentPlayer: Player
  ) => {
    const updatedPlayers = { ...players };
    const updatedWinners = [...winners];

    if (piece.status === "active") {
      const newPosition = (piece.position as number) + localDiceValue;
      if (newPosition === currentPlayer.path.length - 1) {
        piece.status = "win";
        piece.position = newPosition;
        // check if all the piece status are wins
        const allWin = updatedPlayers[currentTurn.toLowerCase()].pieces.every(
          (piece) => piece.status === "win"
        );
        if (allWin) {
          updatedWinners.push(currentTurn);
        }

        socket!.emit("updateGameState", {
          roomCode,
          players: updatedPlayers,
          turn: currentTurn,
          winners: updatedWinners,
        });
      } else if (newPosition < currentPlayer.path.length) {
        piece.position = newPosition;
        handleCollision(currentPlayer.path, localDiceValue, newPosition);
      } else {
        alert(
          `You need a ${
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
        className={`d${diceValue} ${
          diceValue > 0 || color !== currentTurn.toLowerCase()
            ? "opacity-50"
            : ""
        }`}
        disabled={diceValue > 0 || color !== currentTurn.toLowerCase()}
        onClick={diceValueGenerator}
      ></button>
      {currentTurn === "RED" && (
        <div>
          <div className="red_control control">
            {players.red.pieces.map((piece, index) => {
              return (
                <button
                  key={index}
                  id={`movered${index + 1}`}
                  className={`player movered${index + 1} ${
                    piece.status === "win" ? "bg-gray-400 opacity-50" : "bg-red"
                  }`}
                  disabled={color !== currentTurn.toLowerCase()}
                  onClick={() => {
                    movePlayer(diceValue, piece, players.red);
                  }}
                ></button>
              );
            })}
          </div>
          <h1 className="text-center text-3xl my-3">{players.red.name}</h1>
        </div>
      )}
      {currentTurn === "GREEN" && (
        <div>
          <div className="green_control control">
            {players.green.pieces.map((piece, index) => {
              return (
                <button
                  key={index}
                  id={`movegreen${index + 1}`}
                  className={`player movegreen${index + 1} ${
                    piece.status === "win"
                      ? "bg-gray-400 opacity-50"
                      : "bg-green"
                  }`}
                  disabled={color !== currentTurn.toLowerCase()}
                  onClick={() => {
                    movePlayer(diceValue, piece, players.green);
                  }}
                ></button>
              );
            })}
          </div>
          <h1 className="text-center text-3xl my-3">{players.green.name}</h1>
        </div>
      )}
      {currentTurn === "YELLOW" && (
        <div>
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
                  disabled={color !== currentTurn.toLowerCase()}
                  onClick={() => {
                    movePlayer(diceValue, piece, players.yellow);
                  }}
                ></button>
              );
            })}
          </div>
          <h1 className="text-center text-3xl my-3">{players.yellow.name}</h1>
        </div>
      )}
      {currentTurn === "BLUE" && (
        <div>
          <div className="blue_control control">
            {players.blue.pieces.map((piece, index) => {
              return (
                <button
                  key={index}
                  id={`moveblue${index + 1}`}
                  className={`player moveblue${index + 1} ${
                    piece.status === "win"
                      ? "bg-gray-400 opacity-50"
                      : "bg-blue"
                  }`}
                  disabled={color !== currentTurn.toLowerCase()}
                  onClick={() => {
                    movePlayer(diceValue, piece, players.blue);
                  }}
                ></button>
              );
            })}
          </div>
          <h1 className="text-center text-3xl my-3">{players.blue.name}</h1>
        </div>
      )}
    </div>
  );
};

export default PlayerControls;
