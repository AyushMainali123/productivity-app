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
