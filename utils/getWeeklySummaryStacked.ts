import { WorkSession } from "@prisma/client"; 
        

export const getWeeklySummary = (sessions: WorkSession[]) => {


    const objectToReturn = sessions.reduce((prev, acc) => {

            const day = (new Date(acc.createdAt).getDay()).toString() as "0" | "1" | "2" | "3" | "4" | "5" | "6";
            const getTime = (acc.completedPercentage / 100) * (acc.sessionLength)

            return ({...prev, [day]: prev[day] + getTime})

    }, [])    
    
    return objectToReturn;
}