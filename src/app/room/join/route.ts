import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const turns = ["red", "green", "yellow", "blue"];

// Handle POST requests
export const POST = async (req: NextRequest) => {
  try {
    const { roomCode, playerName } = await req.json();

    // Find the room by roomCode
    const room = await prisma.room.findUnique({
      where: { roomCode },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const players = await prisma.player.findMany({
      where: { roomId: room.id },
    });
    if (players.length === 4) {
      return NextResponse.json({ error: "Room is full" }, { status: 400 });
    }

    const turn = turns[players.length];

    // Add player to the room
    const newPlayer = await prisma.player.create({
      data: {
        name: playerName,
        room: {
          connect: { id: room.id },
        },
        color: turn,
      },
    });

    return NextResponse.json(newPlayer, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to join room: ${error}` },
      { status: 500 }
    );
  }
};

// Handle GET requests
export const GET = async (req: NextRequest) => {
  try {
    // Extract roomId from query parameters
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    if (!roomId) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    const room = await prisma.room.findUnique({
      where: { roomCode: roomId },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Fetch players in the room
    const players = await prisma.player.findMany({
      where: { roomId: room.id },
    });

    return NextResponse.json({ players }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch players: ${error}` },
      { status: 500 }
    );
  }
};
