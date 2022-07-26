import { Bar } from "react-chartjs-2";
import { getDayFromNumber, getTodayAsWeekEndDay } from "./WeeklyBar.utils";


interface WeeklyBarProps {
    data: WeeklySessionReports
}

const WeeklyBar = ({ data }: WeeklyBarProps) => {

    const res = getTodayAsWeekEndDay(data);
    return (
        <Bar
            data={{
                labels: [...res.map(val => getDayFromNumber(val[0] as 0 | 1 | 2 | 3 | 4 | 5 | 6))],
                datasets: [{
                    label: 'Weekly Summary',
                    data: [...res.map(val => val[1])],
                    backgroundColor: '#D9D9D9',
                    borderColor: "#D9D9D9",
                    borderWidth: 1,
                    categoryPercentage: 1,
                    barPercentage: 0.8
                }],

            }}

            options={{
                scales: {
                    x: {
                        ticks: {
                            color: "#fff"
                        },
                        beginAtZero: false,
                        offset: true,
                        suggestedMin: 0.5
                    },
                    y: {
                        ticks: {
                            color: "#fff",

                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }}

            style={{ maxHeight: "350px" }}
        />
    )
}

export default WeeklyBar;