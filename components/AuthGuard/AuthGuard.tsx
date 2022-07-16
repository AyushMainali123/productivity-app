import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { Center, Spinner } from '@chakra-ui/react'


interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {

    const router = useRouter()
    const { status } = useSession({
        required: true,
        onUnauthenticated: () => {
            router.push("/signin")
            return null;
        }
    })

    if (status === "loading") {
        return (
            <Center h={"100vh"}>
                <Spinner size={"xl"} />
            </Center>
        )
    }

    return (
        <>
            {children}
        </>
    );
}

export default AuthGuard;