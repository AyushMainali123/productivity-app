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

        
        const userId = token.user.id

        const { pomodoroLength, shortBreakLength, longBreakLength } = req?.body;

        if (!pomodoroLength && !shortBreakLength && !longBreakLength) {
            res.status(400).send({message: "Invalid Input provided"})
        }

        // Find user with the current email.
        const currentUserDetails = await Prisma.userDetails.findUnique({
            where: {
                userId: (userId || "") as string
            }
        })


        // If the user is not found, send 404 error
        if (!currentUserDetails) {
            res.status(404).send({ message: "User not found" })
            return;
        }

        const updatedUserDetails = await Prisma.userDetails.update({
            where: {
                userId: userId as string
            },
            data: {
                pomodoroLength: pomodoroLength || currentUserDetails.pomodoroLength,
                shortBreakLength: shortBreakLength || currentUserDetails.shortBreakLength,
                longBreakLength: longBreakLength || currentUserDetails.longBreakLength
            }
        })

        
        res.send({...updatedUserDetails})
    }
}
