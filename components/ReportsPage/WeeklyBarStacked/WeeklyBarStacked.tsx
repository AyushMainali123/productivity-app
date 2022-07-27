import { useMemo } from "react"
import { Bar } from "react-chartjs-2"
import { getBarChartData, getUniqueTasks } from "./WeeklyBarStacked.utils"


interface WeeklyBarStackedProps {
    data?: WeeklyReportsSingleEntityApiResponse[][]
}

const WeeklyBarStacked = ({ data }: WeeklyBarStackedProps) => {

    const uniqueTasks = useMemo(() => getUniqueTasks(data ? data : []), [data])
    const chartBarDatas = useMemo(() => data &&  uniqueTasks && getBarChartData(data , uniqueTasks), [data, uniqueTasks])    

    return (
        <Bar
            data={chartBarDatas ? chartBarDatas : {labels: [], datasets: []}}
            options={{
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            color: "#fff"
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => {
                                console.log(ctx)
                                return `${ctx.dataset.label} (${ctx.formattedValue} mins)`
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            color: "#fff"
                        },
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            color: "#fff"
                        },
                    }
                }

            }}
            style={{ maxHeight: "350px" }}
        />
    )

}

export default WeeklyBarStacked