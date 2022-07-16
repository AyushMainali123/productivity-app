import { Box } from "@chakra-ui/react";
import Footer from "components/ui/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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
    const router = useRouter();

    if (session.status === "unauthenticated") {
        router.replace("/")
        return null;
    }

    return (
        <>
            {
                session.status === "authenticated" && <Navbar isAuthenticated={true} name={session.data.user?.name || ""} />
            }
            
            <Box as={"main"}  py={"35px"} background={"baseBackground"} minHeight={"calc(100vh - 55px - 54px)"}>
                {children}
            </Box>
            <Footer />
        </>
    )
}

export default AuthLayout;