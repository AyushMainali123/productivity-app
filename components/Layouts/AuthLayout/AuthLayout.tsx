import { Box } from "@chakra-ui/react";
import Footer from "components/ui/Footer";
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
            <Box as={"main"} padding={"35px 40px"} background={"baseBackground"} minHeight={"calc(100vh - 55px - 54px)"}>
                {children}
            </Box>
            <Footer />
        </>
    )
}

export default AuthLayout;