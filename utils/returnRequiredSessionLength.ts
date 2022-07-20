import { UserDetails } from "@prisma/client";

export const returnRequiredSessionLength = (sessionType: SessionType, userDetails: UserDetails) => {
    switch (sessionType) {
        case "LONG_BREAK":
            return userDetails.longBreakLength;
        case "SHORT_BREAK":
            return userDetails.shortBreakLength;
        case "WORK_SESSION":
            return userDetails.pomodoroLength;
    }
}