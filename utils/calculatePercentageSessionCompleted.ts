import { dateDifference } from "./getDateDifference"

export const calculatePercentageSessionCompleted = (timeStart: Date, timeEnd: Date, sessionLength: number) => {
    const timeDifference = dateDifference(timeStart, timeEnd, "min");

    const percentageCompleted = (timeDifference / sessionLength) * 100

    return Number(percentageCompleted.toFixed(2))
}