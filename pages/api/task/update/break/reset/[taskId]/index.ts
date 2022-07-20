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

        
        const currentUser = await Prisma.userDetails.findUnique({
            where: {
                id: token.user.id
            }
        })
        
        const { taskId } = req.query


        if (!taskId) {
            res.status(400).send({
                message: "Invalid taskId"
            })
            return;
        }

        const updatedTask = await Prisma.task.update({
            where: {
                id: (taskId || "") as string
            },
            data: {
                longBreakAfter: currentUser?.longBreakAfter || 4
            }
        })

        if (updatedTask) {
            res.send({...updatedTask})
            res.end()
            return;
        }

        res.status(400).send({ message: "Wrong id provided" });
        res.end()
    }

}
