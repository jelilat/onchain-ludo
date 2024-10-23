"use client";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useGameContext, Player } from "./GameContext";

const URL =
  process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:3001";

interface RoomData {
  roomCode: string;
  color: string;
  players: Player[];
}

const WelcomeScreen: React.FC = () => {
  const [gameBoard, setGameBoard] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [numOfPlayers, setNumOfPlayers] = useState<number>(0);
  const [joined, setJoined] = useState<boolean>(false);
  const { players, color, setColor, roomCode, setRoomCode, socket, setSocket } =
    useGameContext();

  const colors = ["red", "green", "yellow", "blue"];

  useEffect(() => {
    const newSocket = io(URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("roomCreated", (data: RoomData) => {
      console.log("Room created:", data);
    });

    newSocket.on("playerJoined", ({ newPlayer }: { newPlayer: Player }) => {
      console.log("New player joined:", newPlayer);
      const playerIndex = colors.indexOf(newPlayer.color);
      if (playerIndex !== -1) {
        players[newPlayer.color].name = newPlayer.name;
        setNumOfPlayers(playerIndex + 1);
      }
    });

    newSocket.on(
      "playerLeft",
      ({ removedPlayer }: { removedPlayer: Player }) => {
        console.log("Player left:", removedPlayer);
        players[removedPlayer.color].name = "";
        setNumOfPlayers(numOfPlayers - 1);
      }
    );

    newSocket.on("roomError", (error: string) => {
      console.error("Room error:", error);
      alert(error);
    });

    newSocket.on("connect_error", (error: Error) => {
      console.error("Connection error:", error);
      alert("Failed to connect to the server. Please try again later.");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (numOfPlayers === 4) {
      setGameBoard(true);
    }
  }, [numOfPlayers]);

  const updatePlayerName = (color: string, newName: string) => {
    players[color].name = newName;
  };

  const joinRoom = async (roomCode: string) => {
    const response = await fetch("/room/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomCode, playerName }),
    });

    if (response.ok) {
      console.log(await response.json());
      updatePlayerName(color, playerName);
      setJoined(true);
      if (socket) {
        socket.emit("joinRoom", { roomCode, playerName, color });
      }
    }
  };

  const getRoom = async () => {
    const response = await fetch(`/room/join?roomId=${roomCode}`);
    if (response.ok) {
      const resp = await response.json();
      setColor(colors[resp.players.length]);
    }
  };

  const createRoom = async (roomCode: string) => {
    const response = await fetch("/room/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomCode, playerName }),
    });

    if (response.ok) {
      console.log(await response.json());
      if (socket) {
        socket.emit("createRoom", { roomCode, playerName });
      }
    }
  };

  return (
    <div>
      {!gameBoard && (
        <div className="welcome" style={{ display: "" }}>
          <div className="menu">
            <div className="lobby">
              <h2 className="super-center text-2xl font-semibold">Play Ludo</h2>
              {color ? (
                <div>
                  {!joined ? (
                    <div>
                      <div className="control3">
                        <div className="lb">
                          <button
                            id="move-blue1"
                            className={`player playersel bg-${color}`}
                          ></button>
                          &nbsp;&nbsp;
                          <span id={`${color}_player_name`} className="f">
                            <input
                              type="text"
                              className="cun"
                              value={playerName}
                              onChange={(e) => setPlayerName(e.target.value)}
                            />
                            <button className="bot botoff"></button>
                          </span>
                        </div>
                      </div>
                      <div className="super-center">
                        <button
                          id="start_btn"
                          onClick={() => joinRoom(roomCode)}
                        >
                          Start Game
                        </button>
                        <button
                          id="loading_btn"
                          style={{ display: "none" }}
                          disabled
                        >
                          <div
                            className="spinner-border text-danger"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="super-center">
                      <p>
                        Waiting for {4 - numOfPlayers} more players to join...
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="justify-center text-center">
                  <input
                    type="text"
                    className="cun p-2 mt-3"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    placeholder="Enter Room Code"
                  />
                  <br />
                  <button
                    id="start_btn"
                    disabled={!roomCode}
                    onClick={() => createRoom(roomCode)}
                  >
                    Create Room
                  </button>
                  <br />
                  <button
                    id="start_btn"
                    disabled={!roomCode}
                    onClick={() => getRoom()}
                  >
                    Join Room
                  </button>
                </div>
              )}
            </div>
            <div>
              <span className="font-semibold">KEYBOARD CONTROLS</span> <br />
              <span className="bg-black text-white px-2 py-1 rounded-md">
                Space
              </span>{" "}
              for dice &{" "}
              <span className="bg-black text-white p-1 rounded-md">1</span>{" "}
              <span className="bg-black text-white p-1 rounded-md">2</span>{" "}
              <span className="bg-black text-white p-1 rounded-md">3</span>{" "}
              <span className="bg-black text-white p-1 rounded-md">4</span> for
              players
            </div>
            <hr className="my-4 border-black" />
            <div className="super-center">
              Developed By @tjelailah /&nbsp;
              <a
                href="https://x.com/tjelailah"
                className="text-decoration-none underline"
                target="_blank"
              >
                Follow
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
