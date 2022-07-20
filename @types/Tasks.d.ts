


interface TaskListSingleTask {
    createdAt: Date
    updatedAt: Date
    id: string
    taskName: string
    userId: string
    taskStatus: TaskStatus
    breakAfter: number
    workSession: WorkSessionApiResponse[]
}

interface TaskListApiResponse {
    completedTaskList: TaskListSingleTask[],
    onGoingTaskList: TaskListSingleTask[]
}