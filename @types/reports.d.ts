interface WeeklySessionReports {
        "0": number
        "1": number
        "2": number
        "3": number
        "4": number
        "5": number
        "6": number
}

interface WeeklyReportsApiResponse {
    totalWorkSessionsInMinutes: number,
    totalShortBreakSessionsInMinutes: number,
    totalLongBreakSessionsInMinutes: number,
    workSessionsReports: WeeklySessionReports;
    shortBreakSessionsReports: WeeklySessionReports;
    longBreakSessionsReports: WeeklySessionReports;
}