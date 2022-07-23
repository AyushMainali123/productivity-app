import { SessionEntity, Task, WorkSession } from "@prisma/client";
import axios from "axios";

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
    taskId?: string;
}

export const createWorkSessionMutationFn = async (params: CreateWorkSessionRequestProps)=> {
    return await axios.post<WorkSession>("/api/session/create", params)
}

export const deleteWorkSessionMutationFn = async ({sessionId}:{sessionId: string}) => {
    return await axios.delete<WorkSession>(`/api/session/delete/${sessionId}`)
}

export const endWorkSessionMutationFn = async ({sessionId, isSessionCompleted, taskId}:EndSessionRequestProps) => {
    return await axios.put<WorkSession>(`/api/session/end/${sessionId}`, {isSessionCompleted, taskId})
}

export const createSessionEntityMutationFn = async (params: CreateSessionEntityProps)=> { 
    return await axios.post<SessionEntity>("/api/session/entity/create", params)
}

export const stopSessionEntityMutationFn = async (params: StopSessionEntityProps) => {
    return await axios.put<SessionEntity>('/api/session/entity/stop', params)
}


export const getNextSession = (currentSession: SessionType, nextLongBreak: number): SessionType => {

    if (nextLongBreak === 0 && currentSession === "WORK_SESSION") {
        return "LONG_BREAK"
    }

    if (currentSession === "WORK_SESSION") {
        return "SHORT_BREAK"
    }
    
    return "WORK_SESSION"
}