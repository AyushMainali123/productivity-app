import Prisma from "lib/server/initPrisma";
import {
    NextApiRequest, NextApiResponse
} from "next";
import { getSession } from "next-auth/react";

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const token = await getSession({ req })
    if (!token) {
        res.status(401).send({ message: "Unauthorized" })
        return;
    }
    if (req.method === "POST") {

        const { sessionId, timeStart }: {sessionId: string, timeStart: Date} = req.body;
        
        if (!sessionId || !timeStart) {
            res.status(400).send({message: "Invalid key value provided"})
            return;
        }

        const entity = await Prisma.sessionEntity.create({
            data: {
                timeStart,
                sessionId
            }
        })

        res.send({...entity})
    }
}
