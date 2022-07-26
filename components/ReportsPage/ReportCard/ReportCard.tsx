import { Box } from "@chakra-ui/react";

interface ReportCardProps {
    children: React.ReactNode;
}

const ReportCard = ({ children }: ReportCardProps) => {
    return (
        <Box as={"section"} maxW={"8xl"} m={"auto"} px={{ base: 0, md: "30px", '2xl': "0px" }} mb={20}>
            {children}
            <Box height={"2"} bg={"black.primary"} borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"} />
        </Box>
    )
}

export default ReportCard;