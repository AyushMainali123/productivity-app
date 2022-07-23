import { useInterval } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCounter } from 'usehooks-ts';

interface PomodoroInterface {
    shortBreakTime: number;
    longBreakTime: number;
    sessionTime: number;
    initialSession: SessionType
}

const INITIAL_STATE = {
    shortBreakTime: 5,
    longBreakTime: 15,
    sessionTime: 25,
    initialSession: "WORK_SESSION" as SessionType,
    intervalValue: 1000
}


const usePomodoro = () => {

    const [shortBreakTime, setShortBreakTime] = useState(() => INITIAL_STATE.shortBreakTime)
    const [longBreakTime, setLongBreakTime] = useState(() => INITIAL_STATE.longBreakTime)
    const [sessionTime, setSessionTime] = useState(() => INITIAL_STATE.sessionTime)
    const [currentPomodoroSession, setCurrentPomodoroSession] = useState<SessionType>(() => INITIAL_STATE.initialSession)

    const { count: minuteCount, setCount: setMinuteCount } = useCounter(sessionTime)
    const { count: secondCount, setCount: setSecondCount } = useCounter(0)

    const [isSessionPlaying, setSessionPlaying] = useState(false)
    const [isCurrentSessionCompleted, setCurrentSessionCompleted] = useState(false);



    useEffect(() => {
        setMinuteCount(sessionTime)
    }, [sessionTime, setMinuteCount])

    /**
     * * Hook for updating minute and second count.
     */
    useInterval(() => {
        if (minuteCount === 0 && secondCount === 0) {
            setSecondCount(0)
            setCurrentSessionCompleted(true);
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



    useEffect(() => {

        if (currentPomodoroSession === "WORK_SESSION") {
            setMinuteCount(sessionTime)
            return;
        }

        if (currentPomodoroSession === "LONG_BREAK") {
            setMinuteCount(longBreakTime)
            return;
        }

        setMinuteCount(shortBreakTime);

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPomodoroSession])


    return {
        minuteCount,
        secondCount,
        setSessionPlaying,
        setCurrentPomodoroSession,
        isCurrentSessionCompleted,
        setCurrentSessionCompleted,
        setShortBreakTime,
        setLongBreakTime,
        setSessionTime,
        currentPomodoroSession
    }

}

export default usePomodoro;