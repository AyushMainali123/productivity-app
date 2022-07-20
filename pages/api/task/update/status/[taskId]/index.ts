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
        const { taskId } = req.query

        const newTaskStatus = req?.body?.taskStatus || ""

        if (newTaskStatus !== "ONGOING" && newTaskStatus !== "COMPLETED") {
            res.status(400).send({
                message: "Invalid status"
            })
            return;
        }

        const updatedTask = await Prisma.task.update({
            where: {
                id: (taskId || "") as string
            },
            data: {
                taskStatus: newTaskStatus as ("ONGOING" | "COMPLETED")
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
