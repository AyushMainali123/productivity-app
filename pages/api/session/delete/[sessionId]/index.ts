import Prisma from "lib/server/initPrisma";
import { NextApiRequest, NextApiResponse } from "next";
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
    if (req.method === "DELETE") {

        // Find user with the current email.
        const { sessionId }= req.query;

        // If the user is not found, send 400 error
        if (!sessionId) {
            res.status(400).send({ message: "Invalid request. Please send valid sessionId" })
            return;
        }


        const deletedSession = await Prisma.workSession.delete({
            where: {
                id: (sessionId || "") as string
            }
        })

        
        res.send({...deletedSession, deleted: true})
    }
}
