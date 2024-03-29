import Prisma from "lib/server/initPrisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";


interface Data {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const token = await getSession({ req })
    if (!token) {
        res.status(401).send({ message: "Unauthorized" })
        return;
    }
    if (req.method === "GET") {

        const completedTaskList = await Prisma.task.findMany({
            where: {
                taskStatus: "COMPLETED",
                userId: token.user.id
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                workSession: true
            }
        })

        const onGoingTaskList = await Prisma.task.findMany({
            where: {
                taskStatus: "ONGOING",
                userId: token.user.id
            },
             orderBy: {
                createdAt: "desc"
            },
            include: {
                workSession: true
            }
        })
        
        res.send({ completedTaskList, onGoingTaskList })

    }
}
