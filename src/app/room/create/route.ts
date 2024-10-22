import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle POST requests
export const POST = async (req: NextRequest) => {
  const { roomCode } = await req.json();

  try {
    const newRoom = await prisma.room.create({
      data: {
        roomCode,
      },
    });

    return NextResponse.json(newRoom, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create room: ${error}` },
      { status: 500 }
    );
  }
};
