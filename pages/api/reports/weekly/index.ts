import { WorkSession } from "@prisma/client";
import { sub } from "date-fns";
import Prisma from "lib/server/initPrisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";


interface Data {

}

const queryWorkSessions = (day: Date, userId: string, sessionType: SessionType) => {
    return Prisma.workSession.findMany({
             where: {
                createdAt: {
                     gte: new Date(day.getFullYear(), day.getMonth(), day.getDate()),
                    lt: new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
                },
                task: {
                    userId: userId  
                },
                isSessionOngoing: false,
                sessionType: sessionType
            },
       
        select: {
            id: true,
            completedPercentage: true,
            sessionLength: true,
            sessionType: true,
            createdAt: true,
            updatedAt: true,
            task: {
                select: {
                    id: true,
                    taskName: true
                    }
                }         
            }

        })
}

const getDayBefore = (num: number) => sub(new Date(), {days: num})

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

        // For all worksessions
        const thisWeeksStackedWorkSessionsData = await Promise.all([
            queryWorkSessions(getDayBefore(6), token.user.id, "WORK_SESSION"),
            queryWorkSessions(getDayBefore(5), token.user.id, "WORK_SESSION"),
            queryWorkSessions(getDayBefore(4), token.user.id, "WORK_SESSION"),
            queryWorkSessions(getDayBefore(3), token.user.id, "WORK_SESSION"),
            queryWorkSessions(getDayBefore(2), token.user.id, "WORK_SESSION"),
            queryWorkSessions(getDayBefore(1), token.user.id, "WORK_SESSION"),
            queryWorkSessions(getDayBefore(0), token.user.id, "WORK_SESSION"),
        ])

        // For all short break
        const thisWeeksStackedShortBreakSessionsData = await Promise.all([
            queryWorkSessions(getDayBefore(6), token.user.id, "SHORT_BREAK"),
            queryWorkSessions(getDayBefore(5), token.user.id, "SHORT_BREAK"),
            queryWorkSessions(getDayBefore(4), token.user.id, "SHORT_BREAK"),
            queryWorkSessions(getDayBefore(3), token.user.id, "SHORT_BREAK"),
            queryWorkSessions(getDayBefore(2), token.user.id, "SHORT_BREAK"),
            queryWorkSessions(getDayBefore(1), token.user.id, "SHORT_BREAK"),
            queryWorkSessions(getDayBefore(0), token.user.id, "SHORT_BREAK"),
        ])

        // For all long break
        const thisWeeksStackedLongBreakSessionsData = await Promise.all([
            queryWorkSessions(getDayBefore(6), token.user.id, "LONG_BREAK"),
            queryWorkSessions(getDayBefore(5), token.user.id, "LONG_BREAK"),
            queryWorkSessions(getDayBefore(4), token.user.id, "LONG_BREAK"),
            queryWorkSessions(getDayBefore(3), token.user.id, "LONG_BREAK"),
            queryWorkSessions(getDayBefore(2), token.user.id, "LONG_BREAK"),
            queryWorkSessions(getDayBefore(1), token.user.id, "LONG_BREAK"),
            queryWorkSessions(getDayBefore(0), token.user.id, "LONG_BREAK"),
        ])


        /**
         * * Extract unique taskId from each sessionsArray.
         */
        const getDataForBarchart = (workSession2DsArray: WorkSession[][]) => {
            const uniqueKeyMap = new Map<string, number>()
        }


        res.send({
            thisWeeksStackedWorkSessionsData,
            thisWeeksStackedShortBreakSessionsData,
            thisWeeksStackedLongBreakSessionsData
        })

    }
}
