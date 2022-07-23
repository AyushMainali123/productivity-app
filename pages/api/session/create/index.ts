import Prisma from "lib/server/initPrisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { returnRequiredSessionLength } from "utils/returnRequiredSessionLength";

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

        const {
            taskId,
            sessionType,
            isSessionStarted
        }: { taskId: string, sessionType: SessionType, isSessionStarted?: boolean, sessionLength: number } = req.body;



        // If the user is not found, send 404 error
        if (!taskId) {
            res.status(400).send({ message: "Invalid request. Please send valid taskId" })
            return;
        }


        const currentUser = await Prisma.userDetails.findUnique({
            where: {
                userId: token.user.id
            }
        })


        if (!currentUser) {
            res.status(401).send({ message: "Unauthorized" });
            return;
        }

        const newSession = await Prisma.workSession.create({
            data: {
                taskId,
                sessionType,
                sessionLength: returnRequiredSessionLength(sessionType, currentUser),
                isSessionStarted: isSessionStarted || false
            }
        })


        // Send the current session if session type is "SHORT_BREAK"
        if (sessionType === "SHORT_BREAK") {
            res.send({ ...newSession })
            return;
        }


        // Update long break after to user default if the current sessiontype is "LONG_BREAK"
        if (sessionType === "LONG_BREAK") {

            await Prisma.task.update({
                where: {
                    id: taskId
                },
                data: {
                    longBreakAfter: {
                        set: currentUser.longBreakAfter
                    }
                }
            })
            
            res.send({ ...newSession })
            return;
        }

        // Decrement current longBreakAfter by 1 if sessionType is "WORK_SESSION" 
        await Prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                longBreakAfter: {
                    decrement: 1
                }
            }
        })

        res.send({ ...newSession })
        return;
        
    }
}
