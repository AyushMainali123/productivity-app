import { Box, HStack, StackItem } from "@chakra-ui/react"
import AuthLayout from "components/Layouts/AuthLayout"
import { Bar } from 'react-chartjs-2';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
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



console.log({ BarElement, Title })

const Reports = () => {
    return (
        <AuthLayout>
            <Box as={"section"} maxW={"8xl"} m={"auto"} px={{ base: 0, md: "30px", '2xl': "0px" }}>
                <Tabs variant={"unstyled"}>
                    <TabList>
                        <HStack mb={8} border={"1px solid black"} borderRightWidth={"0px"} borderRadius={"base"}>
                            <Box px={3} py={2} >REPORTS</Box>
                            <Tab
                                px={3}
                                py={2}
                                borderColor={"black"}
                                borderRightWidth={"1px"}
                                borderLeftWidth={"1px"}
                                _hover={{ background: "#495D67" }}
                                _selected={{ background: "#495D67" }}
                            >
                                Summary
                            </Tab>
                        </HStack>
                    </TabList>


                    <Box bg={"black.primary"} px={5} py={3} fontWeight={"medium"} fontSize={"large"} borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"}>
                        Total time: 6hr 45mins
                    </Box>
                    <TabPanels>
                        <TabPanel px={0} py={0}>

                            <Box borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"} py={4} px={10}>
                                <Bar
                                    data={{
                                        labels: ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", ""],
                                        datasets: [{
                                            label: 'Weekly Summary',
                                            data: [0, 65, 59, 80, 81, 56, 55, 40, 0],
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
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <Box height={"2"} bg={"black.primary"} borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"} />

            </Box>
        </AuthLayout>
    )
}

export default Reports