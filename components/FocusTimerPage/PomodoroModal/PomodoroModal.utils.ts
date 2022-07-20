import { SessionEntity, Task, WorkSession } from "@prisma/client";
import axios, { AxiosResponse } from "axios";

interface CreateWorkSessionRequestProps {
    taskId: string,
    sessionType: SessionType,
    isSessionStarted?: boolean
}

interface CreateSessionEntityProps {
    sessionId: string;
    timeStart: Date;
}

interface StopSessionEntityProps {
    entityId: string
    sessionId: string
    timeEnd: Date
}

interface EndSessionRequestProps {
    sessionId: string;
    isSessionCompleted: boolean;
}

export const createWorkSessionMutationFn = async (params: CreateWorkSessionRequestProps)=> {
    return await axios.post<WorkSession>("/api/session/create", params)
}

export const deleteWorkSessionMutationFn = async ({sessionId}:{sessionId: string}) => {
    return await axios.delete<WorkSession>(`/api/session/delete/${sessionId}`)
}

export const endWorkSessionMutationFn = async ({sessionId, isSessionCompleted}:EndSessionRequestProps) => {
    return await axios.put<WorkSession>(`/api/session/end/${sessionId}`, {isSessionCompleted})
}

export const createSessionEntityMutationFn = async (params: CreateSessionEntityProps)=> { 
    return await axios.post<SessionEntity>("/api/session/entity/create", params)
}

export const stopSessionEntityMutationFn = async (params: StopSessionEntityProps) => {
    return await axios.put<SessionEntity>('/api/session/entity/stop', params)
}

export const resetTaskLongBreak = async ({taskId}: { taskId: string }) => {
    return await axios.put<Task>(`/api/task/update/break/reset/${taskId}`)
}