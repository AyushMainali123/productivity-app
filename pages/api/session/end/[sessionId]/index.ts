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
    if (req.method === "PUT") {

        // Find user with the current email.
        const { sessionId } = req.query;

        const { isSessionCompleted, taskId }: {isSessionCompleted: boolean, taskId: string} = req.body;
        // If the user is not found, send 400 error
        if (!sessionId) {
            res.status(400).send({ message: "Invalid request. Please send valid sessionId" })
            return;
        }

        

        const currentSession = await Prisma.workSession.findUnique({
            where: {
                id: (sessionId || "") as string
             }
        })

        const endedSession = await Prisma.workSession.update({
            where: {
                id: (sessionId || "") as string
            },
            data: {
                isSessionOngoing: false,
                isSessionCompleted: (currentSession?.completedPercentage || 0) > 98 && (isSessionCompleted === true),

                // Issue in this line
                completedPercentage: (currentSession?.completedPercentage || 0) > 98 ? 100 : currentSession?.completedPercentage
            }
        })


        // If the session is ended by force, set longBreakAfter of the current task to user default.
        if (!isSessionCompleted) {

            // Getting current user details
            const currentUser = await Prisma.userDetails.findUnique({
                where: {
                    userId: token.user.id
                }
            })

            // Updating longBreakAfter to user default
            await Prisma.task.update({
                where: {
                    id: taskId
                },
                data: {
                    longBreakAfter: currentUser?.longBreakAfter
                }
            })
        }
        
        res.send({...endedSession})
    }
}
