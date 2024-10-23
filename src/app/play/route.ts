import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const { roomCode, gameState } = await req.json();

  try {
    const updatedRoom = await prisma.room.update({
      where: { roomCode },
      data: {
        gameState,
      },
    });

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update game state: ${error}` },
      { status: 500 }
    );
  }
};
