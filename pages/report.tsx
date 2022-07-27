import { Box, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";
import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import AuthLayout from "components/Layouts/AuthLayout";
import ReportCard from "components/ReportsPage/ReportCard";
import { getTotalMinutesFromStackedApiResponse } from "utils/getTotalMinutesFromStackedApiResponse";
import WeeklyBarStacked from "components/ReportsPage/WeeklyBarStacked";
import { useMemo } from "react";
import LoadingOverlay from 'react-loading-overlay-ts';
import { useQuery } from "react-query";
import { calculateTotalTimeFromMinutes } from "utils/calculateTotalTime";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



const Reports = () => {

    const { data: weeklyStackedData, isLoading: isWeeklyStackedDataLoading, isError: isWeeklyStackedDataError } = useQuery<WeeklyDataApiResponse>(["/api/reports/weekly"], {staleTime: 0})
    const toast = useToast({
        position: "top",
        isClosable: true,
        duration: 3000
    })

    const totalFormattedWorkSessions = useMemo(() => {
        if (!weeklyStackedData) return {hours: 0, minutes: 0, seconds: 0};

        const totalTimeInMinutes = getTotalMinutesFromStackedApiResponse(weeklyStackedData?.thisWeeksStackedWorkSessionsData)
        return calculateTotalTimeFromMinutes(totalTimeInMinutes)
    }, [weeklyStackedData])


    const totalFormattedShortBreakSessions = useMemo(() => {
        if (!weeklyStackedData) return { hours: 0, minutes: 0, seconds: 0 };

        const totalTimeInMinutes = getTotalMinutesFromStackedApiResponse(weeklyStackedData?.thisWeeksStackedShortBreakSessionsData)
        return calculateTotalTimeFromMinutes(totalTimeInMinutes)
    }, [weeklyStackedData])


    const totalFormattedLongBreakSessions = useMemo(() => {
        if (!weeklyStackedData) return { hours: 0, minutes: 0, seconds: 0 };

        const totalTimeInMinutes = getTotalMinutesFromStackedApiResponse(weeklyStackedData?.thisWeeksStackedLongBreakSessionsData)
        return calculateTotalTimeFromMinutes(totalTimeInMinutes)
    }, [weeklyStackedData])


    if (isWeeklyStackedDataError) {
        toast({
            title: "Error loading weekly data.",
            status: "error"
        })
    }

    return (
        <AuthLayout>
            <Box
                maxW={"8xl"}
                m={"auto"}
                px={"10px"}
            >

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
                            Total time: {totalFormattedWorkSessions.hours} hr {totalFormattedWorkSessions.minutes} min {totalFormattedWorkSessions.seconds} sec
                        </Box>
                        <TabPanels>
                            <TabPanel px={0} py={0}>
                                <LoadingOverlay active={isWeeklyStackedDataLoading}>
                                    <Box borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"} py={4} px={10}>
                                        <WeeklyBarStacked data={weeklyStackedData?.thisWeeksStackedWorkSessionsData} />
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
                            Total time: {totalFormattedShortBreakSessions.hours} hr {totalFormattedShortBreakSessions.minutes} min {totalFormattedShortBreakSessions.seconds} sec
                        </Box>
                        <TabPanels>
                            <TabPanel px={0} py={0}>
                                <LoadingOverlay active={isWeeklyStackedDataLoading}>
                                    <Box borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"} py={4} px={10}>
                                        <WeeklyBarStacked data={weeklyStackedData?.thisWeeksStackedShortBreakSessionsData} />
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
                            Total time: {totalFormattedLongBreakSessions.hours} hr {totalFormattedLongBreakSessions.minutes} min {totalFormattedLongBreakSessions.seconds} sec
                        </Box>
                        <TabPanels>
                            <TabPanel px={0} py={0}>
                                <LoadingOverlay active={isWeeklyStackedDataLoading}>
                                    <Box borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"} py={4} px={10}>
                                        <WeeklyBarStacked data={weeklyStackedData?.thisWeeksStackedLongBreakSessionsData} />
                                    </Box>
                                </LoadingOverlay>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ReportCard>
            </Box>


        </AuthLayout>
    )
}

export default Reports


Reports.requireAuth = true;