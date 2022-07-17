
type TaskStatus = "ONGOING" | "COMPLETED" | "DELETED"

interface TaskListSingleTask {
    createdAt: Date
    updatedAt: Date
    id: string
    taskName: string
    userId: string
    taskStatus: TaskStatus
    breakAfter: number
}

interface TaskListApiResponse {
    completedTaskList: TaskListSingleTask[],
    onGoingTaskList: TaskListSingleTask[]
}