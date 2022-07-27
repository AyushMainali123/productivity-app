interface TaskDetails {
    id: string
    taskName: string
}

interface WeeklyReportsSingleEntityApiResponse {
    id: string;
    completedPercentage: number
    sessionLength: number
    sessionType: SessionType
    createdAt: Date
    updatedAt: Date
    task: TaskDetails
}

interface WeeklyDataApiResponse {
    thisWeeksStackedWorkSessionsData: SingleApiResponse[][]
    thisWeeksStackedShortBreakSessionsData: SingleApiResponse[][]
    thisWeeksStackedLongBreakSessionsData: SingleApiResponse[][]
}