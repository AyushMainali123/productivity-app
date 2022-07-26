export const getDayFromNumber = (day: 0 | 1 | 2 | 3 |4 | 5 | 6) => {
    switch (day) {
        case 0: return "Sun"
        case 1: return "Mon"
        case 2: return "Tue"
        case 3: return "Wed"
        case 4: return "Thu"
        case 5: return "Fri"
        case 6: return "Sat"
    }
}


export const getTodayAsWeekEndDay = (data: WeeklySessionReports) => {
    
    const today = new Date().getDay();

    const keysArray: (0 | 1 | 2 |3 | 4 | 5 | 6)[] = [...Object.keys(data).map(key => Number(key))] as (0 | 1 | 2 |3 | 4 | 5 | 6)[]
    
    // Final Array after reverse
    const finalKeyArray: (0 | 1 | 2 |3 | 4 | 5 | 6)[] = [];
    const finalValueArray: number[] = [];
    
    // First part: get from today to end of the array
    for (let i = today + 1; i < keysArray.length; i++) {
        finalKeyArray.push(keysArray[i]);
        finalValueArray.push(data[`${i}` as keyof WeeklySessionReports])
    }

    //Second part: get start of the array to today
    for (let i = 0; i <= today; i++) {
        finalKeyArray.push(keysArray[i]);
        finalValueArray.push(data[`${i}` as keyof WeeklySessionReports])
    }

    console.log({finalKeyArray})

    const dataToReturn = finalKeyArray.map((key, ind) => [key, finalValueArray[ind]])
    

    return dataToReturn;
}