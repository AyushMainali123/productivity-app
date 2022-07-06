/* -------------------------------------------------------------------------- */
/*                              Interface Starts                              */
/* -------------------------------------------------------------------------- */

import { Box, Center } from "@chakra-ui/react";
import Footer from "components/ui/Footer";

interface LoginSignUpLayoutProps {
    children: React.ReactNode;
}

/* ----------------------------- Interface Ends ----------------------------- */

const LoginSignupLayout = ({children}: LoginSignUpLayoutProps) => {
    return (
        <>
            <Center as={"main"} padding={"35px 40px"} background={"baseBackground"} minHeight={"calc(100vh - 55px)"}>
                {children}
            </Center>
            <Footer />
        </>
    )
}

export default LoginSignupLayout;