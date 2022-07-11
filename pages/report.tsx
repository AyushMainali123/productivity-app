import { Box } from "@chakra-ui/react"
import AuthLayout from "components/Layouts/AuthLayout"
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const Reports = () => {
    return (
        <AuthLayout>
            <Box as={"section"} maxW={"8xl"} m={"auto"} px={{ base: 0, md: "30px", '2xl': "0px" }}>
                <Box bg={"black.primary"} px={5} py={3} fontWeight={"medium"} fontSize={"large"} borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"}>
                    Total time: 6hr 45mins
                </Box>
                <Box borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"} py={4} px={10}>
                    <Bar data={{
                        labels: ["Jan", "Feb", "Mar", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                        datasets: [{
                            label: 'My First Dataset',
                            data: [65, 59, 80, 81, 56, 55, 40],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(201, 203, 207, 0.2)'
                            ],
                            borderColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)',
                                'rgb(201, 203, 207)'
                            ],
                            borderWidth: 1
                        }]
                    }} />
                </Box>
                <Box height={"2"} bg={"black.primary"} borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"} />

            </Box>
        </AuthLayout>
    )
}

export default Reports