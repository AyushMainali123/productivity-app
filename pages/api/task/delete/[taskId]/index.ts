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
        const { taskId } = req.query

        const deletedTask = await Prisma.task.update({
            where: {
                id: (taskId || "") as string
            },
            data: {
                taskStatus: "DELETED"
            }
        })

        if (deletedTask) {
            res.send({
                deleted: true
            })
            res.end()
            return;
        }

        res.status(400).send({ message: "Wrong id provided" });
        res.end()
    }

}
