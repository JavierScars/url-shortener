import { Box, Link } from "@chakra-ui/react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Icon } from '@chakra-ui/react'
import { FC, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { IUser } from "../../interfaces/User";
import { signOut } from "../../services/auth";

const LoginProfileBanner: FC<{ user: IUser | null, onLogout: () => void }> = ({ user, onLogout }) => {
    const handleLogout = async () => {
        const error = signOut()
        if (!error) {
            onLogout()
        }
    }

    const renderMessage = () => {
        if (user) {
            return <>
                <Link href="/profile">
                    <Icon as={FaUserCircle} size="2.5rem" position="relative" top="0.15rem" marginRight="0.25rem" /> Hi, {user.username}
                </Link> / <Link href="/" onClick={handleLogout}>
                    Logout <Icon as={FaSignOutAlt} size="2.5rem" position="relative" top="0.15rem" marginLeft="0.25rem" />
                </Link>
            </>
        }
        return <><Link href="/login"><Icon as={FaUserCircle} size="2.5rem" position="relative" top="0.15rem" marginRight="0.25rem" /> Sign In</Link> / <Link href="/login?signup=true">Sign Up</Link></>
    }

    return <Box position="absolute" bottom="-2.5rem" backgroundColor="cyan.500" right={0} padding="0.5rem" borderRadius="0 0 0 1rem">
        {renderMessage()}
    </Box>
}

export const Header = ({ showLoginButton = false }) => {
    const { user, setUser } = useContext(UserContext);

    return (
        <Box as="header" bgColor="cyan.500" color="white" data-testid="header-component" position="relative" padding="2rem 1rem">
            <Link fontWeight="bold" href="/" _hover={{ textDecoration: "none" }} fontSize="2rem">URL-<Box as="span" fontStyle="italic">Shortener</Box></Link>
            <Box as="p" fontSize="1rem" marginLeft="1rem">
                URL-Shortener is a simple URL shortener that allows you to create a short URL from a long URL.
            </Box>
            {showLoginButton && <LoginProfileBanner user={user} onLogout={() => setUser(null)} />}
        </Box >
    );
}
