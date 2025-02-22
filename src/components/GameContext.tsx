"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { SocketType } from "./utils/socket";

export interface Piece {
  position: number | string;
  status: "home" | "active" | "win";
}

export interface Player {
  name: string;
  color: string;
  pieces: Piece[];
  path: (number | string)[];
}

interface GameContextType {
  diceValue: number;
  setDiceValue: (value: number) => void;
  currentTurn: string;
  setCurrentTurn: (turn: string) => void;
  players: Record<string, Player>;
  setPlayers: (players: Record<string, Player>) => void;
  color: string;
  setColor: (color: string) => void;
  roomCode: string;
  setRoomCode: (code: string) => void;
  socket: SocketType;
  setSocket: (socket: SocketType) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [diceValue, setDiceValue] = useState<number>(0);
  const [currentTurn, setCurrentTurn] = useState<string>("RED");
  const [color, setColor] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");
  const [socket, setSocket] = useState<SocketType>(null);
  const [players, setPlayers] = useState<Record<string, Player>>({
    red: {
      name: "",
      color: "red",
      pieces: [
        { position: -1, status: "home" },
        { position: -1, status: "home" },
        { position: -1, status: "home" },
        { position: -1, status: "home" },
      ],
      path: [
        19,
        20,
        21,
        22,
        23,
        15,
        12,
        9,
        6,
        3,
        0,
        1,
        2,
        5,
        8,
        11,
        14,
        17,
        24,
        25,
        26,
        27,
        28,
        29,
        41,
        53,
        52,
        51,
        50,
        49,
        48,
        56,
        59,
        62,
        65,
        68,
        71,
        70,
        69,
        66,
        63,
        60,
        57,
        54,
        47,
        46,
        45,
        44,
        43,
        42,
        30,
        31,
        32,
        33,
        34,
        35,
        "win",
      ],
    },
    green: {
      name: "",
      color: "green",
      pieces: [
        { position: -1, status: "home" },
        { position: -1, status: "home" },
        { position: -1, status: "home" },
        { position: -1, status: "home" },
      ],
      path: [
        5,
        8,
        11,
        14,
        17,
        24,
        25,
        26,
        27,
        28,
        29,
        41,
        53,
        52,
        51,
        50,
        49,
        48,
        56,
        59,
        62,
        65,
        68,
        71,
        70,
        69,
        66,
        63,
        60,
        57,
        54,
        47,
        46,
        45,
        44,
        43,
        42,
        30,
        18,
        19,
        20,
        21,
        22,
        23,
        15,
        12,
        9,
        6,
        3,
        0,
        1,
        4,
        7,
        10,
        13,
        16,
        "win",
      ],
    },
    blue: {
      name: "",
      color: "blue",
      pieces: [
        { position: -1, status: "home" },
        { position: -1, status: "home" },
        { position: -1, status: "home" },
        { position: -1, status: "home" },
      ],
      path: [
        66,
        63,
        60,
        57,
        54,
        47,
        46,
        45,
        44,
        43,
        42,
        30,
        18,
        19,
        20,
        21,
        22,
        23,
        15,
        12,
        9,
        6,
        3,
        0,
        1,
        2,
        5,
        8,
        11,
        14,
        17,
        24,
        25,
        26,
        27,
        28,
        29,
        41,
        53,
        52,
        51,
        50,
        49,
        48,
        56,
        59,
        62,
        65,
        68,
        71,
        70,
        67,
        64,
        61,
        58,
        55,
        "win",
      ],
    },
    yellow: {
      name: "",
      color: "yellow",
      pieces: [
        { position: -1, status: "home" },
        { position: -1, status: "home" },
        { position: -1, status: "home" },
        { position: -1, status: "home" },
      ],
      path: [
        52,
        51,
        50,
        49,
        48,
        56,
        59,
        62,
        65,
        68,
        71,
        70,
        69,
        66,
        63,
        60,
        57,
        54,
        47,
        46,
        45,
        44,
        43,
        42,
        30,
        18,
        19,
        20,
        21,
        22,
        23,
        15,
        12,
        9,
        6,
        3,
        0,
        1,
        2,
        5,
        8,
        11,
        14,
        17,
        24,
        25,
        26,
        27,
        28,
        29,
        41,
        40,
        39,
        38,
        37,
        36,
        "win",
      ],
    },
  });

  return (
    <GameContext.Provider
      value={{
        diceValue,
        setDiceValue,
        currentTurn,
        setCurrentTurn,
        players,
        setPlayers,
        color,
        setColor,
        roomCode,
        setRoomCode,
        socket,
        setSocket,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
