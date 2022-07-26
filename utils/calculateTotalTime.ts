export const calculateTotalTimeFromMinutes = (timeInMinutes: number) => {

    const roundedMinutes = Math.round(timeInMinutes)

    const hours = Math.floor(roundedMinutes / 60);
    const remainingMinutes = roundedMinutes % 60;


    return {hours, minutes: remainingMinutes }


}