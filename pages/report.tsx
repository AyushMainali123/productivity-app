import { Box, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";
import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import AuthLayout from "components/Layouts/AuthLayout";
import ReportCard from "components/ReportsPage/ReportCard";
import WeeklyBar from "components/ReportsPage/WeeklyBar";
import LoadingOverlay from 'react-loading-overlay-ts';
import { useQuery } from "react-query";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const initialWeeklyData = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0
}


const Reports = () => {

    const { data: weeklyData, isLoading: isWeeklyDataLoading, isError: isWeeklyDataError } = useQuery<WeeklyReportsApiResponse>(["/api/reports/weekly"])
    const toast = useToast({
        position: "top",
        isClosable: true,
        duration: 3000
    })

    if (isWeeklyDataError) {
        toast({
            title: "Error loading weekly data.",
            status: "error"
        })
    }

    return (
        <AuthLayout>

            {/* For Work Session */}
            <ReportCard>
                <Tabs variant={"unstyled"}>
                    <TabList>
                        <HStack mb={8} border={"1px solid black"} borderRightWidth={"0px"} borderRadius={"base"}>
                            <Box px={3} py={2}>Work sessions</Box>
                            <Tab
                                px={3}
                                py={2}
                                borderColor={"black"}
                                borderRightWidth={"1px"}
                                borderLeftWidth={"1px"}
                                _hover={{ background: "#495D67" }}
                                _selected={{ background: "#495D67" }}
                            >
                                Weekly
                            </Tab>
                        </HStack>
                    </TabList>
                    <Box bg={"black.primary"} px={5} py={3} fontWeight={"medium"} fontSize={"large"} borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"}>
                        Total time: {weeklyData?.totalWorkSessionsInMinutes}
                    </Box>
                    <TabPanels>
                        <TabPanel px={0} py={0}>
                            <LoadingOverlay active={isWeeklyDataLoading}>
                                <Box borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"} py={4} px={10}>
                                    <WeeklyBar
                                        data={weeklyData ? weeklyData.workSessionsReports : initialWeeklyData as WeeklySessionReports}
                                    />
                                </Box>
                            </LoadingOverlay>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </ReportCard>


            {/* For Short Break Session */}
            <ReportCard>
                <Tabs variant={"unstyled"}>
                    <TabList>
                        <HStack mb={8} border={"1px solid black"} borderRightWidth={"0px"} borderRadius={"base"}>
                            <Box px={3} py={2}>Short break sessions</Box>
                            <Tab
                                px={3}
                                py={2}
                                borderColor={"black"}
                                borderRightWidth={"1px"}
                                borderLeftWidth={"1px"}
                                _hover={{ background: "#495D67" }}
                                _selected={{ background: "#495D67" }}
                            >
                                Weekly
                            </Tab>
                        </HStack>
                    </TabList>
                    <Box bg={"black.primary"} px={5} py={3} fontWeight={"medium"} fontSize={"large"} borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"}>
                        Total time: {weeklyData?.totalShortBreakSessionsInMinutes}
                    </Box>
                    <TabPanels>
                        <TabPanel px={0} py={0}>
                            <LoadingOverlay active={isWeeklyDataLoading}>
                                <Box borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"} py={4} px={10}>
                                    <WeeklyBar
                                        data={weeklyData ? weeklyData.shortBreakSessionsReports : initialWeeklyData as WeeklySessionReports}
                                    />
                                </Box>
                            </LoadingOverlay>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </ReportCard>

            {/* For Long Break Session */}
            <ReportCard>
                <Tabs variant={"unstyled"}>
                    <TabList>
                        <HStack mb={8} border={"1px solid black"} borderRightWidth={"0px"} borderRadius={"base"}>
                            <Box px={3} py={2}>Long Break sessions</Box>
                            <Tab
                                px={3}
                                py={2}
                                borderColor={"black"}
                                borderRightWidth={"1px"}
                                borderLeftWidth={"1px"}
                                _hover={{ background: "#495D67" }}
                                _selected={{ background: "#495D67" }}
                            >
                                Weekly
                            </Tab>
                        </HStack>
                    </TabList>
                    <Box bg={"black.primary"} px={5} py={3} fontWeight={"medium"} fontSize={"large"} borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"}>
                        Total time: {weeklyData?.totalLongBreakSessionsInMinutes}
                    </Box>
                    <TabPanels>
                        <TabPanel px={0} py={0}>
                            <LoadingOverlay active={isWeeklyDataLoading}>
                                <Box borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"} py={4} px={10}>
                                    <WeeklyBar
                                        data={weeklyData ? weeklyData.longBreakSessionsReports : initialWeeklyData as WeeklySessionReports}
                                    />
                                </Box>
                            </LoadingOverlay>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </ReportCard>
           
        </AuthLayout>
    )
}

export default Reports


Reports.requireAuth = true;