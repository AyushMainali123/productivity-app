import { sub } from "date-fns";
import { getDayFromNumber } from "utils/getDayFromNumber";


// Function to get random colors
 function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * * This function returns array of tasks from the sta
 * @param weeklyData 
 * @returns 
 */
export const getUniqueTasks = (weeklyData: WeeklyReportsSingleEntityApiResponse[][]) => {
    const tasksArray: TaskDetails[] = []


    weeklyData.forEach(datas => datas.forEach(singleData => {

        const isTaskPresent = tasksArray.find(item => item.id === singleData.task.id)


        if(!isTaskPresent) {
           tasksArray.push({...singleData.task})
        }

    }))


    return tasksArray
}


/**
 * * Seperate each task like the prototype below:
 *   {    
 *      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
 *      datasets: [
 *        {
 *          label: "taskOne Name",
 *          backgroundColor: "#0000000" //rendom color
 *          data: [1, 2, 3, 0, 4.4, 3.5, 56]
 *         },
 *        {
 *          label: "taskOne Name" ,
 *          backgroundColor: "#0000000" //rendom color
 *          data: [0, 0, 4, 0, 0 , 7]
 *        }
 *      ]
 * }
 * * If the data is present in that day add total time used in that day, else use 0
 * @param weeklyData 
 * @param tasks 
 */


export const getBarChartData = (weeklyData: WeeklyReportsSingleEntityApiResponse[][], tasks: TaskDetails[]) => {

    // Getting today and previous six days
    const days = [
        getDayFromNumber(sub(new Date(), {days: 6}).getDay()  as (0 | 1 | 2 | 3 | 4 | 5 | 6)),
        getDayFromNumber(sub(new Date(), {days: 5}).getDay()  as (0 | 1 | 2 | 3 | 4 | 5 | 6)),
        getDayFromNumber(sub(new Date(), {days: 4}).getDay()  as (0 | 1 | 2 | 3 | 4 | 5 | 6)),
        getDayFromNumber(sub(new Date(), {days: 3}).getDay()  as (0 | 1 | 2 | 3 | 4 | 5 | 6)),
        getDayFromNumber(sub(new Date(), {days: 2}).getDay()  as (0 | 1 | 2 | 3 | 4 | 5 | 6)),
        getDayFromNumber(sub(new Date(), {days: 1}).getDay()  as (0 | 1 | 2 | 3 | 4 | 5 | 6)),
        getDayFromNumber(sub(new Date(), {days: 0}).getDay()  as (0 | 1 | 2 | 3 | 4 | 5 | 6)),
    ]


    const initialMapData = tasks.map(task => (
        [task.id, [0, 0, 0, 0, 0, 0, 0]]
    )) as [string, number[]][]


    
    //  Initialise map with taskId with array of 7 '0'
    const daysSessionMap: Map<string, number[]> = new Map([...initialMapData])


    weeklyData.forEach((datas, ind) => {

        // This 1 week results is calculated here
        datas.forEach(data => {
            const currentTask = daysSessionMap.get(data.task.id) as number[]
            const tempData = [...currentTask]
            tempData[ind] +=( data.completedPercentage / 100 ) * data.sessionLength;
            daysSessionMap.set(data.task.id, [...tempData])
        })
    })


    // Converting TaskDetails to map
    const mapTaskDetails: Map<string, string> = new Map([
        ...tasks.map(task => ([task.id, task.taskName]) as [string, string])
    ])


    // Datasets for barchart
    const datasets = [
        ...Array.from(daysSessionMap.entries()).map((entry) => {
            return {
                label: mapTaskDetails.get(entry[0]),
                backgroundColor: getRandomColor(),
                data: entry[1],
            }
        })
    ]
    
    // Chart datas to be used in Stacked bar chart
    const chartDatas = {
        labels: days, 
        datasets
    }

    return chartDatas

}