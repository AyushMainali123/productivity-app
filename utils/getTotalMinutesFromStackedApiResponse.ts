export const getTotalMinutesFromStackedApiResponse = (data: WeeklyReportsSingleEntityApiResponse[][]) => {
    let totalMinutes = 0;

    data.forEach(singleData => {
        singleData.forEach(response => {
            totalMinutes +=  (response.completedPercentage / 100 ) * response.sessionLength
        })
    })

    return totalMinutes;

}