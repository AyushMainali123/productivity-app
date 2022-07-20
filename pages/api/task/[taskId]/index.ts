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
    if (req.method === "GET") {

        const { taskId } = req.query;

        const currentTask = await Prisma.task.findUnique({
            where: {
                id: (taskId || "") as string
            },
            include: {
                workSession: true
            }
        })


        if (!currentTask) {
            res.status(400).send({ message: "Couldnot find task" })
            return;
        }

        
        res.send({ ...currentTask })

    }
}
