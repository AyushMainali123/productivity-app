export const calculateTotalTimeFromMinutes = (timeInMinutes: number) => {

    const seconds = Math.round(timeInMinutes * 60)

    const minutes = Math.floor(seconds / 60);
    
    // This is the seconds to send
    const remainingSeconds = seconds % 60;
    



    // This is the minutes to send
    const remainingMinutes = minutes % 60;

    // This is the hours to send
    const hours = Math.floor(minutes / 60);

    return {hours, minutes: remainingMinutes, seconds: remainingSeconds }

}