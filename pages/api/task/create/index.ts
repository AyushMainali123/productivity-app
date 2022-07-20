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
    if (req.method === "POST") {

        // Find user with the current email.
        const currentLoggedInUser = await Prisma.user.findUnique({
            where: {
                id: token.user?.id || ""
            },
            select: {
                id: true,
                userDetails: true
            }
        })


        // If the user is not found, send 404 error
        if (!currentLoggedInUser) {
            res.status(404).send({ message: "User not found" })
            return;
        }


        // If the taskname is not provided return 400 error
        const taskName = req?.body?.taskName 

        if (!taskName) {
            res.status(400).send({ message: "Please send valid task name" })
            return;
        }

        const newTask = await Prisma.task.create({
            data: {
                taskName,
                userId: currentLoggedInUser.id,
                longBreakAfter: currentLoggedInUser.userDetails?.longBreakAfter || 4
            }
        })

        
        res.send({...newTask})
    }
}
