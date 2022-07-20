import Prisma from "lib/server/initPrisma";
import {
    NextApiRequest, NextApiResponse
} from "next";
import { getSession } from "next-auth/react";
import { calculatePercentageSessionCompleted } from "utils/calculatePercentageSessionCompleted";
import { dateDifference } from "utils/getDateDifference";

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
    if (req.method === "PUT") {

        const { entityId, timeEnd, sessionId } = req.body;

        const stoppedEntity = await Prisma.sessionEntity.update({
            where: {
                id: entityId as string
            },
            data: {
                timeEnd: timeEnd as Date
            }
        })


        const currentSession = await Prisma.workSession.findUnique({
            where: {
                id: sessionId
            }
        })

        // Update the completed percentage
        await Prisma.workSession.update({
            where: {
                id: sessionId
            },
            data: {
                completedPercentage: {
                    increment: calculatePercentageSessionCompleted(stoppedEntity.timeStart, new Date(timeEnd), currentSession?.sessionLength || 0 )
                }
            }
        })

        res.send({...stoppedEntity})
    }
}
