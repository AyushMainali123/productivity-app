import { sub } from "date-fns";
import Prisma from "lib/server/initPrisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getWeeklySummary } from "utils/getWeeklySummary";


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

        const thisWeekWorkSessions = await Prisma.workSession.findMany({
             where: {
                createdAt: {
                     gt: sub(new Date(), { days: 6 }),
                },
                task: {
                    userId: token.user.id  
                 },
                sessionType: "WORK_SESSION"
            },
        })

        const thisWeekShortBreakSessions = await Prisma.workSession.findMany({
            where: {
                createdAt: {
                    gt: sub(new Date(), {days: 6})
                },
                task: {
                    userId: token.user.id  
                 },
                sessionType: "SHORT_BREAK"
            }
        })

        const thisWeekLongBreakSessions = await Prisma.workSession.findMany({
            where: {
                createdAt: {
                    gt: sub(new Date(), {days: 6})
                },
                task: {
                    userId: token.user.id  
                 },
                sessionType: "LONG_BREAK"
            }
        })

        const workSessionsReports = getWeeklySummary(thisWeekWorkSessions);
        const shortBreakSessionsReports = getWeeklySummary(thisWeekShortBreakSessions);
        const longBreakSessionsReports = getWeeklySummary(thisWeekLongBreakSessions);

        res.send({
            
            workSessionsReports, 
            shortBreakSessionsReports,
            longBreakSessionsReports,
            totalWorkSessionsInMinutes: Object.values(workSessionsReports).reduce((prev, acc) => prev + acc, 0),
            totalShortBreakSessionsInMinutes: Object.values(shortBreakSessionsReports).reduce((prev, acc) => prev + acc, 0),
            totalLongBreakSessionsInMinutes: Object.values(longBreakSessionsReports).reduce((prev, acc) => prev + acc, 0),
            workSessions: [...thisWeekWorkSessions],
            shortBreakSessions: [...thisWeekShortBreakSessions],
            longBreakSessions: [...thisWeekLongBreakSessions]
        })

    }
}
