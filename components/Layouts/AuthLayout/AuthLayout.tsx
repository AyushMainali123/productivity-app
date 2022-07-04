import { Box } from "@chakra-ui/react";
import Navbar from "../../ui/Navbar";

/* -------------------------------------------------------------------------- */
/*                            Interface Starts Here                           */
/* -------------------------------------------------------------------------- */

interface AuthLayoutProps {
    children: React.ReactNode
}

/* --------------------------- Interface Ends Here -------------------------- */


const AuthLayout = ({ children }: AuthLayoutProps) => {

    return (
        <>
            <Navbar />
            <Box as={"main"} padding={"35px 40px"} background={"baseBackground"} minHeight={"calc(100vh - 100px)"}>
                {children}
            </Box>
        </>
    )
}

export default AuthLayout;