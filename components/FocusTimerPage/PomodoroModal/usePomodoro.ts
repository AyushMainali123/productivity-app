import { useInterval } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCountdown, useCounter, useEffectOnce } from 'usehooks-ts'

interface PomodoroInterface {
    breakTime: number;
    sessionTime: number;
    currentSession: "session" | "break"
}

const INITIAL_STATE = {
    breakTime: 5,
    sessionTime: 25,
    currentSession: "session",
    intervalValue: 1000
}


const usePomodoro = ({ breakTime, sessionTime, currentSession }: PomodoroInterface) => {
    
    const { count: minuteCount, setCount: setMinuteCount } = useCounter(sessionTime)
    const { count: secondCount, setCount: setSecondCount } = useCounter(0)
    const [currentPomodoroSession, setCurrentPomodoroSession] = useState(currentSession || INITIAL_STATE.currentSession)
    const [isSessionPlaying, setSessionPlaying] = useState(false)



    /**
     * * Hook for updating minute and second count.
     */
    useInterval(() => {
        if (minuteCount === 0 && secondCount === 0) {
            setCurrentPomodoroSession(prev => prev === "break" ? "session" : "break")
            setSecondCount(0)
            setMinuteCount(breakTime)
            const audio = new Audio("/music/pomodoro-alarm.wav")
            audio.play();
            return;
        }

        if (secondCount === 0) {
            setMinuteCount(prev => prev - 1)
            setSecondCount(59)

            return;
        }

        setSecondCount(prev => prev - 1)

    }, isSessionPlaying ? 1000 : null)




    return {minuteCount, secondCount, setSessionPlaying, currentPomodoroSession}

}

export default usePomodoro;