export const getTotalCompletedPercentage = (workSessions: WorkSessionApiResponse[]) => {
    
    // This value is in multiple of 100. i.e. 61 means 61percentage of completed task.
    const completedSessions = workSessions.reduce((prev: number, acc: WorkSessionApiResponse) => {

        if (acc.sessionType !== "WORK_SESSION") return prev;

        return prev + acc.completedPercentage
        
    }, 0)


    
    //Total completed session is got by diving the completed session by 100
    return Number((completedSessions / 100).toPrecision(2));
    
}
