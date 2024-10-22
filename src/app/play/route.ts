import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { roomCode, gameState } = req.body;

    try {
      const updatedRoom = await prisma.room.update({
        where: { roomCode },
        data: {
          gameState,
        },
      });

      res.status(200).json(updatedRoom);
    } catch (error) {
      res.status(500).json({ error: `Failed to update game state ${error}` });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
