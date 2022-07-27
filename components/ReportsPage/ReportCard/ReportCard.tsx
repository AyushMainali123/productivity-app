import { Box } from "@chakra-ui/react";

interface ReportCardProps {
    children: React.ReactNode;
}

const ReportCard = ({ children }: ReportCardProps) => {
    return (
        <Box maxW={"8xl"} m={"auto"} mb={20}>
            {children}
            <Box height={"2"} bg={"black.primary"} borderWidth={"1px"} borderColor={"black"} borderStyle={"solid"} />
        </Box>
    )
}

export default ReportCard;