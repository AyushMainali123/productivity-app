import { Box } from "@chakra-ui/react";
import axios from "axios";
import Footer from "components/ui/Footer";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Navbar from "../../ui/Navbar";

/* -------------------------------------------------------------------------- */
/*                            Interface Starts Here                           */
/* -------------------------------------------------------------------------- */

interface AuthLayoutProps {
    children: React.ReactNode
}

/* --------------------------- Interface Ends Here -------------------------- */


const AuthLayout = ({ children }: AuthLayoutProps) => {

    const session = useSession();

    return (
        <>
            {
                session.status === "authenticated" && <Navbar isAuthenticated={true} name={session.data.user?.name || ""} />
            }

            <Box as={"main"} py={"35px"} background={"baseBackground"} minHeight={"calc(100vh - 55px - 54px)"}>
                {children}
            </Box>
            <Footer />
        </>
    )
}

export default AuthLayout;